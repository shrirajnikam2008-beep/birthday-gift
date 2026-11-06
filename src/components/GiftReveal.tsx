import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Star, Sparkles, Heart, RotateCcw } from 'lucide-react';
import { giftStars } from '../data/messages';
import { ShinchanMascot } from './ShinchanMascot';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface GiftRevealProps {
  resetKey?: number;
  onReplayAll: () => void;
  onOpenJarModal?: () => void;
}

export const GiftReveal: React.FC<GiftRevealProps> = ({
  resetKey = 0,
  onReplayAll,
  onOpenJarModal,
}) => {
  const [clickedStars, setClickedStars] = useState<number[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setClickedStars([]);
  }, [resetKey]);

  const allStarsClicked = clickedStars.length === giftStars.length;

  const handleStarClick = (id: number) => {
    if (clickedStars.includes(id)) return;
    const updated = [...clickedStars, id];
    setClickedStars(updated);

    if (updated.length === giftStars.length && !reducedMotion) {
      confetti({
        particleCount: 130,
        spread: 95,
        origin: { y: 0.6 },
        colors: ['#FFD95A', '#F7B8C8', '#9DDDF2', '#F6C9A8'],
      });
    }
  };

  const unlockAllStars = () => {
    setClickedStars(giftStars.map((s) => s.id));
    if (!reducedMotion) {
      confetti({
        particleCount: 130,
        spread: 95,
        origin: { y: 0.6 },
        colors: ['#FFD95A', '#F7B8C8', '#9DDDF2', '#F6C9A8'],
      });
    }
  };

  return (
    <section
      aria-label="Chapter 08: The Physical Gift Reveal"
      className="h-full w-full overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
    >
      <div className="max-w-5xl mx-auto my-auto">
        {/* Chapter Header */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blush border-2 border-cocoa shadow-sticker mb-3">
            <Gift className="w-3.5 h-3.5 text-cocoa" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-cocoa">
              CHAPTER 08 / 08 • THE FINAL SURPRISE
            </span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-cocoa tracking-tight mb-2">
            ONE LAST THING...
          </h2>

          <p className="text-sm sm:text-base font-bold text-cocoa-light">
            Tap all five golden stars below ({clickedStars.length} of 5 unlocked) to untie the ribbon and open your birthday gift box!
          </p>
        </div>

        {/* 5 Interactive Stars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
          {giftStars.map((star) => {
            const isUnlocked = clickedStars.includes(star.id);
            return (
              <motion.button
                key={star.id}
                type="button"
                onClick={() => handleStarClick(star.id)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                aria-pressed={isUnlocked}
                className={`p-3.5 sm:p-4 rounded-3xl border-2 border-cocoa text-left transition-all cursor-pointer flex flex-col justify-between min-h-[124px] ${
                  isUnlocked
                    ? 'bg-sunshine shadow-sticker'
                    : 'bg-cream-paper hover:bg-sunshine-soft shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-cocoa">
                    STAR 0{star.id}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border-2 border-cocoa flex items-center justify-center ${
                      isUnlocked ? 'bg-cream-paper' : 'bg-sunshine'
                    }`}
                  >
                    <Star
                      className={`w-4 h-4 text-cocoa ${
                        isUnlocked ? 'fill-sunshine-deep' : ''
                      }`}
                    />
                  </div>
                </div>

                {isUnlocked ? (
                  <div>
                    <p className="font-heading text-sm sm:text-base font-bold text-cocoa leading-snug">
                      &ldquo;{star.message}&rdquo;
                    </p>
                    <p className="font-marathi text-xs font-bold text-cocoa-light mt-0.5">
                      {star.marathi}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs font-bold text-cocoa-light">
                    Tap star #{star.id} to reveal ✨
                  </p>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Gift Box Stage */}
        <div className="paper-card rounded-3xl p-5 sm:p-8 bg-cream-paper text-center relative overflow-hidden">
          <div className="washi-tape washi-tape-blue -top-3 left-1/2 -translate-x-1/2" />

          {!allStarsClicked ? (
            <div className="py-4 flex flex-col items-center">
              <motion.div
                animate={
                  reducedMotion
                    ? {}
                    : {
                        rotate: [-1.5, 1.5, -1.5],
                        y: [0, -5, 0],
                      }
                }
                transition={{ duration: 2.2, repeat: Infinity }}
                className="w-36 h-36 sm:w-44 sm:h-44 mb-4"
              >
                <svg viewBox="0 0 200 200" fill="none" className="w-full h-full drop-shadow-md">
                  <path
                    d="M100 46 C75 18, 46 34, 66 54 C80 62, 95 54, 100 46 Z"
                    fill="#F7B8C8"
                    stroke="#51463F"
                    strokeWidth="4"
                  />
                  <path
                    d="M100 46 C125 18, 154 34, 134 54 C120 62, 105 54, 100 46 Z"
                    fill="#F7B8C8"
                    stroke="#51463F"
                    strokeWidth="4"
                  />
                  <rect x="34" y="48" width="132" height="30" rx="8" fill="#FFD95A" stroke="#51463F" strokeWidth="4.5" />
                  <rect x="42" y="78" width="116" height="98" rx="10" fill="#FFE896" stroke="#51463F" strokeWidth="4.5" />
                  <rect x="88" y="48" width="24" height="128" fill="#F7B8C8" stroke="#51463F" strokeWidth="4" />
                  <rect x="42" y="114" width="116" height="22" fill="#F7B8C8" stroke="#51463F" strokeWidth="4" />
                </svg>
              </motion.div>

              <p className="font-heading text-lg sm:text-xl font-bold text-cocoa mb-3">
                {5 - clickedStars.length} more star{5 - clickedStars.length === 1 ? '' : 's'} to open your gift box!
              </p>

              <button
                type="button"
                onClick={unlockAllStars}
                className="px-5 py-2.5 rounded-2xl bg-blush hover:bg-blush-deep text-cocoa font-heading font-bold text-xs sm:text-sm border-2 border-cocoa shadow-sticker cursor-pointer transition-all"
              >
                Unlock All 5 Stars &amp; Open Box 🎁
              </button>
            </div>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="py-2 max-w-2xl mx-auto"
              >
                <div className="flex justify-center mb-3">
                  <ShinchanMascot mood="love" className="w-24 h-24" />
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sunshine border-2 border-cocoa text-xs font-extrabold text-cocoa mb-4 shadow-sticker">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ALL 5 STARS UNLOCKED!</span>
                </div>

                <p className="text-base sm:text-xl font-bold text-cocoa leading-relaxed mb-5">
                  &ldquo;Mumma, you&apos;ve spent so much of your life giving happiness to everyone around you. Today, there&apos;s something waiting just for you.&rdquo;
                </p>

                <div
                  className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-sunshine via-blush-light to-skyblue-light border-3 border-cocoa shadow-polaroid mb-6"
                  style={{ borderWidth: '3px' }}
                >
                  <h3 className="font-heading text-xl sm:text-3xl font-bold text-cocoa">
                    YOUR REAL GIFT IS WAITING FOR YOU! 🎁
                  </h3>
                  <p className="text-xs font-extrabold text-cocoa-light mt-1.5">
                    (To be handed to you personally with the biggest hug!)
                  </p>
                </div>

                {/* Final Emotional Closing */}
                <div className="space-y-3 pt-4 border-t-2 border-dashed border-cocoa/20">
                  <p className="font-handwritten text-2xl sm:text-3xl font-bold text-cocoa">
                    &ldquo;No matter how far I go, I&apos;ll always be your little boy.&rdquo;
                  </p>

                  <div className="p-3.5 sm:p-4 rounded-2xl bg-sunshine-soft border-2 border-cocoa/20 inline-block">
                    <p className="font-marathi text-lg sm:text-2xl font-bold text-cocoa leading-relaxed">
                      &ldquo;तू आहेस म्हणून माझं जग इतकं सुंदर आहे. खूप प्रेम Mumma!&rdquo;
                    </p>
                  </div>

                  <p className="text-xs font-bold text-cocoa-light pt-1">
                    Made with ❤️ by your son, Shriraj • 9 November 2026
                  </p>

                  <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={onReplayAll}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-sunshine hover:bg-sunshine-deep text-cocoa font-heading font-bold text-sm sm:text-base border-2 border-cocoa shadow-sticker cursor-pointer transition-all"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Replay Birthday Experience From Start</span>
                      <Heart className="w-4 h-4 fill-blush-deep text-cocoa" />
                    </button>

                    {onOpenJarModal && (
                      <button
                        type="button"
                        onClick={onOpenJarModal}
                        className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-cream hover:bg-blush-light text-cocoa font-heading font-bold text-xs sm:text-sm border-2 border-cocoa cursor-pointer transition-all"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Open Appreciation Jar (24 Notes)</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
};
