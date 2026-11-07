import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Cake, Flame, Sparkles, RotateCcw, ChevronDown, Music } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useAudio } from '../context/AudioContext';

interface BirthdayCakeProps {
  resetKey?: number;
  onNext?: () => void;
}

const TOTAL_CANDLES = 5;

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({ resetKey = 0, onNext }) => {
  const [litCandles, setLitCandles] = useState<boolean[]>([true, true, true, true, true]);
  const reducedMotion = useReducedMotion();
  const { playTrack, isPlaying, activeTrack } = useAudio();

  useEffect(() => {
    setLitCandles([true, true, true, true, true]);
  }, [resetKey]);

  const remainingCount = litCandles.filter(Boolean).length;
  const allExtinguished = remainingCount === 0;

  const fireCelebrationConfetti = () => {
    if (!reducedMotion) {
      confetti({
        particleCount: 110,
        spread: 85,
        origin: { y: 0.65 },
        colors: ['#FFD95A', '#F7B8C8', '#9DDDF2', '#F6C9A8', '#FF8DA1'],
      });
    }
    // Automatically celebrate with the high-energy Marathi birthday song climax!
    if (!isPlaying) {
      playTrack('climax');
    }
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

  const scrollToGift = () => {
    onNext?.();
  };

  return (
    <div
      aria-label="Chapter 07: The Birthday Cake"
      className="w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
    >
      <div className="text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sunshine border-2 border-cocoa shadow-sticker mb-2.5">
          <Cake className="w-3.5 h-3.5 text-cocoa" />
          <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-cocoa">
            CHAPTER 07 • MAKE A WISH
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-cocoa tracking-tight">
          MAKE A WISH, MUMMA!
        </h2>

        {/* Marathi Subtitle */}
        <p className="font-marathi text-sm sm:text-base font-bold text-cocoa mt-2">
          &ldquo;मेणबत्त्या विझवा आणि एक गोड इच्छा मागा!&rdquo;
        </p>

        <p className="text-xs sm:text-sm font-bold text-cocoa-light mt-1">
          {allExtinguished
            ? 'All 5 wishes made! Your family loves you endlessly!'
            : `Click each candle to blow it out (${remainingCount} of ${TOTAL_CANDLES} lit)`}
        </p>

        {/* The Birthday Cake Container */}
        <div className="mt-6 paper-card rounded-3xl p-5 sm:p-7 bg-cream-paper relative max-w-md mx-auto shadow-polaroid">
          <div className="washi-tape washi-tape-pink -top-2.5 left-1/2 -translate-x-1/2" />

          {/* 5 Candle Flames Row */}
          <div className="flex justify-center items-end gap-3 sm:gap-4 mb-2">
            {litCandles.map((isLit, i) => (
              <button
                key={i}
                type="button"
                onClick={() => toggleCandle(i)}
                className="group flex flex-col items-center cursor-pointer focus:outline-none"
                aria-label={isLit ? `Blow out candle ${i + 1}` : `Candle ${i + 1} extinguished`}
              >
                {/* Candle Flame / Smoke */}
                <div className="h-8 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {isLit ? (
                      <motion.div
                        key="flame"
                        animate={
                          reducedMotion
                            ? {}
                            : {
                                scale: [1, 1.15, 0.95, 1.1, 1],
                                y: [0, -1.5, 0],
                              }
                        }
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: i * 0.15,
                        }}
                      >
                        <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-sunshine-deep fill-sunshine animate-pulse" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="smoke"
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: [0.8, 0], y: -12 }}
                        transition={{ duration: 1 }}
                        className="w-1.5 h-3 bg-cocoa/30 rounded-full blur-[1px]"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Candle Stick */}
                <div
                  className={`w-3 sm:w-3.5 h-9 sm:h-11 rounded-t-sm border-2 border-cocoa transition-colors ${
                    i % 3 === 0
                      ? 'bg-blush'
                      : i % 3 === 1
                      ? 'bg-skyblue'
                      : 'bg-sunshine'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Illustrated 3-Tier Layer Cake */}
          <div className="w-full max-w-[260px] mx-auto">
            <svg viewBox="0 0 280 180" className="w-full h-auto drop-shadow-md">
              {/* Top Tier */}
              <rect
                x="65"
                y="10"
                width="150"
                height="45"
                rx="14"
                fill="#FFFDF7"
                stroke="#51463F"
                strokeWidth="4"
              />
              <path
                d="M 65 30 Q 80 40 95 30 T 125 30 T 155 30 T 185 30 T 215 30"
                fill="none"
                stroke="#F7B8C8"
                strokeWidth="4.5"
                strokeLinecap="round"
              />

              {/* Middle Tier */}
              <rect
                x="40"
                y="55"
                width="200"
                height="50"
                rx="16"
                fill="#F7B8C8"
                stroke="#51463F"
                strokeWidth="4"
              />
              <circle cx="70" cy="80" r="5" fill="#FFFDF7" />
              <circle cx="105" cy="80" r="5" fill="#FFD95A" />
              <circle cx="140" cy="80" r="5" fill="#FFFDF7" />
              <circle cx="175" cy="80" r="5" fill="#9DDDF2" />
              <circle cx="210" cy="80" r="5" fill="#FFFDF7" />

              {/* Bottom Tier */}
              <rect
                x="15"
                y="105"
                width="250"
                height="55"
                rx="18"
                fill="#FFFDF7"
                stroke="#51463F"
                strokeWidth="4"
              />
              <path
                d="M 15 125 Q 35 135 55 125 T 95 125 T 135 125 T 175 125 T 215 125 T 255 125 T 265 125"
                fill="none"
                stroke="#9DDDF2"
                strokeWidth="4.5"
                strokeLinecap="round"
              />

              {/* Cake Stand */}
              <rect
                x="5"
                y="160"
                width="270"
                height="12"
                rx="6"
                fill="#FFD95A"
                stroke="#51463F"
                strokeWidth="4"
              />
            </svg>
          </div>

          {/* Quick Action Buttons */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {!allExtinguished ? (
              <button
                type="button"
                onClick={blowAllCandles}
                className="px-4 py-2 rounded-xl bg-sunshine hover:bg-sunshine-deep text-cocoa font-heading font-bold text-xs sm:text-sm border-2 border-cocoa shadow-sticker cursor-pointer transition-all"
              >
                Blow All Candles at Once 💨
              </button>
            ) : (
              <button
                type="button"
                onClick={relightCandles}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cream hover:bg-sunshine-soft text-cocoa font-heading font-bold text-xs border border-cocoa cursor-pointer transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Relight Candles</span>
              </button>
            )}

            {/* Marathi Birthday Song Button */}
            <button
              type="button"
              onClick={() => playTrack(isPlaying ? activeTrack.id : 'climax')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cream-warm hover:bg-sunshine-soft text-cocoa font-heading font-bold text-xs border border-cocoa cursor-pointer transition-all shadow-xs"
              title="Play Marathi Birthday Song (हॅपी बर्थडे • रंगत संगत)"
            >
              <Music className={`w-3.5 h-3.5 ${isPlaying ? 'text-sunshine-deep animate-pulse' : 'text-cocoa'}`} />
              <span className="font-marathi">{isPlaying ? 'गाणं चालू आहे 🎵' : 'गाणं लावा 🎵'}</span>
            </button>
          </div>

          {/* Celebration Banner Once Extinguished */}
          <AnimatePresence>
            {allExtinguished && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8 }}
                className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-sunshine-light via-blush-light to-skyblue-light border-2 border-cocoa shadow-polaroid"
              >
                <h3 className="font-heading text-lg sm:text-xl font-bold text-cocoa mb-1">
                  HAPPY BIRTHDAY MUMMA! 🎂
                </h3>
                <p className="font-marathi text-xs sm:text-sm font-bold text-cocoa leading-relaxed mb-3">
                  &ldquo;तुझं आयुष्य आनंदाने, प्रेमाने आणि सुंदर क्षणांनी भरलेलं असो!&rdquo;
                </p>

                <button
                  type="button"
                  onClick={scrollToGift}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blush hover:bg-blush-deep text-cocoa font-heading font-bold text-xs sm:text-sm border-2 border-cocoa shadow-sticker hover:shadow-stickerHover hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-cocoa" />
                  <span>DISCOVER YOUR SURPRISE 🎁</span>
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
