import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface MascotProps {
  mood?: 'excited' | 'scholar' | 'love' | 'party';
  className?: string;
}

export const ShinchanMascot: React.FC<MascotProps> = ({
  mood = 'excited',
  className = 'w-28 h-28',
}) => {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      animate={
        reducedMotion
          ? {}
          : {
              y: [0, -6, 0],
              rotate: [-2, 2, -2],
            }
      }
      transition={{
        duration: 3.2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 180 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        {/* Soft background halo */}
        <circle cx="90" cy="94" r="76" fill="#FFFDF7" stroke="#51463F" strokeWidth="4" />
        <circle cx="90" cy="94" r="68" fill="#FFE896" opacity="0.55" />

        {/* Party Cap (when party or excited) */}
        {(mood === 'party' || mood === 'excited') && (
          <g>
            <path
              d="M68 42 L92 10 L114 44 Z"
              fill="#F7B8C8"
              stroke="#51463F"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <circle cx="92" cy="10" r="7" fill="#FFD95A" stroke="#51463F" strokeWidth="3.5" />
            <path d="M77 32 Q91 37 106 33" stroke="#9DDDF2" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}

        {/* Scholar Graduation Cap */}
        {mood === 'scholar' && (
          <g>
            <polygon
              points="90,14 134,30 90,44 46,30"
              fill="#51463F"
              stroke="#51463F"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path d="M124 33 V54" stroke="#FFD95A" strokeWidth="4" strokeLinecap="round" />
            <circle cx="124" cy="56" r="4" fill="#FFD95A" />
          </g>
        )}

        {/* Ears */}
        <circle cx="38" cy="98" r="14" fill="#FBE4D3" stroke="#51463F" strokeWidth="4" />
        <circle cx="142" cy="98" r="14" fill="#FBE4D3" stroke="#51463F" strokeWidth="4" />

        {/* Chubby Cheek Cartoon Head (Playful Shinchan-inspired silhouette, 100% original character 'Chotu') */}
        <path
          d="M44 82 C44 52, 136 52, 136 82 C146 96, 146 128, 122 136 C104 142, 76 142, 58 136 C34 128, 34 96, 44 82 Z"
          fill="#FBE4D3"
          stroke="#51463F"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />

        {/* Hair crop */}
        <path
          d="M45 80 C48 50, 132 50, 135 80 C122 66, 104 64, 90 66 C74 64, 58 66, 45 80 Z"
          fill="#51463F"
        />

        {/* Iconic bold playful eyebrows */}
        <path
          d="M58 76 Q69 67 80 75"
          stroke="#51463F"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M100 75 Q111 67 122 76"
          stroke="#51463F"
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Big expressive eyes */}
        <circle cx="70" cy="93" r="9.5" fill="#51463F" />
        <circle cx="67" cy="90" r="3.5" fill="#FFFFFF" />
        <circle cx="110" cy="93" r="9.5" fill="#51463F" />
        <circle cx="107" cy="90" r="3.5" fill="#FFFFFF" />

        {/* Scholar Glasses */}
        {mood === 'scholar' && (
          <g>
            <circle cx="70" cy="93" r="15" stroke="#E2859E" strokeWidth="3.5" fill="none" />
            <circle cx="110" cy="93" r="15" stroke="#E2859E" strokeWidth="3.5" fill="none" />
            <line x1="85" y1="93" x2="95" y2="93" stroke="#E2859E" strokeWidth="3.5" />
          </g>
        )}

        {/* Rosy Blush Cheeks */}
        <ellipse cx="53" cy="108" rx="10" ry="6" fill="#F7B8C8" />
        <ellipse cx="127" cy="108" rx="10" ry="6" fill="#F7B8C8" />

        {/* Big Laughing Mouth */}
        <path
          d="M74 110 Q90 128 106 110 Z"
          fill="#E2859E"
          stroke="#51463F"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Shirt Collar */}
        <path
          d="M58 136 L122 136 L130 162 L50 162 Z"
          fill="#E2859E"
          stroke="#51463F"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <polygon points="90,145 78,136 102,136" fill="#FFD95A" stroke="#51463F" strokeWidth="3" />

        {/* Floating Heart Badge */}
        {mood === 'love' && (
          <path
            d="M145 45 C145 39, 136 36, 132 42 C128 36, 119 39, 119 45 C119 54, 132 61, 132 61 C132 61, 145 54, 145 45 Z"
            fill="#F7B8C8"
            stroke="#51463F"
            strokeWidth="3"
          />
        )}
      </svg>
    </motion.div>
  );
};
