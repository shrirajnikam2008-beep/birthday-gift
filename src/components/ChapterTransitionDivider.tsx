import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Heart,
  Camera,
  Mail,
  Cake,
  Gift,
  Star,
  BookOpen,
} from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export type TransitionType =
  | 'welcome-to-queen'
  | 'queen-to-academic'
  | 'academic-to-museum'
  | 'museum-to-letters'
  | 'letters-to-family'
  | 'family-to-cake'
  | 'cake-to-gift';

interface ChapterTransitionDividerProps {
  type: TransitionType;
}

export const ChapterTransitionDivider: React.FC<ChapterTransitionDividerProps> = ({ type }) => {
  const reducedMotion = useReducedMotion();

  switch (type) {
    /* =========================================================================
       1. WELCOME -> BIRTHDAY QUEEN
       Floating confetti dissolves into Polaroid photograph reveal
       ========================================================================= */
    case 'welcome-to-queen':
      return (
        <div className="relative py-12 sm:py-16 overflow-hidden pointer-events-none select-none">
          {/* Subtle torn paper divider edge */}
          <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center relative">
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center justify-center gap-3 sm:gap-6 w-full"
            >
              <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-sunshine-deep to-blush border-b border-dashed border-cocoa/30" />

              {/* Floating Confetti dissolving into Polaroid Reveal Centerpiece */}
              <div className="relative flex items-center gap-2 px-5 py-2 rounded-full bg-cream-paper border-2 border-cocoa shadow-sticker">
                {/* Dissolving Confetti dots */}
                <motion.span
                  animate={reducedMotion ? {} : { scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                  className="w-2.5 h-2.5 rounded-full bg-blush-deep inline-block"
                />
                <motion.span
                  animate={reducedMotion ? {} : { scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
                  className="w-2.5 h-2.5 rounded-full bg-sunshine inline-block"
                />
                <motion.span
                  animate={reducedMotion ? {} : { scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  className="w-2.5 h-2.5 rounded-full bg-skyblue inline-block"
                />

                <span className="font-heading text-xs sm:text-sm font-bold text-cocoa tracking-wider mx-1 uppercase">
                  Confetti clears • The Queen Arrives 👑
                </span>

                <Sparkles className="w-4 h-4 text-sunshine-deep animate-pulse" />
              </div>

              <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent via-sunshine-deep to-blush border-b border-dashed border-cocoa/30" />
            </motion.div>

            {/* Floating Polaroid Silhouette Peek */}
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, rotate: -4, scale: 0.9 }}
              whileInView={{ opacity: 1, rotate: 2, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mt-4 px-4 py-1.5 rounded-xl bg-sunshine-soft/90 border border-cocoa/30 text-[11px] font-bold text-cocoa flex items-center gap-2 shadow-sm"
            >
              <Heart className="w-3.5 h-3.5 fill-blush-deep text-cocoa" />
              <span className="font-marathi">आपल्या घराची खरी राणी... पुढच्या पानावर ❤️</span>
            </motion.div>
          </div>
        </div>
      );

    /* =========================================================================
       2. BIRTHDAY QUEEN -> ACADEMIC LEGEND
       Soft paper/page-turn transition with elegant text reveal
       ========================================================================= */
    case 'queen-to-academic':
      return (
        <div className="relative py-12 sm:py-16 overflow-hidden pointer-events-none select-none">
          <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center">
            {/* Scrapbook bookmark & page turn ribbon */}
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scaleX: 0.8 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="w-full flex items-center gap-3"
            >
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cocoa/30 to-skyblue" />

              <div className="relative px-5 py-2 rounded-2xl bg-gradient-to-r from-cream-paper via-skyblue-soft to-cream-paper border-2 border-cocoa shadow-sticker flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-cocoa" />
                <span className="font-heading text-xs sm:text-sm font-bold text-cocoa tracking-wide uppercase">
                  Turning the page • Her World of Wisdom 🎓
                </span>
                <span className="w-2 h-2 rounded-full bg-skyblue-deep" />
              </div>

              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-cocoa/30 to-skyblue" />
            </motion.div>

            {/* Elegant Text Reveal */}
            <motion.p
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 font-marathi text-xs sm:text-sm font-bold text-cocoa-light tracking-wide text-center"
            >
              &ldquo;शिकण्याची अखंड जिद्द... एक प्रेरणादायी प्राध्यापिका&rdquo;
            </motion.p>
          </div>
        </div>
      );

    /* =========================================================================
       3. ACADEMIC LEGEND -> MEMORY MUSEUM
       Photograph cards emerge like pages opening in a photo album
       ========================================================================= */
    case 'academic-to-museum':
      return (
        <div className="relative py-12 sm:py-16 overflow-hidden pointer-events-none select-none">
          <div className="max-w-5xl mx-auto px-4 flex flex-col items-center justify-center">
            {/* Album binding spine with emerging photo cards */}
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="relative w-full flex items-center justify-center gap-4"
            >
              {/* Left fan card */}
              <motion.div
                initial={reducedMotion ? {} : { rotate: 0, x: 20 }}
                whileInView={{ rotate: -8, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                className="hidden sm:flex w-16 h-12 rounded-lg bg-cream-paper border-2 border-cocoa/40 shadow-sm items-center justify-center text-xs text-cocoa/40"
              >
                📸
              </motion.div>

              {/* Center Ribbon */}
              <div className="px-6 py-2.5 rounded-full bg-sunshine border-2 border-cocoa shadow-sticker flex items-center gap-2.5">
                <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-cocoa" />
                <span className="font-heading text-xs sm:text-sm font-bold text-cocoa uppercase tracking-wider">
                  The Album Opens • 44 Timeless Memories 📸
                </span>
                <Sparkles className="w-4 h-4 text-cocoa" />
              </div>

              {/* Right fan card */}
              <motion.div
                initial={reducedMotion ? {} : { rotate: 0, x: -20 }}
                whileInView={{ rotate: 8, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                className="hidden sm:flex w-16 h-12 rounded-lg bg-cream-paper border-2 border-cocoa/40 shadow-sm items-center justify-center text-xs text-cocoa/40"
              >
                ❤️
              </motion.div>
            </motion.div>

            <motion.p
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 font-marathi text-xs sm:text-sm font-bold text-cocoa text-center"
            >
              हजारो आठवणी, गोड क्षण आणि न विसरता येणारे दिवस...
            </motion.p>
          </div>
        </div>
      );

    /* =========================================================================
       4. MEMORY MUSEUM -> LETTERS
       Scrapbook page softly transforms into sealed envelopes
       ========================================================================= */
    case 'museum-to-letters':
      return (
        <div className="relative py-12 sm:py-16 overflow-hidden pointer-events-none select-none">
          <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center">
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="w-full flex items-center gap-3"
            >
              <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-blush-deep to-blush border-b border-dashed border-cocoa/30" />

              <div className="px-5 py-2.5 rounded-2xl bg-cream-paper border-2 border-cocoa shadow-sticker flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blush-deep" />
                <span className="font-heading text-xs sm:text-sm font-bold text-cocoa uppercase tracking-wider">
                  Album Folds • 5 Sealed Letters Await 💌
                </span>
                <span className="w-3 h-3 rounded-full bg-blush border border-cocoa flex items-center justify-center text-[8px]">
                  ❤️
                </span>
              </div>

              <div className="flex-1 h-0.5 bg-gradient-to-l from-transparent via-blush-deep to-blush border-b border-dashed border-cocoa/30" />
            </motion.div>

            <motion.p
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 font-marathi text-xs sm:text-sm font-bold text-cocoa-light text-center"
            >
              मनातलं काही न बोललेलं... फक्त तुझ्यासाठी लिहिलेली पत्रं ✉️
            </motion.p>
          </div>
        </div>
      );

    /* =========================================================================
       5. LETTERS -> FAMILY
       Paper/envelope elements gently dissolve into family photographs
       ========================================================================= */
    case 'letters-to-family':
      return (
        <div className="relative py-12 sm:py-16 overflow-hidden pointer-events-none select-none">
          <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center">
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="w-full flex items-center gap-3"
            >
              <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-peach-deep to-sunshine border-b border-dashed border-cocoa/30" />

              <div className="px-5 py-2.5 rounded-full bg-peach-light border-2 border-cocoa shadow-sticker flex items-center gap-2.5">
                <Heart className="w-4 h-4 text-cocoa fill-blush-deep" />
                <span className="font-heading text-xs sm:text-sm font-bold text-cocoa uppercase tracking-wider">
                  Words Turn Into Our Forever Family ❤️
                </span>
                <Heart className="w-4 h-4 text-cocoa fill-blush-deep" />
              </div>

              <div className="flex-1 h-0.5 bg-gradient-to-l from-transparent via-peach-deep to-sunshine border-b border-dashed border-cocoa/30" />
            </motion.div>

            <motion.p
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 font-marathi text-xs sm:text-sm font-bold text-cocoa text-center"
            >
              आपलं कुटुंब, आपलं प्रेम आणि एकत्र घालवलेले अमूल्य क्षण...
            </motion.p>
          </div>
        </div>
      );

    /* =========================================================================
       6. FAMILY -> BIRTHDAY CAKE
       Warm celebratory colors, floating confetti, cake reveal
       ========================================================================= */
    case 'family-to-cake':
      return (
        <div className="relative py-12 sm:py-16 overflow-hidden pointer-events-none select-none">
          <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center">
            {/* Streamers & warm celebratory ribbon */}
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="w-full flex items-center gap-3"
            >
              <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-sunshine to-blush rounded-full" />

              <div className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-sunshine via-blush-light to-sunshine border-2 border-cocoa shadow-sticker flex items-center gap-2.5">
                <Cake className="w-5 h-5 text-cocoa animate-bounce" />
                <span className="font-heading text-xs sm:text-sm font-bold text-cocoa uppercase tracking-wider">
                  Celebration Time • The Birthday Cake! 🎂
                </span>
                <Sparkles className="w-5 h-5 text-cocoa" />
              </div>

              <div className="flex-1 h-1 bg-gradient-to-l from-transparent via-sunshine to-blush rounded-full" />
            </motion.div>

            <motion.p
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 font-marathi text-xs sm:text-sm font-bold text-cocoa text-center"
            >
              मेणबत्त्या विझवा आणि एक गोड इच्छा मागा! ✨
            </motion.p>
          </div>
        </div>
      );

    /* =========================================================================
       7. BIRTHDAY CAKE -> GIFT REVEAL
       Confetti transitions into floating stars and gift-box reveal
       ========================================================================= */
    case 'cake-to-gift':
      return (
        <div className="relative py-12 sm:py-16 overflow-hidden pointer-events-none select-none">
          <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center">
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="w-full flex items-center gap-3"
            >
              <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-sunshine-deep to-blush-deep border-b border-dashed border-cocoa/30" />

              <div className="px-6 py-2.5 rounded-full bg-cream-paper border-2 border-cocoa shadow-sticker flex items-center gap-2.5">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-sunshine-deep fill-sunshine animate-spin" />
                <span className="font-heading text-xs sm:text-sm font-bold text-cocoa uppercase tracking-wider">
                  Confetti To Stardust • The Grand Surprise 🎁
                </span>
                <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-blush-deep" />
              </div>

              <div className="flex-1 h-0.5 bg-gradient-to-l from-transparent via-sunshine-deep to-blush-deep border-b border-dashed border-cocoa/30" />
            </motion.div>

            <motion.p
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 font-marathi text-xs sm:text-sm font-bold text-cocoa text-center"
            >
              शेवटचं आणि सर्वात खास सरप्राईज... फक्त तुझ्यासाठी! ❤️
            </motion.p>
          </div>
        </div>
      );

    default:
      return null;
  }
};
