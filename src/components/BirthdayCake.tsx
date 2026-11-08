import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Cake, Flame, Sparkles, RotateCcw, ChevronDown, Music, Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useAudio } from '../context/AudioContext';

interface BirthdayCakeProps {
  resetKey?: number;
  onPrev?: () => void;
  onNext?: () => void;
}

const CANDLE_WISHES = [
  { id: 1, title: 'Radiant Health & Happiness', emoji: '🌸' },
  { id: 2, title: 'PhD & Academic Milestones', emoji: '🎓' },
  { id: 3, title: 'Joyful Rides & Adventures', emoji: '🏍️' },
  { id: 4, title: 'Endless Laughter at Home', emoji: '✨' },
  { id: 5, title: 'Boundless Family Love', emoji: '❤️' },
];

const TOTAL_CANDLES = CANDLE_WISHES.length;

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({ resetKey = 0, onPrev, onNext }) => {
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
      className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
    >
      <div className="text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sunshine border-2 border-cocoa shadow-sticker mb-2.5">
          <Cake className="w-3.5 h-3.5 text-cocoa" />
          <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-cocoa">
            CHAPTER 07 • MAKE FIVE BIRTHDAY WISHES
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
            ? 'All 5 birthday wishes unlocked! Your family loves you endlessly!'
            : `Tap each candle flame to blow it out & unlock a wish (${remainingCount} of ${TOTAL_CANDLES} lit)`}
        </p>

        {/* The Birthday Cake Container */}
        <div className="mt-6 paper-card rounded-3xl p-5 sm:p-7 bg-cream-paper relative max-w-lg mx-auto shadow-polaroid">
          <div className="washi-tape washi-tape-pink -top-2.5 left-1/2 -translate-x-1/2" />

          {/* 5 Candle Flames Row */}
          <div className="flex justify-center items-end gap-4 sm:gap-5 mb-1">
            {litCandles.map((isLit, i) => (
              <button
                key={i}
                type="button"
                onClick={() => toggleCandle(i)}
                className="group flex flex-col items-center cursor-pointer"
                aria-label={isLit ? `Blow out candle ${i + 1}` : `Candle ${i + 1} extinguished`}
              >
                {/* Candle Flame / Smoke */}
                <div className="h-8 sm:h-9 flex items-center justify-center relative">
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
                        className="relative flex items-center justify-center"
                      >
                        <span className="absolute w-6 h-6 rounded-full bg-sunshine/60 blur-xs" />
                        <Flame className="relative w-5 h-5 sm:w-6 sm:h-6 text-sunshine-deep fill-sunshine" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="smoke"
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: [0.85, 0], y: -14 }}
                        transition={{ duration: 0.9 }}
                        className="w-1.5 h-3.5 bg-cocoa/35 rounded-full blur-[1px]"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Candle Stick */}
                <div
                  className={`w-3.5 sm:w-4 h-10 sm:h-11 rounded-t-sm border-2 border-cocoa transition-transform group-hover:scale-105 ${
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
          <div className="w-full max-w-[270px] mx-auto">
            <svg viewBox="0 0 280 185" className="w-full h-auto drop-shadow-md">
              {/* Decorative Strawberries */}
              <circle cx="88" cy="11" r="6" fill="#E2859E" stroke="#51463F" strokeWidth="2.5" />
              <circle cx="140" cy="9" r="6.5" fill="#E2859E" stroke="#51463F" strokeWidth="2.5" />
              <circle cx="192" cy="11" r="6" fill="#E2859E" stroke="#51463F" strokeWidth="2.5" />

              {/* Top Tier */}
              <rect
                x="65"
                y="15"
                width="150"
                height="44"
                rx="14"
                fill="#FFFDF7"
                stroke="#51463F"
                strokeWidth="4"
              />
              <path
                d="M 65 33 Q 80 43 95 33 T 125 33 T 155 33 T 185 33 T 215 33"
                fill="none"
                stroke="#F7B8C8"
                strokeWidth="4.5"
                strokeLinecap="round"
              />

              {/* Middle Tier */}
              <rect
                x="40"
                y="59"
                width="200"
                height="50"
                rx="16"
                fill="#F7B8C8"
                stroke="#51463F"
                strokeWidth="4"
              />
              <circle cx="70" cy="84" r="5" fill="#FFFDF7" />
              <circle cx="105" cy="84" r="5" fill="#FFD95A" />
              <circle cx="140" cy="84" r="5.5" fill="#FFFDF7" />
              <circle cx="175" cy="84" r="5" fill="#9DDDF2" />
              <circle cx="210" cy="84" r="5" fill="#FFFDF7" />

              {/* Bottom Tier */}
              <rect
                x="15"
                y="109"
                width="250"
                height="54"
                rx="18"
                fill="#FFFDF7"
                stroke="#51463F"
                strokeWidth="4"
              />
              <path
                d="M 15 129 Q 35 139 55 129 T 95 129 T 135 129 T 175 129 T 215 129 T 255 129 T 265 129"
                fill="none"
                stroke="#9DDDF2"
                strokeWidth="4.5"
                strokeLinecap="round"
              />

              {/* Cake Stand */}
              <rect
                x="5"
                y="163"
                width="270"
                height="12"
                rx="6"
                fill="#FFD95A"
                stroke="#51463F"
                strokeWidth="4"
              />
            </svg>
          </div>

          {/* 5 Birthday Wishes Tracker Pills */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-left">
            {CANDLE_WISHES.map((wish, idx) => {
              const isUnlocked = !litCandles[idx];
              return (
                <button
                  key={wish.id}
                  type="button"
                  onClick={() => toggleCandle(idx)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center justify-between gap-2 transition-all cursor-pointer ${
                    isUnlocked
                      ? 'bg-sunshine-soft border-cocoa text-cocoa shadow-2xs'
                      : 'bg-cream/60 border-cocoa/20 text-cocoa-light hover:border-cocoa/40'
                  } ${idx === 4 ? 'sm:col-span-2' : ''}`}
                >
                  <span className="truncate">
                    {wish.emoji} Wish 0{wish.id}: {wish.title}
                  </span>
                  {isUnlocked ? (
                    <Check className="w-3.5 h-3.5 text-cocoa shrink-0" />
                  ) : (
                    <span className="text-[10px] font-extrabold text-cocoa/60 shrink-0">Tap 🕯️</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Action Buttons */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {!allExtinguished ? (
              <button
                type="button"
                onClick={blowAllCandles}
                className="px-4 py-2 rounded-xl bg-sunshine hover:bg-sunshine-deep active:scale-95 text-cocoa font-heading font-bold text-xs sm:text-sm border-2 border-cocoa shadow-sticker cursor-pointer transition-all"
              >
                Blow All Candles at Once 💨
              </button>
            ) : (
              <button
                type="button"
                onClick={relightCandles}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cream hover:bg-sunshine-soft text-cocoa font-heading font-bold text-xs border-2 border-cocoa cursor-pointer transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Relight Candles</span>
              </button>
            )}

            {/* Marathi Birthday Song Button */}
            <button
              type="button"
              onClick={() => playTrack(isPlaying ? activeTrack.id : 'climax')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cream-warm hover:bg-sunshine-soft text-cocoa font-heading font-bold text-xs border-2 border-cocoa cursor-pointer transition-all shadow-xs"
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
          {/* Chapter 07 Navigation Footer */}
          <div className="mt-5 pt-3 border-t border-dashed border-cocoa/15 flex flex-wrap items-center justify-center gap-2.5">
            {onPrev && (
              <button
                type="button"
                onClick={onPrev}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cream hover:bg-sunshine-soft text-cocoa font-heading font-bold text-xs border-2 border-cocoa cursor-pointer transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Prev: Our Family</span>
              </button>
            )}
            {onNext && !allExtinguished && (
              <button
                type="button"
                onClick={scrollToGift}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blush-light hover:bg-blush text-cocoa font-heading font-bold text-xs border-2 border-cocoa cursor-pointer transition-all"
              >
                <span>Next: Final Surprise</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
