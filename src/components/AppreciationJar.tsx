import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Shuffle, ChevronRight, Heart, X } from 'lucide-react';
import { appreciationNotes, AppreciationNote } from '../data/appreciationNotes';

interface AppreciationJarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const noteColorStyles: Record<
  AppreciationNote['color'],
  { cardBg: string; badgeBg: string; quoteBg: string }
> = {
  sunshine: {
    cardBg: 'bg-cream-paper',
    badgeBg: 'bg-sunshine',
    quoteBg: 'bg-sunshine-soft',
  },
  blush: {
    cardBg: 'bg-cream-paper',
    badgeBg: 'bg-blush',
    quoteBg: 'bg-blush-soft',
  },
  skyblue: {
    cardBg: 'bg-cream-paper',
    badgeBg: 'bg-skyblue',
    quoteBg: 'bg-skyblue-soft',
  },
  peach: {
    cardBg: 'bg-cream-paper',
    badgeBg: 'bg-peach',
    quoteBg: 'bg-peach-light',
  },
};

export const AppreciationJar: React.FC<AppreciationJarProps> = ({
  isOpen = false,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openedIds, setOpenedIds] = useState<number[]>([1]);
  const [isShaking, setIsShaking] = useState(false);

  const currentNote = appreciationNotes[currentIndex];
  const palette = noteColorStyles[currentNote.color];

  const triggerPull = (nextIdx: number) => {
    setIsShaking(true);
    window.setTimeout(() => setIsShaking(false), 380);
    setCurrentIndex(nextIdx);
    const noteId = appreciationNotes[nextIdx].id;
    setOpenedIds((prev) => (prev.includes(noteId) ? prev : [...prev, noteId]));
  };

  const handleNextNote = () => {
    const nextIdx = (currentIndex + 1) % appreciationNotes.length;
    triggerPull(nextIdx);
  };

  const handleRandomNote = () => {
    let randIdx = Math.floor(Math.random() * appreciationNotes.length);
    if (randIdx === currentIndex) {
      randIdx = (currentIndex + 1) % appreciationNotes.length;
    }
    triggerPull(randIdx);
  };

  useEffect(() => {
    if (!isOpen || !onClose) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNextNote();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose, currentIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-cocoa/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
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
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sunshine border-2 border-cocoa text-xs font-extrabold text-cocoa mb-2.5 shadow-sticker">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>24 HANDPICKED NOTES INSIDE</span>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-cocoa mb-1">
                  THE APPRECIATION JAR
                </h2>
                <p className="text-xs font-bold text-cocoa-light mb-3">
                  Tap the jar to shake &amp; pull out a folded note!
                </p>

                <motion.button
                  type="button"
                  onClick={handleNextNote}
                  animate={
                    isShaking
                      ? { rotate: [-6, 6, -5, 5, 0], scale: [1, 1.06, 1] }
                      : {}
                  }
                  whileHover={{ scale: 1.04, rotate: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative w-36 h-48 sm:w-44 sm:h-56 cursor-pointer group"
                  aria-label="Tap the Appreciation Jar to pull out a new note"
                >
                  <svg viewBox="0 0 200 250" fill="none" className="w-full h-full drop-shadow-md">
                    <rect x="52" y="14" width="96" height="22" rx="8" fill="#F7B8C8" stroke="#51463F" strokeWidth="4" />
                    <rect x="46" y="32" width="108" height="12" rx="5" fill="#FFD95A" stroke="#51463F" strokeWidth="4" />
                    <path
                      d="M48 44 L152 44 C168 58, 172 78, 172 104 L172 208 C172 226, 158 238, 140 238 L60 238 C42 238, 28 226, 28 208 L28 104 C28 78, 32 58, 48 44 Z"
                      fill="#FFFDF7"
                      fillOpacity="0.90"
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
                    initial={{ opacity: 0, y: 12, rotate: -1 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    exit={{ opacity: 0, y: -10, rotate: 1 }}
                    transition={{ duration: 0.22 }}
                    className={`paper-card rounded-3xl p-5 sm:p-7 ${palette.cardBg} relative`}
                  >
                    <div className="washi-tape washi-tape-pink -top-2.5 left-1/2 -translate-x-1/2 scale-90" />

                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2.5 border-b-2 border-dashed border-cocoa/15">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-extrabold ${palette.badgeBg} border border-cocoa text-cocoa`}
                      >
                        NOTE #{currentNote.id} OF {appreciationNotes.length} • {currentNote.tag}
                      </span>

                      <span className="text-xs font-bold text-cocoa-light flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 fill-blush-deep text-cocoa" />
                        Opened {openedIds.length} / {appreciationNotes.length}
                      </span>
                    </div>

                    <p className="font-handwritten text-2xl sm:text-3xl font-bold text-cocoa leading-snug mb-4">
                      &ldquo;{currentNote.text}&rdquo;
                    </p>

                    {currentNote.marathi && (
                      <div className={`p-3 sm:p-3.5 rounded-2xl ${palette.quoteBg} border border-cocoa/20 mb-4`}>
                        <p className="font-marathi text-base sm:text-lg font-bold text-cocoa">
                          {currentNote.marathi}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <button
                        type="button"
                        onClick={handleNextNote}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-blush hover:bg-blush-deep active:scale-95 text-cocoa font-heading font-bold text-xs sm:text-sm border-2 border-cocoa shadow-sticker cursor-pointer transition-all"
                      >
                        <span>Pull Next Note</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={handleRandomNote}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-cream hover:bg-skyblue-soft active:scale-95 text-cocoa font-bold text-xs border-2 border-cocoa/40 cursor-pointer transition-all"
                      >
                        <Shuffle className="w-3.5 h-3.5" />
                        <span>Surprise Note</span>
                      </button>
                    </div>

                    {/* 24-Note Mini Selector Strip */}
                    <div className="mt-4 pt-3 border-t border-dashed border-cocoa/15">
                      <div className="flex flex-wrap items-center gap-1">
                        {appreciationNotes.map((note, idx) => {
                          const isCurrent = idx === currentIndex;
                          const isRead = openedIds.includes(note.id);
                          return (
                            <button
                              key={note.id}
                              type="button"
                              onClick={() => triggerPull(idx)}
                              className={`w-6 h-6 rounded-lg text-[10px] font-black border transition-all cursor-pointer ${
                                isCurrent
                                  ? 'bg-sunshine border-cocoa text-cocoa scale-110 shadow-2xs'
                                  : isRead
                                  ? 'bg-blush-soft border-cocoa/40 text-cocoa'
                                  : 'bg-cream border-cocoa/20 text-cocoa-light hover:border-cocoa'
                              }`}
                              title={`Note #${note.id}: ${note.tag}`}
                            >
                              {note.id}
                            </button>
                          );
                        })}
                      </div>
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
