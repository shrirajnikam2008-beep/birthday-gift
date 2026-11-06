import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

const doodles = [
  { id: 1, type: 'star', top: '12%', left: '4%', color: '#FFD95A', size: 24, delay: 0 },
  { id: 2, type: 'heart', top: '24%', right: '5%', color: '#F7B8C8', size: 22, delay: 0.8 },
  { id: 3, type: 'flower', top: '46%', left: '3%', color: '#9DDDF2', size: 26, delay: 1.5 },
  { id: 4, type: 'star', top: '65%', right: '4%', color: '#F6C9A8', size: 22, delay: 0.4 },
  { id: 5, type: 'heart', top: '82%', left: '5%', color: '#F7B8C8', size: 20, delay: 1.2 },
  { id: 6, type: 'flower', top: '91%', right: '6%', color: '#FFD95A', size: 24, delay: 2.0 },
];

export const FloatingDecorations: React.FC = () => {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden sm:block"
      aria-hidden="true"
    >
      {doodles.map((d) => (
        <motion.div
          key={d.id}
          style={{
            position: 'absolute',
            top: d.top,
            left: d.left,
            right: d.right,
            width: d.size,
            height: d.size,
          }}
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, -10, 0],
                  rotate: [-6, 6, -6],
                }
          }
          transition={{
            duration: 5 + d.delay,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: d.delay,
          }}
          className="opacity-45"
        >
          {d.type === 'star' && (
            <svg viewBox="0 0 32 32" fill="none">
              <path
                d="M16 2L20 11L30 12.5L22.5 19.5L24.5 29.5L16 24.5L7.5 29.5L9.5 19.5L2 12.5L12 11L16 2Z"
                fill={d.color}
                stroke="#51463F"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {d.type === 'heart' && (
            <svg viewBox="0 0 32 32" fill="none">
              <path
                d="M16 27C16 27 4 19.5 4 10.5C4 6.5 7.2 3.5 11 3.5C13.4 3.5 15.2 4.8 16 6.5C16.8 4.8 18.6 3.5 21 3.5C24.8 3.5 28 6.5 28 10.5C28 19.5 16 27 16 27Z"
                fill={d.color}
                stroke="#51463F"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {d.type === 'flower' && (
            <svg viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="8" r="5" fill={d.color} stroke="#51463F" strokeWidth="1.8" />
              <circle cx="24" cy="16" r="5" fill={d.color} stroke="#51463F" strokeWidth="1.8" />
              <circle cx="16" cy="24" r="5" fill={d.color} stroke="#51463F" strokeWidth="1.8" />
              <circle cx="8" cy="16" r="5" fill={d.color} stroke="#51463F" strokeWidth="1.8" />
              <circle cx="16" cy="16" r="4.5" fill="#FFD95A" stroke="#51463F" strokeWidth="1.8" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
};
