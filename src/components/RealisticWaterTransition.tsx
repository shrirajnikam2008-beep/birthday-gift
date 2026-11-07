import React, { useEffect, useId, useRef, useState } from 'react';
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
 * - Stage A (Arrival, 0.00 - 0.34): Water rises from lower edge, crest deforms, tiny droplets separate.
 * - Stage B (Hold/Flow, 0.34 - 0.65): Covers lower ~45-50% of viewport; background stays readable through clear liquid.
 * - Stage C (Retreat, 0.65 - 1.00): Crest travels downward smoothly, droplets fall back, overlay unmounts.
 */
const TRANSITION_DURATION = 3.0;
const CONTENT_REVEAL_DELAY = 0.85;

/**
 * Primary organic water silhouette inspired by the reference silhouette:
 * Extends slightly past x=[0..1600] and y=600 (-40..1640, y=640) so SVG turbulence/displacement
 * never leaves a gap along the left, right, or bottom viewport edges.
 */
const PRIMARY_WATER_SILHOUETTE =
  'M -40 640 L -40 205 ' +
  'C 0 215, 135 285, 290 352 ' +
  'C 485 352, 675 348, 825 268 ' +
  'C 965 202, 1045 164, 1118 158 ' +
  'C 1158 162, 1178 226, 1148 274 ' +
  'C 1122 292, 1102 312, 1120 338 ' +
  'C 1168 368, 1275 392, 1395 396 ' +
  'C 1485 382, 1555 332, 1640 295 ' +
  'L 1640 640 Z';

/**
 * Normalized clip-path silhouette (0..1600 x 0..600) for CSS clipPath objectBoundingBox
 */
const CLIP_WATER_SILHOUETTE =
  'M 0 600 L 0 215 ' +
  'C 135 285, 290 352, 485 352 ' +
  'C 675 348, 825 268, 965 202 ' +
  'C 1045 164, 1118 158, 1152 196 ' +
  'C 1178 226, 1154 274, 1122 292 ' +
  'C 1098 306, 1110 338, 1168 356 ' +
  'C 1265 386, 1395 398, 1505 352 ' +
  'C 1552 332, 1582 312, 1600 302 ' +
  'L 1600 600 Z';

/**
 * Secondary inner refraction swell beneath the primary meniscus for liquid depth
 */
const SECONDARY_REFRACTION_SWELL =
  'M -40 640 L -40 242 ' +
  'C 165 312, 330 370, 525 362 ' +
  'C 710 354, 855 272, 995 218 ' +
  'C 1068 190, 1125 198, 1142 238 ' +
  'C 1156 270, 1130 318, 1185 358 ' +
  'C 1280 398, 1410 406, 1520 366 ' +
  'C 1565 348, 1605 330, 1640 318 ' +
  'L 1640 640 Z';

/**
 * Translucent subsurface fold on the rising slope (recreates the soft internal lens ribbon in the reference)
 */
const SUBSURFACE_LENS_RIBBON =
  'M 190 318 ' +
  'C 365 346, 545 310, 735 272 ' +
  'C 845 250, 930 242, 1005 218 ' +
  'C 920 286, 765 340, 580 354 ' +
  'C 415 366, 285 346, 190 318 Z';

/**
 * Secondary upper lens fold on the left-to-center wave slope
 */
const UPPER_SLOPE_CAUSTIC =
  'M 295 332 ' +
  'C 455 318, 615 272, 775 268 ' +
  'C 845 266, 905 252, 955 232 ' +
  'C 875 278, 735 312, 575 332 ' +
  'C 455 346, 365 344, 295 332 Z';

/**
 * Delicate crest fold highlight inside the right-hand curl
 */
const CREST_CURL_RIBBON =
  'M 940 212 ' +
  'C 1028 168, 1112 160, 1150 198 ' +
  'C 1174 224, 1152 272, 1118 294 ' +
  'C 1096 268, 1108 230, 1072 214 ' +
  'C 1036 198, 985 202, 940 212 Z';

/**
 * Continuous top meniscus path for glass-like surface tension highlight
 */
const MENISCUS_CREST_PATH =
  'M -40 205 ' +
  'C 0 215, 135 285, 290 352 ' +
  'C 485 352, 675 348, 825 268 ' +
  'C 965 202, 1045 164, 1118 158 ' +
  'C 1158 162, 1178 226, 1148 274 ' +
  'C 1122 292, 1102 312, 1120 338 ' +
  'C 1168 368, 1275 392, 1395 396 ' +
  'C 1485 382, 1555 332, 1640 295';

/**
 * Secondary trailing specular filament along the water surface
 */
const TRAILING_FILAMENT_PATH =
  'M 55 244 ' +
  'C 205 312, 365 362, 545 354 ' +
  'C 725 346, 868 262, 1002 204 ' +
  'C 1068 176, 1122 182, 1138 218';

interface MicroDroplet {
  id: string;
  /** X position in 0..1600 viewBox space */
  cx: number;
  /** Base Y position near the crest in 0..600 viewBox space */
  cy: number;
  /** Horizontal radius */
  rx: number;
  /** Vertical radius */
  ry: number;
  /** Peak upward separation offset in viewBox units */
  liftY: number;
  /** Horizontal drift in viewBox units */
  driftX: number;
  /** Rotation angle in degrees */
  angle: number;
  /** Stagger delay fraction */
  delay: number;
}

/**
 * Sparse, physically plausible micro-droplets separating near the crest and surface troughs
 */
const MICRO_DROPLETS: MicroDroplet[] = [
  { id: 'd1', cx: 1085, cy: 148, rx: 4.8, ry: 3.4, liftY: -28, driftX: 14, angle: -18, delay: 0.03 },
  { id: 'd2', cx: 1172, cy: 178, rx: 3.8, ry: 2.8, liftY: -22, driftX: 18, angle: 24, delay: 0.06 },
  { id: 'd3', cx: 1210, cy: 234, rx: 3.2, ry: 2.5, liftY: -16, driftX: 12, angle: 32, delay: 0.09 },
  { id: 'd4', cx: 982, cy: 176, rx: 4.0, ry: 2.9, liftY: -20, driftX: -10, angle: -22, delay: 0.05 },
  { id: 'd5', cx: 862, cy: 226, rx: 3.3, ry: 2.4, liftY: -15, driftX: -8, angle: -14, delay: 0.08 },
  { id: 'd6', cx: 645, cy: 282, rx: 3.5, ry: 2.5, liftY: -14, driftX: 6, angle: 12, delay: 0.10 },
  { id: 'd7', cx: 315, cy: 306, rx: 3.8, ry: 2.7, liftY: -16, driftX: -9, angle: -16, delay: 0.06 },
  { id: 'd8', cx: 1425, cy: 350, rx: 3.6, ry: 2.6, liftY: -18, driftX: 10, angle: 15, delay: 0.08 },
];

const WaterSheetOverlay: React.FC = () => {
  const rawId = useId();
  const uid = rawId.replace(/:/g, '');

  const clipPathId = `water-clip-${uid}`;
  const filterId = `water-disp-${uid}`;
  const bodyGradId = `water-body-${uid}`;
  const swellGradId = `water-swell-${uid}`;
  const lensGradId = `water-lens-${uid}`;
  const meniscusGradId = `water-meniscus-${uid}`;
  const edgeShadowGradId = `water-edge-${uid}`;
  const dropletGradId = `water-drop-${uid}`;

  return createPortal(
    <div
      data-wave-overlay="true"
      aria-hidden="true"
      className="fixed inset-x-0 bottom-0 h-[50vh] sm:h-[52vh] pointer-events-none overflow-hidden select-none"
      style={{ zIndex: 35 }}
    >
      {/* Main 3-stage vertical choreography: Arrival -> Coverage -> Retreat */}
      <motion.div
        initial={{ y: '102%' }}
        animate={{ y: ['102%', '0%', '2%', '104%'] }}
        transition={{
          duration: TRANSITION_DURATION,
          times: [0, 0.34, 0.65, 1],
          ease: [
            [0.16, 1, 0.3, 1], // Stage A: fluid upward surge decelerating into crest
            'easeInOut',       // Stage B: gentle floating suspension across lower ~48% of screen
            [0.4, 0, 0.85, 0.95], // Stage C: natural gravity-driven retreat downward
          ],
        }}
        className="relative w-full h-full will-change-transform"
      >
        {/*
          1. Subtle Optical Refraction Layer:
          Clipped strictly to the organic water silhouette so there is never a rectangular blur box.
          Uses a delicate 1px blur & saturation boost so all underlying photographs, cards, and text
          remain crisp and readable while exhibiting authentic liquid refraction.
        */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            clipPath: `url(#${clipPathId})`,
            WebkitClipPath: `url(#${clipPathId})`,
            backdropFilter: 'blur(1px) saturate(114%) brightness(101%)',
            WebkitBackdropFilter: 'blur(1px) saturate(114%) brightness(101%)',
          }}
        />

        {/*
          2. Photorealistic Translucent Liquid SVG Layer:
          Combines layered low-opacity icy-aqua gradients, organic surface displacement,
          drifting internal lens reflections, delicate glass meniscus highlights, and micro-droplets.
        */}
        <svg
          viewBox="0 0 1600 600"
          preserveAspectRatio="none"
          className="relative w-full h-full block overflow-visible"
        >
          <defs>
            {/* Responsive clipPath in objectBoundingBox units (1600x600 normalized to 1x1) for CSS backdrop-filter */}
            <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
              <path
                transform="scale(0.000625, 0.00166667)"
                d={CLIP_WATER_SILHOUETTE}
              />
            </clipPath>

            {/* Subtle organic liquid surface turbulence & displacement filter */}
            <filter
              id={filterId}
              x="-5%"
              y="-10%"
              width="110%"
              height="120%"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.005 0.016"
                numOctaves={2}
                seed={9}
                result="liquidNoise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="liquidNoise"
                scale={7}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>

            {/* Ultra-clear icy-aqua primary water body gradient (transparent so page stays readable) */}
            <linearGradient id={bodyGradId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E0F7FA" stopOpacity="0.18" />
              <stop offset="24%" stopColor="#BAE6FD" stopOpacity="0.15" />
              <stop offset="60%" stopColor="#7DD3FC" stopOpacity="0.21" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.28" />
            </linearGradient>

            {/* Secondary subsurface depth gradient */}
            <linearGradient id={swellGradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.12" />
              <stop offset="45%" stopColor="#A5F3FC" stopOpacity="0.14" />
              <stop offset="80%" stopColor="#38BDF8" stopOpacity="0.19" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.23" />
            </linearGradient>

            {/* Internal glass-like refraction ribbon gradient */}
            <linearGradient id={lensGradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.06" />
              <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.42" />
              <stop offset="70%" stopColor="#E0F2FE" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.12" />
            </linearGradient>

            {/* Subtle surface-tension refractive rim just under the meniscus */}
            <linearGradient id={edgeShadowGradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.22" />
              <stop offset="32%" stopColor="#0284C7" stopOpacity="0.32" />
              <stop offset="68%" stopColor="#0369A1" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.20" />
            </linearGradient>

            {/* Delicate white specular meniscus highlight */}
            <linearGradient id={meniscusGradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="28%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="58%" stopColor="#F0F9FF" stopOpacity="0.96" />
              <stop offset="78%" stopColor="#FFFFFF" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.48" />
            </linearGradient>

            {/* Clear water micro-droplet radial gradient */}
            <radialGradient id={dropletGradId} cx="35%" cy="30%" r="68%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="42%" stopColor="#E0F2FE" stopOpacity="0.55" />
              <stop offset="82%" stopColor="#38BDF8" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.48" />
            </radialGradient>
          </defs>

          {/* Deforming liquid surface group */}
          <motion.g
            initial={{ scaleY: 0.97, x: -6 }}
            animate={{
              scaleY: [0.97, 1.02, 0.99, 0.96],
              x: [-6, 0, 8, 3],
            }}
            transition={{
              duration: TRANSITION_DURATION,
              times: [0, 0.36, 0.68, 1],
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: '50% 100%' }}
            filter={`url(#${filterId})`}
          >
            {/* Layer 1: Primary translucent water sheet */}
            <path d={PRIMARY_WATER_SILHOUETTE} fill={`url(#${bodyGradId})`} />

            {/* Layer 2: Secondary gentle undulating subsurface swell */}
            <motion.path
              d={SECONDARY_REFRACTION_SWELL}
              fill={`url(#${swellGradId})`}
              initial={{ x: 10, y: 5 }}
              animate={{ x: [10, -10, 6], y: [5, -3, 6] }}
              transition={{ duration: TRANSITION_DURATION, ease: 'easeInOut' }}
            />

            {/* Layer 3: Drifting internal glass lens reflection on the left/center slope */}
            <motion.path
              d={SUBSURFACE_LENS_RIBBON}
              fill={`url(#${lensGradId})`}
              initial={{ x: -16, opacity: 0.55 }}
              animate={{ x: [-16, 14, -6], opacity: [0.55, 0.9, 0.45] }}
              transition={{ duration: TRANSITION_DURATION, ease: 'easeInOut' }}
            />

            {/* Layer 4: Secondary upper slope caustic shimmer */}
            <motion.path
              d={UPPER_SLOPE_CAUSTIC}
              fill={`url(#${lensGradId})`}
              initial={{ x: 12, opacity: 0.4 }}
              animate={{ x: [12, -12, 8], opacity: [0.4, 0.78, 0.35] }}
              transition={{ duration: TRANSITION_DURATION, ease: 'easeInOut' }}
            />

            {/* Layer 5: Delicate refractive fold inside the crest curl */}
            <motion.path
              d={CREST_CURL_RIBBON}
              fill={`url(#${lensGradId})`}
              initial={{ x: -6, y: 4, opacity: 0.55 }}
              animate={{ x: [-6, 7, -3], y: [4, -3, 5], opacity: [0.55, 0.88, 0.4] }}
              transition={{ duration: TRANSITION_DURATION, ease: 'easeInOut' }}
            />

            {/* Layer 6: Soft refractive water-tension rim just below the top crest */}
            <path
              d={MENISCUS_CREST_PATH}
              fill="none"
              stroke={`url(#${edgeShadowGradId})`}
              strokeWidth="4.2"
              strokeLinecap="round"
              transform="translate(0, 3.2)"
            />

            {/* Layer 7: Crisp, delicate white specular highlight along the top meniscus */}
            <path
              d={MENISCUS_CREST_PATH}
              fill="none"
              stroke={`url(#${meniscusGradId})`}
              strokeWidth="2.2"
              strokeLinecap="round"
            />

            {/* Layer 8: Secondary fine specular filament */}
            <motion.path
              d={TRAILING_FILAMENT_PATH}
              fill="none"
              stroke={`url(#${meniscusGradId})`}
              strokeWidth="1.3"
              strokeLinecap="round"
              initial={{ x: 8, opacity: 0.35 }}
              animate={{ x: [8, -12, 5], opacity: [0.35, 0.75, 0.25] }}
              transition={{ duration: TRANSITION_DURATION, ease: 'easeInOut' }}
            />
          </motion.g>

          {/* Sparse, realistic small liquid droplets separating and falling back */}
          <g>
            {MICRO_DROPLETS.map((drop) => (
              <motion.g
                key={drop.id}
                initial={{ x: 0, y: 14, opacity: 0, scale: 0.6 }}
                animate={{
                  x: [0, drop.driftX * 0.6, drop.driftX, drop.driftX * 1.15],
                  y: [14, drop.liftY, drop.liftY * 0.45, 24],
                  opacity: [0, 0.88, 0.76, 0],
                  scale: [0.6, 1, 0.92, 0.5],
                }}
                transition={{
                  duration: TRANSITION_DURATION * 0.82,
                  delay: drop.delay,
                  times: [0, 0.38, 0.68, 1],
                  ease: ['easeOut', 'easeInOut', 'easeIn'],
                }}
              >
                <g transform={`translate(${drop.cx}, ${drop.cy}) rotate(${drop.angle})`}>
                  <ellipse
                    rx={drop.rx}
                    ry={drop.ry}
                    fill={`url(#${dropletGradId})`}
                    stroke="rgba(2, 132, 199, 0.28)"
                    strokeWidth="0.6"
                  />
                  <ellipse
                    cx={-drop.rx * 0.28}
                    cy={-drop.ry * 0.28}
                    rx={drop.rx * 0.35}
                    ry={drop.ry * 0.22}
                    fill="#FFFFFF"
                    opacity="0.9"
                  />
                </g>
              </motion.g>
            ))}
          </g>
        </svg>
      </motion.div>
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
      (TRANSITION_DURATION + 0.15) * 1000
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
      {waterActive && <WaterSheetOverlay />}
    </div>
  );
};

export default RealisticWaterTransition;
