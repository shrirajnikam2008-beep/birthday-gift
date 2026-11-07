import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface WaveRevealProps {
  children: React.ReactNode;
  /** Start the wave immediately on mount instead of waiting for the chapter to scroll into view */
  immediate?: boolean;
}

const WAVE_DURATION = 2.8; // seconds: surge -> crest across bottom half -> recede
const CONTENT_DELAY = 0.95; // chapter content reveals as water crests

// Realistic 3D Water Bubble Component matching the user's reference illustration
interface BubbleData {
  cx: number;
  cy: number;
  r: number;
}

const WATER_BUBBLES: BubbleData[] = [
  // Crest & Curl prominent bubbles
  { cx: 1390, cy: 220, r: 18 },
  { cx: 1430, cy: 270, r: 14 },
  { cx: 1340, cy: 250, r: 13 },
  { cx: 1300, cy: 280, r: 16 },
  { cx: 1240, cy: 260, r: 11 },
  { cx: 1180, cy: 230, r: 15 },
  { cx: 1120, cy: 210, r: 12 },
  { cx: 1050, cy: 225, r: 17 },
  { cx: 980, cy: 245, r: 10 },
  { cx: 920, cy: 260, r: 14 },
  { cx: 850, cy: 275, r: 12 },
  { cx: 780, cy: 290, r: 16 },
  { cx: 710, cy: 300, r: 11 },
  { cx: 640, cy: 315, r: 15 },
  { cx: 570, cy: 325, r: 10 },
  { cx: 500, cy: 335, r: 14 },
  { cx: 430, cy: 335, r: 11 },
  { cx: 350, cy: 320, r: 16 },
  { cx: 280, cy: 305, r: 12 },
  { cx: 200, cy: 285, r: 15 },
  { cx: 120, cy: 270, r: 13 },

  // Submerged descending bubbles (floating underneath the waterline)
  { cx: 1370, cy: 360, r: 12 },
  { cx: 1310, cy: 420, r: 9 },
  { cx: 1220, cy: 350, r: 13 },
  { cx: 1150, cy: 410, r: 10 },
  { cx: 1060, cy: 370, r: 14 },
  { cx: 990, cy: 430, r: 8 },
  { cx: 920, cy: 380, r: 12 },
  { cx: 840, cy: 420, r: 15 },
  { cx: 770, cy: 470, r: 9 },
  { cx: 700, cy: 390, r: 13 },
  { cx: 620, cy: 440, r: 10 },
  { cx: 540, cy: 410, r: 14 },
  { cx: 470, cy: 460, r: 9 },
  { cx: 390, cy: 410, r: 12 },
  { cx: 310, cy: 450, r: 8 },
  { cx: 230, cy: 380, r: 13 },
  { cx: 160, cy: 430, r: 10 },

  // Tiny water droplet beads
  { cx: 1460, cy: 320, r: 5 },
  { cx: 1380, cy: 170, r: 6 },
  { cx: 1270, cy: 220, r: 5 },
  { cx: 1150, cy: 180, r: 6 },
  { cx: 1020, cy: 210, r: 4.5 },
  { cx: 890, cy: 240, r: 5.5 },
  { cx: 750, cy: 270, r: 5 },
  { cx: 610, cy: 300, r: 6 },
  { cx: 470, cy: 310, r: 4.5 },
  { cx: 330, cy: 290, r: 5.5 },
  { cx: 180, cy: 260, r: 5 },
  { cx: 80, cy: 250, r: 6 },
  { cx: 1280, cy: 470, r: 4.5 },
  { cx: 1040, cy: 460, r: 5 },
  { cx: 820, cy: 480, r: 4 },
  { cx: 600, cy: 470, r: 5.5 },
  { cx: 360, cy: 460, r: 4.5 },
];

// Fluid Wave Ribbon Profiles matching reference image (viewBox 0 0 1600 600)
// Main body of crystal water
const MAIN_WATER_BODY =
  'M 0 600 L 0 260 C 240 320 440 340 680 290 C 920 230 1120 150 1330 180 C 1440 195 1520 260 1490 320 C 1450 380 1340 360 1310 310 C 1280 250 1360 190 1450 210 C 1530 230 1580 300 1600 340 L 1600 600 Z';

// Top crest outline path for the dark sapphire wave crest border
const WAVE_CREST_LINE =
  'M 0 260 C 240 320 440 340 680 290 C 920 230 1120 150 1330 180 C 1440 195 1520 260 1490 320 C 1450 380 1340 360 1310 310 C 1280 250 1360 190 1450 210 C 1530 230 1580 300 1600 340';

// Graceful secondary translucent water ribbon flowing across the crest
const TRANSLUCENT_RIBBON_1 =
  'M 100 280 C 350 330 550 340 780 290 C 1000 240 1180 160 1360 180 C 1440 190 1490 230 1470 270 C 1370 290 1260 220 1120 240 C 900 280 680 360 440 360 C 280 360 180 320 100 280 Z';

// Delicate accent swirl inside the wave curl
const CURL_ACCENT_SWIRL =
  'M 1240 230 C 1310 180 1410 180 1460 210 C 1510 240 1520 280 1480 320 C 1440 360 1360 340 1340 300 C 1320 260 1370 220 1430 230';

interface CrystalWaveSideProps {
  side: 'left' | 'right';
}

const CrystalWaveSide: React.FC<CrystalWaveSideProps> = ({ side }) => {
  const isLeft = side === 'left';
  const dir = isLeft ? -1 : 1;
  const hiddenX = `${dir * 115}%`;
  // Waves meet in the center across the bottom half
  const surgeX = `${dir * -10}%`;

  return (
    <motion.div
      initial={{ x: hiddenX, y: 25 }}
      animate={{
        x: [hiddenX, surgeX, surgeX, hiddenX],
        y: [25, 0, 0, 25],
      }}
      transition={{
        duration: WAVE_DURATION,
        times: [0, 0.42, 0.54, 1],
        ease: ['easeOut', 'linear', 'easeInOut'],
      }}
      className="absolute bottom-0 h-full w-[72vw] pointer-events-none"
      style={{
        [side]: '-6vw',
        transform: isLeft ? undefined : 'scaleX(-1)',
      }}
    >
      <svg
        viewBox="0 0 1600 600"
        preserveAspectRatio="none"
        className="w-full h-full block overflow-visible"
        style={{
          filter: 'drop-shadow(0 -8px 20px rgba(15, 76, 129, 0.28))',
        }}
      >
        <defs>
          {/* Main water body gradient (crystal sky to deep sapphire) */}
          <linearGradient id={`waterBodyGrad-${side}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.75" />
            <stop offset="25%" stopColor="#7DD3FC" stopOpacity="0.82" />
            <stop offset="60%" stopColor="#0284C7" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#075985" stopOpacity="0.95" />
          </linearGradient>

          {/* Translucent cyan ribbon gradient */}
          <linearGradient id={`ribbonGrad-${side}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#BAE6FD" stopOpacity="0.7" />
            <stop offset="85%" stopColor="#38BDF8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.85" />
          </linearGradient>

          {/* Specular crest reflection gradient */}
          <linearGradient id={`specularCrestGrad-${side}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.2" />
            <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="65%" stopColor="#BAE6FD" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.6" />
          </linearGradient>

          {/* 3D Glassy Bubble radial gradient */}
          <radialGradient id={`bubbleGrad-${side}`} cx="38%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#E0F2FE" stopOpacity="0.75" />
            <stop offset="65%" stopColor="#7DD3FC" stopOpacity="0.5" />
            <stop offset="90%" stopColor="#0284C7" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#0F4C81" stopOpacity="0.9" />
          </radialGradient>
        </defs>

        {/* 1. Main crystal water body */}
        <path d={MAIN_WATER_BODY} fill={`url(#waterBodyGrad-${side})`} />

        {/* 2. Flowing translucent turquoise ribbon */}
        <path d={TRANSLUCENT_RIBBON_1} fill={`url(#ribbonGrad-${side})`} />

        {/* 3. Wave curl accent swirl */}
        <path
          d={CURL_ACCENT_SWIRL}
          fill="none"
          stroke="#0F4C81"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* 4. Sapphire wave crest outline (gives the crisp illustrated water look) */}
        <path
          d={WAVE_CREST_LINE}
          fill="none"
          stroke="#0F4C81"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.92"
        />

        {/* 5. Glistening pure white specular highlight directly beneath the crest line */}
        <path
          d={WAVE_CREST_LINE}
          fill="none"
          stroke={`url(#specularCrestGrad-${side})`}
          strokeWidth="2"
          strokeLinecap="round"
          transform="translate(0, 3)"
          opacity="0.85"
        />

        {/* 6. Realistic 3D Glassy Water Bubbles matching reference */}
        {WATER_BUBBLES.map((b, idx) => (
          <g key={idx} transform={`translate(${b.cx}, ${b.cy})`}>
            {/* Base spherical bubble with glassy depth */}
            <circle
              r={b.r}
              fill={`url(#bubbleGrad-${side})`}
              stroke="#0F4C81"
              strokeWidth={b.r > 10 ? 1.8 : 1.2}
            />
            {/* Top-left curved specular light crescent reflection */}
            <ellipse
              cx={-b.r * 0.3}
              cy={-b.r * 0.32}
              rx={b.r * 0.42}
              ry={b.r * 0.22}
              transform="rotate(-30)"
              fill="#FFFFFF"
              opacity="0.92"
            />
            {/* Bottom-right secondary pinpoint glint reflection */}
            <circle
              cx={b.r * 0.32}
              cy={b.r * 0.35}
              r={Math.max(1, b.r * 0.16)}
              fill="#FFFFFF"
              opacity="0.8"
            />
          </g>
        ))}
      </svg>
    </motion.div>
  );
};

// Center Bubble Swirl & Spray Mist when left and right waves meet
const CenterBubbleSurge: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75, y: 15 }}
      animate={{
        opacity: [0, 0, 0.95, 0.9, 0],
        scale: [0.75, 0.85, 1.05, 1.1, 0.95],
        y: [15, 10, -18, -25, -10],
      }}
      transition={{
        duration: WAVE_DURATION,
        times: [0, 0.38, 0.48, 0.62, 0.85],
        ease: 'easeOut',
      }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 w-80 h-48 pointer-events-none z-30 flex items-center justify-center"
    >
      <svg viewBox="0 0 280 180" className="w-full h-full overflow-visible">
        <defs>
          <radialGradient id="surgeMist" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#BAE6FD" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient spray mist glow */}
        <ellipse cx="140" cy="110" rx="100" ry="42" fill="url(#surgeMist)" />

        {/* Dynamic water spray arcs */}
        <path
          d="M 140 135 Q 115 75 90 45 Q 96 38 106 56 Q 128 92 140 118 Z"
          fill="#E0F2FE"
          opacity="0.9"
        />
        <path
          d="M 140 135 Q 165 70 190 40 Q 184 32 172 50 Q 152 86 140 118 Z"
          fill="#E0F2FE"
          opacity="0.9"
        />

        {/* Center floating glass bubbles */}
        <circle cx="140" cy="22" r="6" fill="#E0F2FE" stroke="#0F4C81" strokeWidth="1.2" opacity="0.95" />
        <ellipse cx="138" cy="20" rx="2.5" ry="1.2" fill="#FFFFFF" opacity="0.9" />

        <circle cx="95" cy="40" r="5" fill="#E0F2FE" stroke="#0F4C81" strokeWidth="1.2" opacity="0.9" />
        <ellipse cx="93" cy="38" rx="2" ry="1" fill="#FFFFFF" opacity="0.9" />

        <circle cx="185" cy="36" r="5" fill="#E0F2FE" stroke="#0F4C81" strokeWidth="1.2" opacity="0.9" />
        <ellipse cx="183" cy="34" rx="2" ry="1" fill="#FFFFFF" opacity="0.9" />

        <circle cx="115" cy="28" r="3.5" fill="#FFFFFF" opacity="0.95" />
        <circle cx="165" cy="25" r="3.5" fill="#FFFFFF" opacity="0.95" />
      </svg>
    </motion.div>
  );
};

// Ocean Wave Transition: Covers JUST the bottom half portion of the page (~48vh)
const WaveOverlay: React.FC = () =>
  createPortal(
    <div
      data-wave-overlay="true"
      aria-hidden="true"
      className="fixed bottom-0 left-0 right-0 h-[46vh] sm:h-[48vh] pointer-events-none overflow-hidden select-none"
      style={{ zIndex: 35 }}
    >
      {/* Crystal water wave surging from left and right matching user reference */}
      <CrystalWaveSide side="left" />
      <CrystalWaveSide side="right" />

      {/* Dynamic bubble surge where the waves meet */}
      <CenterBubbleSurge />
    </div>,
    document.body
  );

export const WaveReveal: React.FC<WaveRevealProps> = ({ children, immediate = false }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '0px 0px -25% 0px' });
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
        initial={{ opacity: 0, y: 25, scale: 0.99 }}
        animate={started ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 25, scale: 0.99 }}
        transition={{
          duration: reducedMotion ? 0.05 : 0.85,
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
