import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Shuffle, ChevronRight, Heart } from 'lucide-react';
import { appreciationNotes } from '../data/appreciationNotes';

export const AppreciationJar: React.FC = () => {
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

  return (
    <section
      id="jar"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10"
    >
      <div className="paper-card rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-sunshine-soft via-cream-paper to-blush-soft relative overflow-hidden">
        <div className="washi-tape -top-3 left-1/2 -translate-x-1/2" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left 5 Cols: Interactive Illustrated Glass Jar */}
          <div className="lg:col-span-5 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sunshine border-2 border-cocoa text-xs font-extrabold text-cocoa mb-4 shadow-sticker">
              <Sparkles className="w-3.5 h-3.5" />
              <span>24 HANDPICKED NOTES INSIDE</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-cocoa mb-2">
              THE APPRECIATION JAR
            </h2>
            <p className="text-xs sm:text-sm font-bold text-cocoa-light mb-6">
              Tap the jar whenever you want a reminder of why you mean the world to us!
            </p>

            {/* Clickable SVG Mason Jar */}
            <motion.button
              type="button"
              onClick={handleNextNote}
              whileHover={{ scale: 1.04, rotate: -2 }}
              whileTap={{ scale: 0.96 }}
              className="relative w-48 h-60 sm:w-56 sm:h-68 cursor-pointer focus:outline-none group"
              aria-label="Tap the Appreciation Jar to pull out a new note"
            >
              <svg viewBox="0 0 200 250" fill="none" className="w-full h-full drop-shadow-md">
                {/* Jar Lid */}
                <rect x="52" y="14" width="96" height="22" rx="8" fill="#F7B8C8" stroke="#51463F" strokeWidth="4" />
                <rect x="46" y="32" width="108" height="12" rx="5" fill="#FFD95A" stroke="#51463F" strokeWidth="4" />

                {/* Glass Body */}
                <path
                  d="M48 44 L152 44 C168 58, 172 78, 172 104 L172 208 C172 226, 158 238, 140 238 L60 238 C42 238, 28 226, 28 208 L28 104 C28 78, 32 58, 48 44 Z"
                  fill="#FFFDF7"
                  fillOpacity="0.88"
                  stroke="#51463F"
                  strokeWidth="4.5"
                />

                {/* Colorful Folded Paper Chits Inside Jar */}
                <rect x="44" y="186" width="38" height="24" rx="5" transform="rotate(-12 44 186)" fill="#FFD95A" stroke="#51463F" strokeWidth="3" />
                <rect x="86" y="192" width="40" height="24" rx="5" transform="rotate(8 86 192)" fill="#F7B8C8" stroke="#51463F" strokeWidth="3" />
                <rect x="118" y="176" width="38" height="24" rx="5" transform="rotate(-18 118 176)" fill="#9DDDF2" stroke="#51463F" strokeWidth="3" />
                <rect x="52" y="152" width="42" height="24" rx="5" transform="rotate(14 52 152)" fill="#F6C9A8" stroke="#51463F" strokeWidth="3" />
                <rect x="98" y="148" width="40" height="24" rx="5" transform="rotate(-8 98 148)" fill="#FFD95A" stroke="#51463F" strokeWidth="3" />
                <rect x="68" y="122" width="44" height="24" rx="5" transform="rotate(5 68 122)" fill="#F7B8C8" stroke="#51463F" strokeWidth="3" />

                {/* Hanging Gift Tag on Jar */}
                <rect x="54" y="74" width="92" height="40" rx="10" fill="#FFF9EC" stroke="#51463F" strokeWidth="3.5" />
                <text x="100" y="99" textAnchor="middle" fill="#51463F" fontFamily="Fredoka, sans-serif" fontWeight="700" fontSize="14">
                  FOR MUMMA ❤️
                </text>
              </svg>

              <span className="mt-2 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blush border-2 border-cocoa text-xs font-extrabold text-cocoa shadow-sticker group-hover:bg-sunshine transition-colors">
                Tap Jar for Next Note ✨
              </span>
            </motion.button>
          </div>

          {/* Right 7 Cols: Active Unfolded Note Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentNote.id}
                initial={{ opacity: 0, y: 14, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="paper-card rounded-3xl p-6 sm:p-8 bg-cream-paper relative"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b-2 border-dashed border-cocoa/15">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-sunshine border border-cocoa text-cocoa">
                    NOTE #{currentNote.id} OF {appreciationNotes.length} • {currentNote.tag}
                  </span>

                  <span className="text-xs font-bold text-cocoa-light flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-blush-deep text-cocoa" />
                    Read {openedCount} / {appreciationNotes.length}
                  </span>
                </div>

                <p className="text-lg sm:text-2xl font-extrabold text-cocoa leading-relaxed mb-4">
                  &ldquo;{currentNote.text}&rdquo;
                </p>

                {currentNote.marathi && (
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-sunshine-soft border border-cocoa/20 mb-5">
                    <p className="font-marathi text-lg sm:text-xl font-bold text-cocoa">
                      {currentNote.marathi}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleNextNote}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-blush hover:bg-blush-deep text-cocoa font-heading font-bold text-sm sm:text-base border-2 border-cocoa shadow-sticker cursor-pointer transition-all"
                  >
                    <span>Pull Next Note</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleRandomNote}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-cream hover:bg-skyblue-soft text-cocoa font-bold text-xs sm:text-sm border-2 border-cocoa/40 cursor-pointer transition-all"
                  >
                    <Shuffle className="w-4 h-4" />
                    <span>Surprise Note</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
