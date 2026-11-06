import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Shuffle, ChevronRight, Heart, X } from 'lucide-react';
import { appreciationNotes } from '../data/appreciationNotes';

interface AppreciationJarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AppreciationJar: React.FC<AppreciationJarProps> = ({
  isOpen = false,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openedCount, setOpenedCount] = useState(1);

  const currentNote = appreciationNotes[currentIndex];

  const handleNextNote = () => {
    const nextIdx = (currentIndex + 1) % appreciationNotes.length;
    setCurrentIndex(nextIdx);
    setOpenedCount((prev) => Math.min(appreciationNotes.length, prev + 1));
  };

  const handleRandomNote = () => {
    let randIdx = Math.floor(Math.random() * appreciationNotes.length);
    if (randIdx === currentIndex) {
      randIdx = (currentIndex + 1) % appreciationNotes.length;
    }
    setCurrentIndex(randIdx);
    setOpenedCount((prev) => Math.min(appreciationNotes.length, prev + 1));
  };

  useEffect(() => {
    if (!isOpen || !onClose) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-cocoa/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="The Appreciation Jar"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 16, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="paper-card rounded-3xl p-5 sm:p-8 bg-gradient-to-br from-sunshine-soft via-cream-paper to-blush-soft max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
          >
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Appreciation Jar"
                className="absolute top-4 right-4 p-2 rounded-full bg-cream-paper hover:bg-blush border-2 border-cocoa text-cocoa shadow-sticker cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left 5 Cols: Interactive Illustrated Glass Jar */}
              <div className="lg:col-span-5 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sunshine border-2 border-cocoa text-xs font-extrabold text-cocoa mb-3 shadow-sticker">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>24 HANDPICKED NOTES INSIDE</span>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-cocoa mb-1">
                  THE APPRECIATION JAR
                </h2>
                <p className="text-xs font-bold text-cocoa-light mb-4">
                  Tap the jar whenever you want a reminder of why you mean the world to us!
                </p>

                <motion.button
                  type="button"
                  onClick={handleNextNote}
                  whileHover={{ scale: 1.04, rotate: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative w-40 h-52 sm:w-44 sm:h-56 cursor-pointer focus:outline-none group"
                  aria-label="Tap the Appreciation Jar to pull out a new note"
                >
                  <svg viewBox="0 0 200 250" fill="none" className="w-full h-full drop-shadow-md">
                    <rect x="52" y="14" width="96" height="22" rx="8" fill="#F7B8C8" stroke="#51463F" strokeWidth="4" />
                    <rect x="46" y="32" width="108" height="12" rx="5" fill="#FFD95A" stroke="#51463F" strokeWidth="4" />
                    <path
                      d="M48 44 L152 44 C168 58, 172 78, 172 104 L172 208 C172 226, 158 238, 140 238 L60 238 C42 238, 28 226, 28 208 L28 104 C28 78, 32 58, 48 44 Z"
                      fill="#FFFDF7"
                      fillOpacity="0.88"
                      stroke="#51463F"
                      strokeWidth="4.5"
                    />
                    <rect x="44" y="186" width="38" height="24" rx="5" transform="rotate(-12 44 186)" fill="#FFD95A" stroke="#51463F" strokeWidth="3" />
                    <rect x="86" y="192" width="40" height="24" rx="5" transform="rotate(8 86 192)" fill="#F7B8C8" stroke="#51463F" strokeWidth="3" />
                    <rect x="118" y="176" width="38" height="24" rx="5" transform="rotate(-18 118 176)" fill="#9DDDF2" stroke="#51463F" strokeWidth="3" />
                    <rect x="52" y="152" width="42" height="24" rx="5" transform="rotate(14 52 152)" fill="#F6C9A8" stroke="#51463F" strokeWidth="3" />
                    <rect x="98" y="148" width="40" height="24" rx="5" transform="rotate(-8 98 148)" fill="#FFD95A" stroke="#51463F" strokeWidth="3" />
                    <rect x="68" y="122" width="44" height="24" rx="5" transform="rotate(5 68 122)" fill="#F7B8C8" stroke="#51463F" strokeWidth="3" />
                    <rect x="54" y="74" width="92" height="40" rx="10" fill="#FFF9EC" stroke="#51463F" strokeWidth="3.5" />
                    <text x="100" y="99" textAnchor="middle" fill="#51463F" fontFamily="Fredoka, sans-serif" fontWeight="700" fontSize="14">
                      FOR MUMMA ❤️
                    </text>
                  </svg>
                </motion.button>
              </div>

              {/* Right 7 Cols: Active Unfolded Note Card */}
              <div className="lg:col-span-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentNote.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="paper-card rounded-3xl p-5 sm:p-7 bg-cream-paper relative"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2.5 border-b-2 border-dashed border-cocoa/15">
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-sunshine border border-cocoa text-cocoa">
                        NOTE #{currentNote.id} OF {appreciationNotes.length} • {currentNote.tag}
                      </span>

                      <span className="text-xs font-bold text-cocoa-light flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 fill-blush-deep text-cocoa" />
                        Read {openedCount} / {appreciationNotes.length}
                      </span>
                    </div>

                    <p className="text-base sm:text-xl font-extrabold text-cocoa leading-relaxed mb-4">
                      &ldquo;{currentNote.text}&rdquo;
                    </p>

                    {currentNote.marathi && (
                      <div className="p-3 sm:p-3.5 rounded-2xl bg-sunshine-soft border border-cocoa/20 mb-4">
                        <p className="font-marathi text-base sm:text-xl font-bold text-cocoa">
                          {currentNote.marathi}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <button
                        type="button"
                        onClick={handleNextNote}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-blush hover:bg-blush-deep text-cocoa font-heading font-bold text-xs sm:text-sm border-2 border-cocoa shadow-sticker cursor-pointer transition-all"
                      >
                        <span>Pull Next Note</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={handleRandomNote}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-cream hover:bg-skyblue-soft text-cocoa font-bold text-xs border-2 border-cocoa/40 cursor-pointer transition-all"
                      >
                        <Shuffle className="w-3.5 h-3.5" />
                        <span>Surprise Note</span>
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
