import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

export interface RealisticWaterTransitionProps {
  children: React.ReactNode;
  /** Start the water transition immediately on mount instead of waiting for scroll into view */
  immediate?: boolean;
}

/**
 * Total duration of the 3-stage water choreography (seconds):
 * - Stage A (Arrival, 0.00 - 0.34): Water rises from the bottom edge, rolling horizontally as it ascends.
 * - Stage B (Hold/Flow, 0.34 - 0.64): Occupies lower ~44-48% of viewport; crystal-clear body with rolling crest reflections.
 * - Stage C (Retreat, 0.64 - 1.00): Smoothly recedes downward and unmounts cleanly.
 */
const TRANSITION_DURATION = 3.0;
const CONTENT_REVEAL_DELAY = 0.75;

interface DropletParticle {
  /** Normalized horizontal position (0..1) at spawn */
  xNorm: number;
  /** Spawn time in normalized transition progress (0..1) */
  spawnT: number;
  /** End time in normalized transition progress (0..1) */
  endT: number;
  /** Horizontal velocity in px/sec */
  vx: number;
  /** Initial upward velocity in px/sec */
  vy: number;
  /** Major radius in px */
  rMajor: number;
  /** Minor radius in px */
  rMinor: number;
}

const DROPLETS: DropletParticle[] = [
  { xNorm: 0.22, spawnT: 0.18, endT: 0.62, vx: 36, vy: -125, rMajor: 3.5, rMinor: 2.1 },
  { xNorm: 0.26, spawnT: 0.22, endT: 0.56, vx: 48, vy: -90, rMajor: 2.3, rMinor: 1.5 },
  { xNorm: 0.56, spawnT: 0.16, endT: 0.65, vx: -32, vy: -140, rMajor: 3.9, rMinor: 2.3 },
  { xNorm: 0.60, spawnT: 0.21, endT: 0.59, vx: 29, vy: -108, rMajor: 2.7, rMinor: 1.7 },
  { xNorm: 0.63, spawnT: 0.25, endT: 0.54, vx: 42, vy: -82, rMajor: 1.9, rMinor: 1.3 },
  { xNorm: 0.79, spawnT: 0.20, endT: 0.63, vx: -38, vy: -118, rMajor: 3.2, rMinor: 2.0 },
  { xNorm: 0.41, spawnT: 0.24, endT: 0.58, vx: 28, vy: -88, rMajor: 2.5, rMinor: 1.6 },
];

/**
 * Smooth cubic Hermite interpolation
 */
function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/**
 * Computes the vertical envelope (0 = below screen, 1 = full Stage B height)
 * for normalized time progress p in [0, 1].
 */
function computeVerticalEnvelope(p: number): number {
  if (p < 0.34) {
    // Stage A: smooth decelerating rise
    const u = p / 0.34;
    return 1 - Math.pow(1 - u, 2.8);
  }
  if (p < 0.64) {
    // Stage B: gentle breathing hold
    const u = (p - 0.34) / 0.30;
    return 1.0 + 0.025 * Math.sin(u * Math.PI);
  }
  // Stage C: smooth accelerating + decelerating retreat
  const u = (p - 0.64) / 0.36;
  const ease = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
  return Math.max(0, 1 - ease);
}

/**
 * Evaluates a smooth, organic, non-symmetrical rolling shallow-water wave surface
 * at normalized horizontal coordinate u in [0, 1] and elapsed time t (seconds).
 */
function evaluateWaveSurface(
  u: number,
  t: number,
  ampScale: number
): { yOffset: number; lensThickness: number; specWeight: number } {
  // Smooth, broad rolling wave harmonics (low spatial frequencies so there are no jagged ripples)
  const k1 = 6.28318 * 0.85;
  const k2 = 6.28318 * 1.45;
  const k3 = 6.28318 * 2.30;
  const k4 = 6.28318 * 3.40;

  const p1 = k1 * u - 1.55 * t + 0.35;
  const p2 = k2 * u + 1.15 * t + 1.85;
  const p3 = k3 * u - 2.15 * t + 2.95;
  const p4 = k4 * u + 2.65 * t + 0.75;

  // Broad, graceful rolling undulations (~38px peak-to-trough on desktop)
  const a1 = 21.0 * ampScale;
  const a2 = 12.5 * ampScale;
  const a3 = 5.8 * ampScale;
  const a4 = 2.2 * ampScale;

  const yOffset =
    a1 * Math.sin(p1) +
    a2 * Math.sin(p2) +
    a3 * Math.sin(p3) +
    a4 * Math.sin(p4);

  // Smoothly varying meniscus lens thickness (wider on rising crests and troughs, thinner on flat inflection points)
  const waveMod =
    0.52 +
    0.28 * Math.cos(p1 - 0.4) +
    0.20 * Math.sin(p2 + 0.7) +
    0.12 * Math.cos(p3);
  const lensThickness = (2.2 + 11.5 * Math.max(0.08, waveMod)) * ampScale;

  // Smoothly varying specular highlight weight along crest slopes facing overhead light
  const specWeight = Math.max(
    0,
    Math.min(
      1,
      0.5 + 0.38 * Math.cos(p1 + 0.25) + 0.26 * Math.sin(p2 - 0.4)
    )
  );

  return { yOffset, lensThickness, specWeight };
}

/**
 * Secondary independent subsurface wave layer moving at a different phase velocity
 */
function evaluateSubsurfaceWave(u: number, t: number, ampScale: number): number {
  const p1 = 6.28318 * 1.15 * u + 1.85 * t + 1.2;
  const p2 = 6.28318 * 2.05 * u - 1.45 * t + 2.6;
  const p3 = 6.28318 * 3.15 * u + 2.35 * t + 0.4;
  return (
    ampScale *
    (11.0 * Math.sin(p1) + 6.2 * Math.sin(p2) + 2.6 * Math.sin(p3))
  );
}

/**
 * Traces a smooth C1 continuous quadratic spline through (xs, ys)
 */
function traceSmoothCurve(
  ctx: CanvasRenderingContext2D,
  xs: number[],
  ys: number[],
  moveToFirst = true
) {
  const n = xs.length - 1;
  if (n < 1) return;
  if (moveToFirst) {
    ctx.moveTo(xs[0], ys[0]);
  } else {
    ctx.lineTo(xs[0], ys[0]);
  }
  for (let i = 1; i <= n; i++) {
    const xc = (xs[i - 1] + xs[i]) * 0.5;
    const yc = (ys[i - 1] + ys[i]) * 0.5;
    ctx.quadraticCurveTo(xs[i - 1], ys[i - 1], xc, yc);
  }
  ctx.lineTo(xs[n], ys[n]);
}

/**
 * Traces a smooth C1 continuous quadratic spline in reverse order from n down to 0
 */
function traceSmoothCurveReverse(
  ctx: CanvasRenderingContext2D,
  xs: number[],
  ys: number[]
) {
  const n = xs.length - 1;
  if (n < 1) return;
  ctx.lineTo(xs[n], ys[n]);
  for (let i = n - 1; i >= 0; i--) {
    const xc = (xs[i + 1] + xs[i]) * 0.5;
    const yc = (ys[i + 1] + ys[i]) * 0.5;
    ctx.quadraticCurveTo(xs[i + 1], ys[i + 1], xc, yc);
  }
  ctx.lineTo(xs[0], ys[0]);
}

const WaterSheetCanvasOverlay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let rafId = 0;
    const startTime = performance.now();

    const updateSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = Math.round(window.innerHeight * 0.52);
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const renderFrame = (now: number) => {
      const elapsedSec = (now - startTime) / 1000;
      const progress = Math.min(1, elapsedSec / TRANSITION_DURATION);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const env = computeVerticalEnvelope(progress);
      if (env <= 0.002) {
        ctx.restore();
        if (progress < 1) {
          rafId = requestAnimationFrame(renderFrame);
        }
        return;
      }

      // Base crest level sits around 24% from the top of the 52vh overlay (~40% of viewport height)
      const targetCrestY = height * 0.24;
      const startCrestY = height + 42;
      const baseCrestY = startCrestY - (startCrestY - targetCrestY) * env;

      const ampScale =
        (width < 640 ? 0.68 : 1.0) *
        (0.6 + 0.4 * Math.sin(Math.min(1, progress * 1.15) * Math.PI));

      const numSamples = 120;
      const xs: number[] = new Array(numSamples + 1);
      const ys: number[] = new Array(numSamples + 1);
      const bottomLensYs: number[] = new Array(numSamples + 1);
      const specWeights: number[] = new Array(numSamples + 1);

      for (let i = 0; i <= numSamples; i++) {
        const u = i / numSamples;
        const x = u * width;
        const { yOffset, lensThickness, specWeight } = evaluateWaveSurface(
          u,
          elapsedSec,
          ampScale
        );
        xs[i] = x;
        ys[i] = baseCrestY + yOffset;
        bottomLensYs[i] = ys[i] + lensThickness;
        specWeights[i] = specWeight;
      }

      // =====================================================================
      // 1. ULTRA-CLEAR LIQUID BODY (predominantly transparent, zero blur)
      // =====================================================================
      ctx.beginPath();
      ctx.moveTo(0, height + 10);
      traceSmoothCurve(ctx, xs, ys, false);
      ctx.lineTo(width, height + 10);
      ctx.closePath();

      const bodyGrad = ctx.createLinearGradient(0, baseCrestY - 30, 0, height);
      bodyGrad.addColorStop(0.0, 'rgba(224, 247, 250, 0.065)');
      bodyGrad.addColorStop(0.12, 'rgba(186, 230, 253, 0.028)');
      bodyGrad.addColorStop(0.55, 'rgba(125, 211, 252, 0.045)');
      bodyGrad.addColorStop(1.0, 'rgba(56, 189, 248, 0.075)');
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // =====================================================================
      // 2. SMOOTH CONTINUOUS SUB-CREST REFRACTION RIBBON
      //    (Varying thickness along the rolling wave curve, zero staircasing,
      //     creates realistic darker-blue refraction in regions of higher curvature)
      // =====================================================================
      ctx.save();
      ctx.clip(); // Clip all subsurface layers strictly inside the main water sheet

      ctx.beginPath();
      traceSmoothCurve(ctx, xs, ys, true);
      traceSmoothCurveReverse(ctx, xs, bottomLensYs);
      ctx.closePath();

      // Horizontal + vertical gradient so darker blue refraction is localized to the curving swells
      const meniscusRefractGrad = ctx.createLinearGradient(0, baseCrestY - 20, width, baseCrestY + 30);
      meniscusRefractGrad.addColorStop(0.0, 'rgba(14, 165, 233, 0.04)');
      meniscusRefractGrad.addColorStop(0.22, 'rgba(3, 105, 161, 0.16)');
      meniscusRefractGrad.addColorStop(0.42, 'rgba(56, 189, 248, 0.05)');
      meniscusRefractGrad.addColorStop(0.68, 'rgba(2, 132, 199, 0.19)');
      meniscusRefractGrad.addColorStop(0.86, 'rgba(125, 211, 252, 0.06)');
      meniscusRefractGrad.addColorStop(1.0, 'rgba(3, 105, 161, 0.12)');
      ctx.fillStyle = meniscusRefractGrad;
      ctx.fill();

      // =====================================================================
      // 3. INDEPENDENT SUBSURFACE CAUSTIC & REFLECTION FOLDS
      //    (Smooth continuous ribbons drifting horizontally inside the liquid)
      // =====================================================================
      for (let band = 0; band < 3; band++) {
        const bandTopYs: number[] = new Array(numSamples + 1);
        const bandBotYs: number[] = new Array(numSamples + 1);
        const baseDepth = 16 + band * 32;
        const maxThick = (16 + band * 7) * ampScale;
        const phaseShift = band * 1.45;

        for (let i = 0; i <= numSamples; i++) {
          const u = i / numSamples;
          const subOffset = evaluateSubsurfaceWave(
            u,
            elapsedSec * (0.85 + band * 0.18) + phaseShift,
            ampScale * (0.8 - band * 0.15)
          );
          const pinch =
            0.35 +
            0.65 *
              Math.max(
                0,
                Math.sin(u * 6.28318 * 1.35 - elapsedSec * 1.8 + band * 1.7)
              );
          bandTopYs[i] = ys[i] + baseDepth + subOffset;
          bandBotYs[i] = bandTopYs[i] + maxThick * pinch;
        }

        ctx.beginPath();
        traceSmoothCurve(ctx, xs, bandTopYs, true);
        traceSmoothCurveReverse(ctx, xs, bandBotYs);
        ctx.closePath();

        const bandGrad = ctx.createLinearGradient(0, baseCrestY, width, baseCrestY + 120);
        if (band % 2 === 0) {
          // Soft white/icy specular lens ribbon
          bandGrad.addColorStop(0.0, 'rgba(255, 255, 255, 0.01)');
          bandGrad.addColorStop(0.25, 'rgba(255, 255, 255, 0.22)');
          bandGrad.addColorStop(0.50, 'rgba(224, 247, 250, 0.04)');
          bandGrad.addColorStop(0.76, 'rgba(255, 255, 255, 0.19)');
          bandGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0.01)');
        } else {
          // Subtle deeper aqua refractive fold
          bandGrad.addColorStop(0.0, 'rgba(14, 165, 233, 0.01)');
          bandGrad.addColorStop(0.32, 'rgba(2, 132, 199, 0.085)');
          bandGrad.addColorStop(0.60, 'rgba(56, 189, 248, 0.015)');
          bandGrad.addColorStop(0.84, 'rgba(3, 105, 161, 0.075)');
          bandGrad.addColorStop(1.0, 'rgba(14, 165, 233, 0.01)');
        }
        ctx.fillStyle = bandGrad;
        ctx.fill();
      }

      ctx.restore(); // End water-body clip

      // =====================================================================
      // 4. SMOOTH VARIABLE SPECULAR HIGHLIGHTS ALONG THE CREST
      //    (Narrow bright white highlights that glint along portions of the crest
      //     without forming a heavy or uniform outline)
      // =====================================================================
      ctx.save();
      ctx.beginPath();
      traceSmoothCurve(ctx, xs, ys, true);

      const crestSpecGrad = ctx.createLinearGradient(0, 0, width, 0);
      const stops = 16;
      for (let s = 0; s <= stops; s++) {
        const u = s / stops;
        const idx = Math.round(u * numSamples);
        const w = specWeights[idx];
        // Modulate alpha so bright specular highlights appear intermittently on crest slopes
        const alpha = w > 0.42 ? Math.min(0.95, (w - 0.35) * 1.45) : w * 0.25;
        crestSpecGrad.addColorStop(u, `rgba(255, 255, 255, ${alpha.toFixed(3)})`);
      }
      ctx.strokeStyle = crestSpecGrad;
      ctx.lineWidth = 1.9;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      // Secondary ultra-fine trailing specular filament just below the meniscus
      const filamentYs = ys.map((y, i) => {
        const u = i / numSamples;
        return y + 4.5 + 3.2 * Math.sin(u * 6.28318 * 2.1 + elapsedSec * 2.4);
      });
      ctx.beginPath();
      traceSmoothCurve(ctx, xs, filamentYs, true);
      const filGrad = ctx.createLinearGradient(0, 0, width, 0);
      filGrad.addColorStop(0.0, 'rgba(255, 255, 255, 0.0)');
      filGrad.addColorStop(0.20, 'rgba(255, 255, 255, 0.55)');
      filGrad.addColorStop(0.45, 'rgba(255, 255, 255, 0.05)');
      filGrad.addColorStop(0.72, 'rgba(255, 255, 255, 0.62)');
      filGrad.addColorStop(0.92, 'rgba(255, 255, 255, 0.08)');
      filGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');
      ctx.strokeStyle = filGrad;
      ctx.lineWidth = 1.0;
      ctx.stroke();
      ctx.restore();

      // =====================================================================
      // 5. SPARSE, IRREGULAR MICRO-DROPLETS WITH GRAVITY
      // =====================================================================
      const gravity = 440; // px/s^2
      for (const drop of DROPLETS) {
        if (progress < drop.spawnT || progress > drop.endT) continue;

        const dt = (progress - drop.spawnT) * TRANSITION_DURATION;
        const lifeFrac = (progress - drop.spawnT) / (drop.endT - drop.spawnT);

        const spawnIdx = Math.min(
          numSamples,
          Math.max(0, Math.round(drop.xNorm * numSamples))
        );
        const originX = xs[spawnIdx];
        const originY = ys[spawnIdx] - 2;

        const x = originX + drop.vx * dt;
        const y = originY + drop.vy * dt + 0.5 * gravity * dt * dt;

        const alpha =
          smoothstep(0.0, 0.15, lifeFrac) *
          (1 - smoothstep(0.75, 1.0, lifeFrac));

        if (alpha <= 0.02) continue;

        const curVy = drop.vy + gravity * dt;
        const angle = Math.atan2(curVy, drop.vx);

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        ctx.beginPath();
        ctx.ellipse(0, 0, drop.rMajor, drop.rMinor, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(215, 244, 255, ${(alpha * 0.38).toFixed(3)})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(3, 105, 161, ${(alpha * 0.18).toFixed(3)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(
          -drop.rMajor * 0.24,
          -drop.rMinor * 0.26,
          drop.rMajor * 0.42,
          drop.rMinor * 0.28,
          0,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${(alpha * 0.90).toFixed(3)})`;
        ctx.fill();

        ctx.restore();
      }

      ctx.restore();

      if (progress < 1) {
        rafId = requestAnimationFrame(renderFrame);
      }
    };

    rafId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return createPortal(
    <div
      data-wave-overlay="true"
      aria-hidden="true"
      className="fixed inset-x-0 bottom-0 h-[52vh] pointer-events-none overflow-hidden select-none"
      style={{ zIndex: 35 }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>,
    document.body
  );
};

export const RealisticWaterTransition: React.FC<RealisticWaterTransitionProps> = ({
  children,
  immediate = false,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '0px 0px -25% 0px' });
  const [started, setStarted] = useState(false);
  const [waterActive, setWaterActive] = useState(false);

  useEffect(() => {
    if (!started && (immediate || inView)) {
      setStarted(true);
      if (!reducedMotion) {
        setWaterActive(true);
      }
    }
  }, [immediate, inView, started, reducedMotion]);

  useEffect(() => {
    if (!waterActive) return undefined;
    const timer = window.setTimeout(
      () => setWaterActive(false),
      (TRANSITION_DURATION + 0.12) * 1000
    );
    return () => window.clearTimeout(timer);
  }, [waterActive]);

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.99 }}
        animate={
          started
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 24, scale: 0.99 }
        }
        transition={{
          duration: reducedMotion ? 0.05 : 0.85,
          delay: reducedMotion ? 0 : CONTENT_REVEAL_DELAY,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
      {waterActive && <WaterSheetCanvasOverlay />}
    </div>
  );
};

export default RealisticWaterTransition;
