import React, { useEffect, useRef } from 'react';
import { waterController } from './waterController';
import { FRAG, VERT } from './waterShader';

const DURATION_MS = 2900;
const PEAK_AT = 0.5;

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Waterline height (0..1.35) and vertical velocity for progress t. */
function frontAt(t: number) {
  if (t < PEAK_AT) {
    const k = t / PEAK_AT;
    return { front: -0.25 + 1.6 * easeInOut(k), vel: 1 - 0.3 * k };
  }
  const k = (t - PEAK_AT) / (1 - PEAK_AT);
  return { front: 1.35 - 1.6 * easeInOut(k), vel: -0.8 };
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(s);
    gl.deleteShader(s);
    throw new Error(log ?? 'shader compile failed');
  }
  return s;
}

/**
 * Mount once. Draws only while a splash is playing; the WebGL context is created lazily
 * and released afterwards. Falls back to a short cross-fade if WebGL or motion is unavailable.
 */
export const WaterTransition: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const veilRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const veil = veilRef.current!;
    let raf = 0;
    let cancelled = false;

    const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const fallback = (onPeak: () => void) =>
      new Promise<void>((resolve) => {
        veil.style.transition = 'opacity 180ms ease-out';
        veil.style.opacity = '1';
        window.setTimeout(() => {
          onPeak();
          veil.style.transition = 'opacity 260ms ease-in';
          veil.style.opacity = '0';
          window.setTimeout(resolve, 280);
        }, 190);
      });

    const run = ({ onPeak }: { onPeak: () => void }) => {
      if (reduced()) return fallback(onPeak);

      const gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false });
      if (!gl) return fallback(onPeak);

      let prog: WebGLProgram;
      let buf: WebGLBuffer | null;
      try {
        prog = gl.createProgram()!;
        gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
        gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('link failed');
      } catch {
        return fallback(onPeak);
      }

      buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      gl.useProgram(prog);
      const aPos = gl.getAttribLocation(prog, 'aPos');
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
      const uRes = gl.getUniformLocation(prog, 'uRes');
      const uFront = gl.getUniformLocation(prog, 'uFront');
      const uTime = gl.getUniformLocation(prog, 'uTime');
      const uVel = gl.getUniformLocation(prog, 'uVel');

      const small = window.innerWidth < 768;
      const dpr = Math.min(window.devicePixelRatio || 1, small ? 1 : 1.5) * (small ? 0.75 : 0.85);
      canvas.width = Math.max(2, Math.floor(window.innerWidth * dpr));
      canvas.height = Math.max(2, Math.floor(window.innerHeight * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      canvas.style.opacity = '1';

      return new Promise<void>((resolve) => {
        const start = performance.now();
        const total = small ? DURATION_MS * 0.85 : DURATION_MS;
        let peaked = false;

        const cleanup = () => {
          cancelAnimationFrame(raf);
          canvas.style.opacity = '0';
          gl.deleteBuffer(buf);
          gl.deleteProgram(prog);
          gl.getExtension('WEBGL_lose_context')?.loseContext();
          resolve();
        };

        const frame = (now: number) => {
          if (cancelled) return cleanup();
          const t = Math.min((now - start) / total, 1);
          const { front, vel } = frontAt(t);
          gl.clearColor(0, 0, 0, 0);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.uniform1f(uFront, front);
          gl.uniform1f(uVel, vel);
          gl.uniform1f(uTime, (now - start) / 1000);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
          if (!peaked && t >= PEAK_AT) {
            peaked = true;
            onPeak();
          }
          if (t < 1) raf = requestAnimationFrame(frame);
          else cleanup();
        };
        raf = requestAnimationFrame(frame);
      });
    };

    const unregister = waterController.register(run);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      unregister();
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 w-full h-full pointer-events-none z-[70] opacity-0"
      />
      <div
        ref={veilRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[70] opacity-0 bg-skyblue-soft/70"
      />
    </>
  );
};

export default WaterTransition;
