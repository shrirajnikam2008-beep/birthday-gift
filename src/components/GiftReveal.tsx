import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Star, Sparkles, Heart, RotateCcw, Award, ArrowLeft } from 'lucide-react';
import { giftStars } from '../data/messages';
import { getPhotoById } from '../data/photos';
import { ShinchanMascot } from './ShinchanMascot';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface GiftRevealProps {
  resetKey?: number;
  onPrev?: () => void;
  onReplayAll: () => void;
  onOpenJarModal?: () => void;
}

export const GiftReveal: React.FC<GiftRevealProps> = ({
  resetKey = 0,
  onPrev,
  onReplayAll,
  onOpenJarModal,
}) => {
  const [clickedStars, setClickedStars] = useState<number[]>([]);
  const reducedMotion = useReducedMotion();

  const finaleFamilyPhoto = getPhotoById('photo-005'); // Mumma, Papa & Shriraj
  const finaleMotherSonPhoto = getPhotoById('photo-029'); // Mumma & Shriraj 2026

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
        particleCount: 140,
        spread: 95,
        origin: { y: 0.6 },
        colors: ['#FFD95A', '#F7B8C8', '#9DDDF2', '#F6C9A8', '#FF8DA1'],
      });
    }
  };

  const unlockAllStars = () => {
    setClickedStars(giftStars.map((s) => s.id));
    if (!reducedMotion) {
      confetti({
        particleCount: 140,
        spread: 95,
        origin: { y: 0.6 },
        colors: ['#FFD95A', '#F7B8C8', '#9DDDF2', '#F6C9A8', '#FF8DA1'],
      });
    }
  };

  return (
    <div
      aria-label="Chapter 08: The Physical Gift Reveal"
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
    >
      <div className="max-w-4xl mx-auto w-full text-center">
        {/* Chapter Header */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blush border-2 border-cocoa shadow-sticker mb-2">
            <Gift className="w-3.5 h-3.5 text-cocoa" />
            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-cocoa">
              CHAPTER 08 • THE FINAL SURPRISE
            </span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-cocoa tracking-tight">
            ONE LAST THING...
          </h2>

          <p className="text-xs sm:text-sm font-bold text-cocoa-light mt-1">
            Tap all five golden stars below ({clickedStars.length} of 5 unlocked) to reveal every gratitude note and open your birthday gift box!
          </p>
        </div>

        {/* 5 Interactive Stars Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3 mb-6 max-w-4xl mx-auto">
          {giftStars.map((star) => {
            const isUnlocked = clickedStars.includes(star.id);
            return (
              <motion.button
                key={star.id}
                type="button"
                onClick={() => handleStarClick(star.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                aria-pressed={isUnlocked}
                className={`p-3 rounded-2xl border-2 border-cocoa text-left transition-all cursor-pointer flex flex-col justify-between min-h-[100px] sm:min-h-[115px] ${
                  isUnlocked
                    ? 'bg-sunshine shadow-sticker'
                    : 'bg-cream-paper hover:bg-sunshine-soft shadow-sm'
                } ${star.id === 5 ? 'col-span-2 sm:col-span-1' : ''}`}
              >
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-cocoa">
                    STAR 0{star.id}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full border border-cocoa flex items-center justify-center ${
                      isUnlocked ? 'bg-cream-paper' : 'bg-sunshine'
                    }`}
                  >
                    <Star
                      className={`w-3.5 h-3.5 text-cocoa ${
                        isUnlocked ? 'fill-sunshine-deep' : ''
                      }`}
                    />
                  </div>
                </div>

                {isUnlocked ? (
                  <div>
                    <p className="font-heading text-xs font-bold text-cocoa leading-tight">
                      &ldquo;{star.message}&rdquo;
                    </p>
                    <p className="font-marathi text-[11px] font-bold text-cocoa-light mt-0.5">
                      {star.marathi}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs font-bold text-cocoa-light">
                    Tap to unlock star #{star.id} ✨
                  </p>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Gift Box Stage */}
        <div className="paper-card rounded-3xl p-5 sm:p-8 bg-cream-paper text-center relative max-w-3xl mx-auto shadow-polaroid">
          <div className="washi-tape washi-tape-blue -top-2.5 left-1/2 -translate-x-1/2" />

          {!allStarsClicked ? (
            <div className="py-4 flex flex-col items-center">
              <motion.div
                animate={
                  reducedMotion
                    ? {}
                    : {
                        rotate: [-1.5, 1.5, -1.5],
                        y: [0, -4, 0],
                      }
                }
                transition={{ duration: 2.2, repeat: Infinity }}
                onClick={unlockAllStars}
                className="w-28 h-28 sm:w-32 sm:h-32 mb-3 cursor-pointer"
                title="Tap gift box to unlock all stars!"
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

              <p className="font-heading text-sm sm:text-base font-bold text-cocoa mb-3">
                {5 - clickedStars.length} more star{5 - clickedStars.length === 1 ? '' : 's'} to open your gift box!
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2.5">
                {onPrev && (
                  <button
                    type="button"
                    onClick={onPrev}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cream hover:bg-sunshine-soft text-cocoa font-heading font-bold text-xs sm:text-sm border-2 border-cocoa cursor-pointer transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Prev: Cake Time</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={unlockAllStars}
                  className="px-5 py-2.5 rounded-xl bg-blush hover:bg-blush-deep active:scale-95 text-cocoa font-heading font-bold text-xs sm:text-sm border-2 border-cocoa shadow-sticker cursor-pointer transition-all"
                >
                  Unlock All 5 Stars &amp; Open Box 🎁
                </button>
              </div>
            </div>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="py-2 max-w-2xl mx-auto"
              >
                <div className="flex justify-center mb-2">
                  <ShinchanMascot mood="love" className="w-16 h-16 sm:w-20 sm:h-20" />
                </div>

                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sunshine border-2 border-cocoa text-xs font-extrabold text-cocoa mb-3 shadow-sticker">
                  <Award className="w-3.5 h-3.5" />
                  <span>ALL 5 STARS ILLUMINATED • GRAND FINALE</span>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sunshine via-blush-light to-skyblue-light border-2 border-cocoa shadow-polaroid mb-5">
                  <h3 className="font-heading text-lg sm:text-2xl font-bold text-cocoa">
                    YOUR REAL GIFT IS WAITING FOR YOU! 🎁
                  </h3>
                  <p className="text-xs sm:text-sm font-extrabold text-cocoa-light mt-1">
                    (To be handed to you personally with the biggest hug!)
                  </p>
                </div>

                {/* Meaningful Final Family Keepsake Photographs */}
                {(finaleFamilyPhoto || finaleMotherSonPhoto) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                    {finaleFamilyPhoto && (
                      <div className="p-3 rounded-2xl bg-cream border-2 border-cocoa/30 shadow-xs">
                        <div className="relative h-44 sm:h-48 w-full rounded-xl overflow-hidden bg-cream-warm flex items-center justify-center">
                          <span className="photo-corner-tl" />
                          <span className="photo-corner-br" />
                          <img
                            src={finaleFamilyPhoto.src}
                            alt={finaleFamilyPhoto.description}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <p className="font-handwritten text-base sm:text-lg font-bold text-cocoa mt-2">
                          Our Little Universe Forever ❤️
                        </p>
                      </div>
                    )}
                    {finaleMotherSonPhoto && (
                      <div className="p-3 rounded-2xl bg-cream border-2 border-cocoa/30 shadow-xs">
                        <div className="relative h-44 sm:h-48 w-full rounded-xl overflow-hidden bg-cream-warm flex items-center justify-center">
                          <span className="photo-corner-tl" />
                          <span className="photo-corner-br" />
                          <img
                            src={finaleMotherSonPhoto.src}
                            alt={finaleMotherSonPhoto.description}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <p className="font-handwritten text-base sm:text-lg font-bold text-cocoa mt-2">
                          Always Your Little Boy • 2026 ✨
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Final Emotional Closing */}
                <div className="space-y-3 pt-3 border-t-2 border-dashed border-cocoa/20">
                  <p className="font-handwritten text-2xl sm:text-3xl font-bold text-cocoa">
                    &ldquo;No matter how far I go, I&apos;ll always be your little boy.&rdquo;
                  </p>

                  <div className="p-3 sm:p-3.5 rounded-xl bg-sunshine-soft border-2 border-cocoa/20 inline-block">
                    <p className="font-marathi text-sm sm:text-base font-bold text-cocoa leading-relaxed">
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
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-sunshine hover:bg-sunshine-deep active:scale-95 text-cocoa font-heading font-bold text-xs sm:text-sm border-2 border-cocoa shadow-sticker cursor-pointer transition-all"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Replay Complete Experience</span>
                      <Heart className="w-4 h-4 fill-blush-deep text-cocoa" />
                    </button>

                    {onOpenJarModal && (
                      <button
                        type="button"
                        onClick={onOpenJarModal}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cream hover:bg-blush-light active:scale-95 text-cocoa font-heading font-bold text-xs sm:text-sm border-2 border-cocoa cursor-pointer transition-all shadow-sm"
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
    </div>
  );
};
