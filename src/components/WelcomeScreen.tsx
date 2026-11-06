import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, PartyPopper, Heart, ArrowDown } from 'lucide-react';
import { getPhotoById } from '../data/photos';
import { ShinchanMascot } from './ShinchanMascot';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const WelcomeScreen: React.FC = () => {
  const heroPhoto = getPhotoById('photo-002');
  const secondaryHero = getPhotoById('photo-003');
  const reducedMotion = useReducedMotion();

  const handleCelebrateClick = () => {
    if (!reducedMotion) {
      confetti({
        particleCount: 95,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFD95A', '#F7B8C8', '#9DDDF2', '#F6C9A8', '#FF8DA1'],
      });
    }
    const nextSection = document.getElementById('queen');
    if (nextSection) {
      setTimeout(() => {
        nextSection.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
      }, 280);
    }
  };

  return (
    <section
      id="welcome"
      className="relative min-h-[calc(100vh-64px)] bg-gradient-to-b from-sunshine via-sunshine-light to-cream py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 flex items-center overflow-hidden border-b-4 border-cocoa/15"
    >
      {/* Floating Pastel Balloons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          animate={reducedMotion ? {} : { y: [0, -18, 0], x: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-8 left-[6%] w-14 h-18 sm:w-16 sm:h-20 opacity-85"
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
          className="absolute top-12 right-[7%] w-14 h-18 sm:w-16 sm:h-20 opacity-85"
        >
          <svg viewBox="0 0 64 90" fill="none">
            <ellipse cx="32" cy="30" rx="26" ry="28" fill="#9DDDF2" stroke="#51463F" strokeWidth="3" />
            <ellipse cx="22" cy="20" rx="5" ry="9" fill="#FFFDF7" opacity="0.6" />
            <polygon points="32,58 27,64 37,64" fill="#9DDDF2" stroke="#51463F" strokeWidth="2.5" />
            <path d="M32 64 Q26 76 34 88" stroke="#51463F" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </motion.div>

        <motion.div
          animate={reducedMotion ? {} : { y: [0, -12, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
          className="absolute bottom-14 left-[12%] hidden md:block w-12 h-16 opacity-75"
        >
          <svg viewBox="0 0 64 90" fill="none">
            <ellipse cx="32" cy="30" rx="24" ry="26" fill="#F6C9A8" stroke="#51463F" strokeWidth="3" />
            <path d="M32 56 Q36 72 30 86" stroke="#51463F" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Secret Birthday Invitation Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 text-left"
          >
            {/* Top Secret Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 px-4 py-1.5 rounded-full bg-cream-paper border-2 border-cocoa shadow-sticker mb-5">
              <Sparkles className="w-4 h-4 text-blush-deep" />
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-cocoa">
                9 November 2026 • Secret Birthday Invitation
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-cocoa leading-[1.12] tracking-tight mb-6">
              WAIT! SOMEONE VERY SPECIAL IS HERE!
            </h1>

            {/* Playful Checklist Card */}
            <div className="paper-card rounded-3xl p-5 sm:p-7 mb-6 relative bg-cream-paper">
              <div className="washi-tape washi-tape-pink -top-3 left-8 rotate-[-3deg]" />

              <p className="font-heading text-xl sm:text-2xl font-bold text-cocoa mb-3">
                Are you Nisha?
              </p>

              <ul className="space-y-2 text-base sm:text-lg font-bold text-cocoa-light mb-5">
                <li className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-skyblue flex items-center justify-center text-cocoa border border-cocoa text-xs">
                    ✓
                  </span>
                  <span>The professor?</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-blush flex items-center justify-center text-cocoa border border-cocoa text-xs">
                    ✓
                  </span>
                  <span>The researcher?</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-peach flex items-center justify-center text-cocoa border border-cocoa text-xs">
                    ✓
                  </span>
                  <span>The family advisor?</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-sunshine flex items-center justify-center text-cocoa border border-cocoa text-xs">
                    ❤️
                  </span>
                  <span className="text-cocoa font-extrabold">The one and only Mumma?</span>
                </li>
              </ul>

              <p className="text-base sm:text-xl font-extrabold text-cocoa leading-relaxed mb-3">
                Well, this little universe has been created exclusively for{' '}
                <span className="underline decoration-blush-deep decoration-4 underline-offset-4">
                  YOU!
                </span>
              </p>

              {/* Marathi Subtitle & Greeting */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-sunshine-soft border-2 border-cocoa/20">
                <p className="font-marathi text-lg sm:text-2xl font-bold text-cocoa leading-snug">
                  &ldquo;आजचा दिवस फक्त तुझ्यासाठी आहे, Mumma!&rdquo;
                </p>
                <p className="text-xs sm:text-sm font-bold text-cocoa-light mt-1">
                  तुझ्यासाठी... कारण तू खूप खास आहेस! ❤️ — Created with love by Shriraj
                </p>
              </div>
            </div>

            {/* CTA Celebration Button */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleCelebrateClick}
                className="group inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-blush hover:bg-blush-deep text-cocoa font-heading font-bold text-lg sm:text-xl border-3 border-cocoa shadow-sticker hover:shadow-stickerHover hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                style={{ borderWidth: '3px' }}
              >
                <PartyPopper className="w-6 h-6 text-cocoa group-hover:rotate-12 transition-transform" />
                <span>LET&apos;S CELEBRATE!</span>
                <ArrowDown className="w-5 h-5 text-cocoa group-hover:translate-y-1 transition-transform" />
              </button>

              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-cocoa/80">
                <Heart className="w-4 h-4 fill-blush-deep text-cocoa" />
                <span>Tap to launch confetti &amp; enter your universe</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Polaroid Hero Frame + Original Cartoon Mascot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col items-center relative"
          >
            {/* Primary Polaroid Card */}
            {heroPhoto && (
              <div className="relative bg-cream-paper p-4 sm:p-5 pb-7 rounded-3xl border-3 border-cocoa shadow-polaroid rotate-2 hover:rotate-0 transition-transform duration-300 max-w-sm w-full" style={{ borderWidth: '3px' }}>
                <div className="washi-tape washi-tape-blue -top-3.5 left-1/2 -translate-x-1/2 rotate-2" />

                <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl border-2 border-cocoa/20 bg-cream-warm">
                  <img
                    src={heroPhoto.src}
                    alt={heroPhoto.description}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="mt-4 text-center">
                  <p className="font-handwritten text-2xl sm:text-3xl font-bold text-cocoa">
                    The Queen of Our Universe ✨
                  </p>
                  <p className="text-xs font-bold text-cocoa-light mt-0.5">
                    Nisha (Mumma) • Birthday Special
                  </p>
                </div>

                {/* Secondary Mini Polaroid Badge */}
                {secondaryHero && (
                  <div className="hidden sm:block absolute -bottom-6 -left-8 w-28 bg-cream-paper p-2 pb-3 rounded-2xl border-2 border-cocoa shadow-scrapbook -rotate-6">
                    <div className="aspect-square rounded-xl overflow-hidden border border-cocoa/20">
                      <img
                        src={secondaryHero.src}
                        alt={secondaryHero.description}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-handwritten text-xs font-bold text-center text-cocoa mt-1">
                      Mumma &amp; Shriraj ❤️
                    </p>
                  </div>
                )}

                {/* Original Playful Mascot Sticker */}
                <div className="absolute -top-8 -right-4 sm:-right-8">
                  <ShinchanMascot mood="party" className="w-24 h-24 sm:w-28 sm:h-28" />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
