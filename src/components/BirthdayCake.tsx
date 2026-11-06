import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Cake, Flame, Sparkles, RotateCcw } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface BirthdayCakeProps {
  resetKey?: number;
}

const TOTAL_CANDLES = 5;

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({ resetKey = 0 }) => {
  const [litCandles, setLitCandles] = useState<boolean[]>([true, true, true, true, true]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setLitCandles([true, true, true, true, true]);
  }, [resetKey]);

  const remainingCount = litCandles.filter(Boolean).length;
  const allExtinguished = remainingCount === 0;

  const fireCelebrationConfetti = () => {
    if (reducedMotion) return;
    confetti({
      particleCount: 110,
      spread: 85,
      origin: { y: 0.65 },
      colors: ['#FFD95A', '#F7B8C8', '#9DDDF2', '#F6C9A8', '#FF8DA1'],
    });
  };

  const toggleCandle = (index: number) => {
    if (!litCandles[index]) return;
    const next = [...litCandles];
    next[index] = false;
    setLitCandles(next);

    if (next.every((c) => !c)) {
      fireCelebrationConfetti();
    }
  };

  const blowAllCandles = () => {
    setLitCandles([false, false, false, false, false]);
    fireCelebrationConfetti();
  };

  const relightCandles = () => {
    setLitCandles([true, true, true, true, true]);
  };

  return (
    <section
      id="cake"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cream via-sunshine-soft/60 to-cream border-y-2 border-cocoa/15 relative z-10"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sunshine border-2 border-cocoa shadow-sticker mb-4">
          <Cake className="w-4 h-4 text-cocoa" />
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-cocoa">
            Section 07 • The Birthday Cake
          </span>
        </div>

        <h2 className="font-heading text-3xl sm:text-5xl font-bold text-cocoa tracking-tight mb-3">
          IT&apos;S CAKE TIME!
        </h2>

        <p className="text-base sm:text-lg font-bold text-cocoa-light mb-8">
          Make a birthday wish and tap each of the {TOTAL_CANDLES} candles below to blow them out!
        </p>

        {/* Interactive Cake Stage Card */}
        <div className="paper-card rounded-3xl p-6 sm:p-10 bg-cream-paper relative max-w-2xl mx-auto">
          <div className="washi-tape washi-tape-pink -top-3 left-1/2 -translate-x-1/2" />

          {/* Status Pill */}
          <div className="mb-6">
            {allExtinguished ? (
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blush border-2 border-cocoa text-xs sm:text-sm font-extrabold text-cocoa shadow-sticker">
                <Sparkles className="w-4 h-4" />
                All candles blown out! Wish locked in! 🎉
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sunshine-soft border-2 border-cocoa/30 text-xs sm:text-sm font-extrabold text-cocoa">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-400" />
                {remainingCount} of {TOTAL_CANDLES} candles still glowing — tap any candle flame!
              </span>
            )}
          </div>

          {/* Interactive Candles Row + Pastel Layered Cake Illustration */}
          <div className="relative mx-auto max-w-md pt-6 pb-2 select-none">
            {/* 5 Interactive Candle Buttons Positioned Above Top Tier */}
            <div className="flex items-end justify-center gap-5 sm:gap-7 mb-[-10px] relative z-20">
              {litCandles.map((isLit, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleCandle(idx)}
                  aria-label={
                    isLit
                      ? `Blow out birthday candle ${idx + 1}`
                      : `Birthday candle ${idx + 1} extinguished`
                  }
                  className="group flex flex-col items-center cursor-pointer focus:outline-none p-1"
                >
                  {/* Flame or Smoke Puff */}
                  <div className="h-11 flex items-center justify-center">
                    {isLit ? (
                      <motion.div
                        animate={
                          reducedMotion
                            ? {}
                            : {
                                scale: [1, 1.14, 0.96, 1.08, 1],
                                rotate: [-4, 4, -3, 3, 0],
                              }
                        }
                        transition={{
                          duration: 1.4,
                          repeat: Infinity,
                          delay: idx * 0.15,
                        }}
                        className="relative"
                      >
                        <div className="w-6 h-8 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 border-2 border-cocoa shadow-[0_0_16px_rgba(255,180,0,0.85)]" />
                      </motion.div>
                    ) : (
                      <motion.span
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: -4 }}
                        className="text-xs font-extrabold text-cocoa-muted"
                      >
                        ✨
                      </motion.span>
                    )}
                  </div>

                  {/* Wick */}
                  <div className="w-1 h-2 bg-cocoa" />

                  {/* Striped Pastel Candle Stick */}
                  <div
                    className={`w-5 sm:w-6 h-16 sm:h-20 rounded-t-md border-2 border-cocoa shadow-sm transition-transform group-hover:scale-105 ${
                      idx % 2 === 0 ? 'bg-blush' : 'bg-skyblue'
                    } flex flex-col justify-evenly overflow-hidden`}
                  >
                    <div className="w-full h-2 bg-cream-paper/80 -rotate-12" />
                    <div className="w-full h-2 bg-cream-paper/80 -rotate-12" />
                    <div className="w-full h-2 bg-cream-paper/80 -rotate-12" />
                  </div>
                </button>
              ))}
            </div>

            {/* Illustrated 2-Tier Pastel Birthday Cake SVG */}
            <svg
              viewBox="0 0 360 210"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto drop-shadow-md relative z-10"
            >
              {/* Top Tier Sponge */}
              <rect
                x="65"
                y="12"
                width="230"
                height="74"
                rx="16"
                fill="#FFF4C8"
                stroke="#51463F"
                strokeWidth="4.5"
              />
              {/* Top Tier Pink Frosting Drips */}
              <path
                d="M65 28 C65 16, 75 12, 85 12 L275 12 C285 12, 295 16, 295 28 L295 36 C280 48, 268 28, 254 40 C240 52, 226 28, 210 42 C194 54, 180 28, 164 42 C148 54, 134 28, 118 40 C102 52, 85 28, 65 38 Z"
                fill="#F7B8C8"
                stroke="#51463F"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              {/* Cherries / Strawberries on Top */}
              <circle cx="95" cy="12" r="9" fill="#E2859E" stroke="#51463F" strokeWidth="3.5" />
              <circle cx="150" cy="12" r="9" fill="#E2859E" stroke="#51463F" strokeWidth="3.5" />
              <circle cx="210" cy="12" r="9" fill="#E2859E" stroke="#51463F" strokeWidth="3.5" />
              <circle cx="265" cy="12" r="9" fill="#E2859E" stroke="#51463F" strokeWidth="3.5" />

              {/* Bottom Tier Sponge */}
              <rect
                x="35"
                y="82"
                width="290"
                height="96"
                rx="20"
                fill="#FBE4D3"
                stroke="#51463F"
                strokeWidth="4.5"
              />
              {/* Bottom Tier Sky-Blue Frosting Drips */}
              <path
                d="M35 100 C35 86, 48 82, 60 82 L300 82 C312 82, 325 86, 325 100 L325 110 C306 124, 290 98, 272 114 C254 128, 238 98, 218 114 C198 128, 182 98, 162 114 C142 128, 124 98, 104 114 C84 128, 60 98, 35 112 Z"
                fill="#9DDDF2"
                stroke="#51463F"
                strokeWidth="4"
                strokeLinejoin="round"
              />

              {/* Cake Plate Label */}
              <rect
                x="105"
                y="126"
                width="150"
                height="34"
                rx="10"
                fill="#FFFDF7"
                stroke="#51463F"
                strokeWidth="3.5"
              />
              <text
                x="180"
                y="148"
                textAnchor="middle"
                fill="#51463F"
                fontFamily="Fredoka, sans-serif"
                fontWeight="700"
                fontSize="16"
              >
                MUMMA ❤️ 9 NOV
              </text>

              {/* Cake Stand Platter */}
              <rect
                x="16"
                y="176"
                width="328"
                height="18"
                rx="9"
                fill="#FFD95A"
                stroke="#51463F"
                strokeWidth="4.5"
              />
            </svg>
          </div>

          {/* Quick Action Buttons */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {!allExtinguished ? (
              <button
                type="button"
                onClick={blowAllCandles}
                className="px-5 py-2.5 rounded-2xl bg-sunshine hover:bg-sunshine-deep text-cocoa font-heading font-bold text-sm sm:text-base border-2 border-cocoa shadow-sticker cursor-pointer transition-all"
              >
                Blow All Candles at Once 💨
              </button>
            ) : (
              <button
                type="button"
                onClick={relightCandles}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-cream hover:bg-sunshine-soft text-cocoa font-heading font-bold text-sm border-2 border-cocoa shadow-sticker cursor-pointer transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Relight Candles
              </button>
            )}
          </div>

          {/* Celebration Banner Reveal Once All Candles Are Extinguished */}
          <AnimatePresence>
            {allExtinguished && (
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sunshine-light via-blush-light to-skyblue-light border-3 border-cocoa shadow-polaroid"
                style={{ borderWidth: '3px' }}
              >
                <h3 className="font-heading text-2xl sm:text-4xl font-bold text-cocoa mb-3">
                  HAPPY BIRTHDAY MUMMA! 🎂
                </h3>
                <p className="font-marathi text-xl sm:text-2xl font-bold text-cocoa leading-relaxed">
                  &ldquo;तुझं आयुष्य आनंदाने, प्रेमाने आणि सुंदर क्षणांनी भरलेलं असो!&rdquo;
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
