import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface WaveRevealProps {
  children: React.ReactNode;
  /** Start the wave immediately on mount instead of waiting for the chapter to scroll into view */
  immediate?: boolean;
}

const WAVE_DURATION = 2.8; // seconds: sweep in -> hold (fully covered) -> recede
const CONTENT_DELAY = 1.05; // content swaps in while the waves are fully covering the screen

// Wavy-edged panel (wavy edge on the right; mirrored for the right-hand panel)
const PANEL_PATH =
  'M0,0 H86 C95,6 78,12 87,19 S96,32 87,40 S78,53 87,61 S96,74 87,82 S78,95 86,100 H0 Z';

interface LayerProps {
  side: 'left' | 'right';
  color: string;
  /** how far (in % of the panel width) the leading edge pushes past its resting cover position */
  reach: number;
  zIndex: number;
}

const WaveLayer: React.FC<LayerProps> = ({ side, color, reach, zIndex }) => {
  const dir = side === 'left' ? -1 : 1;
  const hidden = `${dir * 108}%`;
  const covered = `${dir * -reach}%`;
  return (
    <motion.div
      initial={{ x: hidden }}
      animate={{ x: [hidden, covered, covered, hidden] }}
      transition={{
        duration: WAVE_DURATION,
        times: [0, 0.4, 0.52, 1],
        ease: ['easeOut', 'linear', 'easeIn'],
      }}
      className="absolute top-0 h-full"
      style={{ width: '74vw', [side]: '-10vw', zIndex }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full block"
        style={{ transform: side === 'right' ? 'scaleX(-1)' : undefined }}
      >
        <path d={PANEL_PATH} fill={color} />
      </svg>
    </motion.div>
  );
};

const WaveOverlay: React.FC = () =>
  createPortal(
    <div
      data-wave-overlay="true"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 35 }}
    >
      {(['left', 'right'] as const).map((side) => (
        <React.Fragment key={side}>
          {/* foam crest (leads the wave, sits furthest inward, drawn at the back) */}
          <WaveLayer side={side} color="#F4FCFF" reach={8} zIndex={1} />
          {/* mid-water ribbon */}
          <WaveLayer side={side} color="#6CCDE6" reach={4} zIndex={2} />
          {/* deep ocean body (covers most of the screen) */}
          <WaveLayer side={side} color="#2A8FBD" reach={0} zIndex={3} />
        </React.Fragment>
      ))}
    </div>,
    document.body
  );

export const WaveReveal: React.FC<WaveRevealProps> = ({ children, immediate = false }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '0px 0px -30% 0px' });
  const [started, setStarted] = useState(false);
  const [waveActive, setWaveActive] = useState(false);

  useEffect(() => {
    if (!started && (immediate || inView)) {
      setStarted(true);
      if (!reducedMotion) setWaveActive(true);
    }
  }, [immediate, inView, started, reducedMotion]);

  useEffect(() => {
    if (!waveActive) return undefined;
    const t = window.setTimeout(() => setWaveActive(false), (WAVE_DURATION + 0.3) * 1000);
    return () => window.clearTimeout(t);
  }, [waveActive]);

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={started ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.98 }}
        transition={{
          duration: reducedMotion ? 0.05 : 0.9,
          delay: reducedMotion ? 0 : CONTENT_DELAY,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
      {waveActive && <WaveOverlay />}
    </div>
  );
};

export default WaveReveal;
