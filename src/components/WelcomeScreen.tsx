import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, PartyPopper, Heart, ArrowRight } from 'lucide-react';
import { getPhotoById } from '../data/photos';
import { ShinchanMascot } from './ShinchanMascot';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface WelcomeScreenProps {
  onNext: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext }) => {
  const heroPhoto = getPhotoById('photo-002');
  const secondaryHero = getPhotoById('photo-003');
  const reducedMotion = useReducedMotion();

  const handleBeginClick = () => {
    if (!reducedMotion) {
      confetti({
        particleCount: 95,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFD95A', '#F7B8C8', '#9DDDF2', '#F6C9A8', '#FF8DA1'],
      });
    }
    setTimeout(() => {
      onNext();
    }, reducedMotion ? 0 : 260);
  };

  return (
    <section
      aria-label="Chapter 01: Welcome"
      className="relative h-full w-full bg-gradient-to-b from-sunshine via-sunshine-light to-cream overflow-y-auto flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
    >
      {/* Floating Pastel Balloons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          animate={reducedMotion ? {} : { y: [0, -16, 0], x: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-6 left-[5%] w-12 h-16 sm:w-16 sm:h-20 opacity-85"
        >
          <svg viewBox="0 0 64 90" fill="none">
            <ellipse cx="32" cy="30" rx="26" ry="28" fill="#F7B8C8" stroke="#51463F" strokeWidth="3" />
            <ellipse cx="22" cy="20" rx="5" ry="9" fill="#FFFDF7" opacity="0.6" />
            <polygon points="32,58 27,64 37,64" fill="#F7B8C8" stroke="#51463F" strokeWidth="2.5" />
            <path d="M32 64 Q36 76 28 88" stroke="#51463F" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </motion.div>

        <motion.div
          animate={reducedMotion ? {} : { y: [0, -14, 0], x: [0, -6, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
          className="absolute top-8 right-[6%] w-12 h-16 sm:w-16 sm:h-20 opacity-85"
        >
          <svg viewBox="0 0 64 90" fill="none">
            <ellipse cx="32" cy="30" rx="26" ry="28" fill="#9DDDF2" stroke="#51463F" strokeWidth="3" />
            <ellipse cx="22" cy="20" rx="5" ry="9" fill="#FFFDF7" opacity="0.6" />
            <polygon points="32,58 27,64 37,64" fill="#9DDDF2" stroke="#51463F" strokeWidth="2.5" />
            <path d="M32 64 Q26 76 34 88" stroke="#51463F" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Column: Secret Birthday Invitation Copy */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 text-left"
          >
            {/* Top Secret Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1 rounded-full bg-cream-paper border-2 border-cocoa shadow-sticker mb-3.5">
              <Sparkles className="w-3.5 h-3.5 text-blush-deep" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-cocoa">
                CHAPTER 01 / 08 • 9 NOVEMBER 2026
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-cocoa leading-[1.12] tracking-tight mb-4">
              WAIT! SOMEONE VERY SPECIAL IS HERE!
            </h1>

            {/* Playful Checklist Card */}
            <div className="paper-card rounded-3xl p-4 sm:p-6 mb-5 relative bg-cream-paper">
              <div className="washi-tape washi-tape-pink -top-3 left-8 rotate-[-3deg]" />

              <p className="font-heading text-lg sm:text-xl font-bold text-cocoa mb-2.5">
                Are you Nisha?
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base font-bold text-cocoa-light mb-4">
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-skyblue flex items-center justify-center text-cocoa border border-cocoa text-xs shrink-0">
                    ✓
                  </span>
                  <span>The professor?</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blush flex items-center justify-center text-cocoa border border-cocoa text-xs shrink-0">
                    ✓
                  </span>
                  <span>The researcher?</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-peach flex items-center justify-center text-cocoa border border-cocoa text-xs shrink-0">
                    ✓
                  </span>
                  <span>The family advisor?</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-sunshine flex items-center justify-center text-cocoa border border-cocoa text-xs shrink-0">
                    ❤️
                  </span>
                  <span className="text-cocoa font-extrabold">The one and only Mumma?</span>
                </li>
              </ul>

              <p className="text-sm sm:text-lg font-extrabold text-cocoa leading-relaxed mb-3">
                Well, this little universe has been created exclusively for{' '}
                <span className="underline decoration-blush-deep decoration-4 underline-offset-4">
                  YOU!
                </span>
              </p>

              {/* Marathi Subtitle & Greeting */}
              <div className="p-3 sm:p-3.5 rounded-2xl bg-sunshine-soft border-2 border-cocoa/20">
                <p className="font-marathi text-base sm:text-xl font-bold text-cocoa leading-snug">
                  &ldquo;आजचा दिवस फक्त तुझ्यासाठी आहे, Mumma!&rdquo;
                </p>
                <p className="text-xs font-bold text-cocoa-light mt-0.5">
                  तुझ्यासाठी... कारण तू खूप खास आहेस! ❤️ — Created with love by Shriraj
                </p>
              </div>
            </div>

            {/* CTA Begin Button */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleBeginClick}
                className="group inline-flex items-center gap-3 px-7 py-3.5 sm:py-4 rounded-2xl bg-blush hover:bg-blush-deep text-cocoa font-heading font-bold text-base sm:text-xl border-3 border-cocoa shadow-sticker hover:shadow-stickerHover hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                style={{ borderWidth: '3px' }}
              >
                <PartyPopper className="w-5 h-5 sm:w-6 sm:h-6 text-cocoa group-hover:rotate-12 transition-transform" />
                <span>LET&apos;S BEGIN ❤️</span>
                <ArrowRight className="w-5 h-5 text-cocoa group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-cocoa/80">
                <Heart className="w-4 h-4 fill-blush-deep text-cocoa shrink-0" />
                <span>Open Chapter 02 of your birthday story</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Polaroid Hero Frame + Original Cartoon Mascot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="lg:col-span-5 flex flex-col items-center relative"
          >
            {heroPhoto && (
              <div
                className="relative bg-cream-paper p-3.5 sm:p-4 pb-5 rounded-3xl border-3 border-cocoa shadow-polaroid rotate-1 hover:rotate-0 transition-transform duration-300 max-w-xs sm:max-w-sm w-full"
                style={{ borderWidth: '3px' }}
              >
                <div className="washi-tape washi-tape-blue -top-3 left-1/2 -translate-x-1/2 rotate-2" />

                <div className="aspect-[3/4] max-h-[340px] sm:max-h-[380px] w-full overflow-hidden rounded-2xl border-2 border-cocoa/20 bg-cream-warm mx-auto">
                  <img
                    src={heroPhoto.src}
                    alt={heroPhoto.description}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="mt-3 text-center">
                  <p className="font-handwritten text-xl sm:text-2xl font-bold text-cocoa">
                    The Queen of Our Universe ✨
                  </p>
                  <p className="text-[11px] font-bold text-cocoa-light">
                    Nisha (Mumma) • Interactive Storybook
                  </p>
                </div>

                {/* Secondary Mini Polaroid Badge */}
                {secondaryHero && (
                  <div className="hidden sm:block absolute -bottom-4 -left-6 w-24 bg-cream-paper p-1.5 pb-2.5 rounded-2xl border-2 border-cocoa shadow-scrapbook -rotate-6">
                    <div className="aspect-square rounded-xl overflow-hidden border border-cocoa/20">
                      <img
                        src={secondaryHero.src}
                        alt={secondaryHero.description}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-handwritten text-[11px] font-bold text-center text-cocoa mt-1">
                      Mumma &amp; Shriraj ❤️
                    </p>
                  </div>
                )}

                {/* Original Playful Mascot Sticker */}
                <div className="absolute -top-6 -right-3 sm:-right-6">
                  <ShinchanMascot mood="party" className="w-20 h-20 sm:w-24 sm:h-24" />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
