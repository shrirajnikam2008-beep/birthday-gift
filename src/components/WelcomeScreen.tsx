import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  PartyPopper,
  Heart,
  ChevronDown,
  Cake,
  Flame,
  RotateCcw,
} from 'lucide-react';
import { getPhotoById } from '../data/photos';
import { ShinchanMascot } from './ShinchanMascot';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useAudio } from '../context/AudioContext';
import { WaveReveal } from './WaveReveal';

interface WelcomeScreenProps {
  isUnfolded: boolean;
  onUnfold: () => void;
  onNext?: () => void;
  onReplay?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  isUnfolded,
  onUnfold,
  onNext,
  onReplay,
}) => {
  const [litCandles, setLitCandles] = useState<boolean[]>([true, true, true, true, true]);
  const [isCutting, setIsCutting] = useState(false);
  const heroPhoto = getPhotoById('photo-002');
  const reducedMotion = useReducedMotion();
  const { playTrack, isPlaying } = useAudio();

  // Blow out an individual candle
  const handleCandleClick = (index: number) => {
    if (!litCandles[index]) return;
    const next = [...litCandles];
    next[index] = false;
    setLitCandles(next);
  };

  // Grand Cake Cutting & Universe Unfolding Ceremony
  const handleCutTheCake = () => {
    if (isCutting) return;
    setIsCutting(true);

    // Blow all remaining candles
    setLitCandles([false, false, false, false, false]);

    // Fire explosive birthday confetti
    if (!reducedMotion) {
      confetti({
        particleCount: 130,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#FFD95A', '#F7B8C8', '#9DDDF2', '#F6C9A8', '#FF8DA1'],
      });

      // Secondary confetti burst
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 110,
          origin: { y: 0.5 },
          colors: ['#FFD95A', '#FF6B8B', '#FFE17D', '#B5EAD7'],
        });
      }, 350);
    }

    // Automatically start playing the iconic Marathi birthday song!
    if (!isPlaying) {
      playTrack('mukhda');
    }

    // Trigger unfold after brief cake slice animation
    setTimeout(() => {
      setIsCutting(false);
      onUnfold();
    }, 700);
  };

  const handleResetCake = () => {
    setLitCandles([true, true, true, true, true]);
    if (onReplay) onReplay();
  };

  const handleBeginClick = () => {
    if (!reducedMotion) {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#FFD95A', '#F7B8C8', '#9DDDF2', '#F6C9A8'],
      });
    }
    const queenEl = document.getElementById('birthday-queen');
    if (queenEl) {
      queenEl.scrollIntoView({ behavior: 'smooth' });
    } else if (onNext) {
      onNext();
    }
  };

  return (
    <div
      aria-label="Chapter 01: Welcome"
      className="relative min-h-[calc(100vh-4rem)] w-full bg-gradient-to-b from-sunshine via-sunshine-light to-cream overflow-hidden flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
    >
      {/* Floating Pastel Balloons Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          animate={reducedMotion ? {} : { y: [0, -14, 0], x: [0, 4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-4 left-[4%] w-10 h-14 sm:w-14 sm:h-18 opacity-80"
        >
          <svg viewBox="0 0 64 90" fill="none">
            <ellipse cx="32" cy="30" rx="26" ry="28" fill="#F7B8C8" stroke="#51463F" strokeWidth="3" />
            <ellipse cx="22" cy="20" rx="5" ry="9" fill="#FFFDF7" opacity="0.6" />
            <polygon points="32,58 27,64 37,64" fill="#F7B8C8" stroke="#51463F" strokeWidth="2.5" />
            <path d="M32 64 Q36 76 28 88" stroke="#51463F" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </motion.div>

        <motion.div
          animate={reducedMotion ? {} : { y: [0, -12, 0], x: [0, -5, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
          className="absolute top-6 right-[5%] w-10 h-14 sm:w-14 sm:h-18 opacity-80"
        >
          <svg viewBox="0 0 64 90" fill="none">
            <ellipse cx="32" cy="30" rx="26" ry="28" fill="#9DDDF2" stroke="#51463F" strokeWidth="3" />
            <ellipse cx="22" cy="20" rx="5" ry="9" fill="#FFFDF7" opacity="0.6" />
            <polygon points="32,58 27,64 37,64" fill="#9DDDF2" stroke="#51463F" strokeWidth="2.5" />
            <path d="M32 64 Q26 76 34 88" stroke="#51463F" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto w-full relative z-10 my-auto">
        {/* =========================================================================
            STATE 1: THE CAKE IS WAITING TO BE OPENED / CUT (THE GRAND START)
            ========================================================================= */}
        {!isUnfolded ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center text-center max-w-2xl mx-auto py-2"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-paper border-2 border-cocoa shadow-sticker mb-3">
              <Cake className="w-4 h-4 text-blush-deep" />
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-cocoa">
                CHAPTER 01 • 9 NOVEMBER 2026 • THE GRAND OPENING
              </span>
            </div>

            {/* Grand Heading */}
            <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-cocoa leading-tight tracking-tight mb-2">
              A SPECIAL SURPRISE FOR MUMMA! 🎂
            </h1>

            {/* Marathi Welcome Prompt */}
            <p className="font-marathi text-base sm:text-xl font-bold text-cocoa leading-snug max-w-xl mx-auto">
              &ldquo;मम्मा, तुझ्या वाढदिवसाचा हा गोड केक कापा आणि आपल्या आठवणींचं सुंदर जग उघडा! ❤️&rdquo;
            </p>

            <p className="text-xs sm:text-sm font-bold text-cocoa-light mt-1.5 mb-6">
              Tap the cake or blow the candles to unfold the entire universe of surprises.
            </p>

            {/* Interactive Birthday Cake Stand Card */}
            <div className="paper-card rounded-3xl p-6 sm:p-8 bg-cream-paper relative w-full max-w-md mx-auto shadow-polaroid border-3 border-cocoa">
              <div className="washi-tape washi-tape-pink -top-3 left-1/2 -translate-x-1/2 scale-90" />

              {/* 5 Candle Flames Row */}
              <div className="flex justify-center items-end gap-3 sm:gap-4 mb-2">
                {litCandles.map((isLit, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleCandleClick(i)}
                    className="flex flex-col items-center cursor-pointer group focus:outline-hidden"
                    title={isLit ? 'Tap to blow out candle' : 'Candle blown out'}
                  >
                    {/* Animated Flame */}
                    <div className="h-7 sm:h-8 flex items-center justify-center">
                      <AnimatePresence>
                        {isLit ? (
                          <motion.div
                            key="flame"
                            animate={
                              reducedMotion
                                ? {}
                                : {
                                    scale: [1, 1.18, 0.95, 1.12, 1],
                                    y: [0, -2, 0],
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

              {/* Illustrated 3-Tier Layer Cake with Slice Cut Motion */}
              <motion.div
                animate={isCutting ? { scale: [1, 1.05, 1], rotate: [0, -1, 1, 0] } : {}}
                transition={{ duration: 0.6 }}
                onClick={handleCutTheCake}
                className="w-full max-w-[260px] mx-auto cursor-pointer group"
                title="Click cake to cut & unfold universe!"
              >
                <svg viewBox="0 0 280 180" className="w-full h-auto drop-shadow-md group-hover:scale-102 transition-transform duration-300">
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

                  {/* Cake Plate Stand */}
                  <ellipse
                    cx="140"
                    cy="166"
                    rx="136"
                    ry="10"
                    fill="#E8DFD8"
                    stroke="#51463F"
                    strokeWidth="4"
                  />
                </svg>
              </motion.div>

              {/* Big Pulsing "Cut the Cake" Button */}
              <div className="mt-6 flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={handleCutTheCake}
                  disabled={isCutting}
                  className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-2xl bg-sunshine hover:bg-sunshine-deep active:scale-95 text-cocoa font-heading font-black text-base sm:text-lg border-3 border-cocoa shadow-sticker hover:shadow-stickerHover hover:-translate-y-0.5 transition-all cursor-pointer"
                  style={{ borderWidth: '3px' }}
                >
                  <PartyPopper className="w-5 h-5 text-cocoa group-hover:rotate-12 transition-transform" />
                  <span>
                    {isCutting ? 'CUTTING THE CAKE... 🍰' : 'CUT THE CAKE & OPEN UNIVERSE ✨'}
                  </span>
                  <Sparkles className="w-5 h-5 text-cocoa group-hover:scale-125 transition-transform" />
                </button>

                <p className="font-marathi text-xs font-bold text-cocoa-light mt-1">
                  केक कापल्यावर गाणं सुरू होईल आणि सर्व आठवणी उघडतील! 🎵
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          /* =========================================================================
             STATE 2: THE CAKE IS CUT! THE FULL WELCOME STORY UNFOLDS
             ========================================================================= */
          <WaveReveal immediate>
            {/* Top Celebratory Banner */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between gap-2 p-3 sm:p-3.5 mb-6 rounded-2xl bg-cream-paper border-2 border-cocoa shadow-sticker"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">🎂</span>
                <div>
                  <span className="font-heading text-xs sm:text-sm font-bold text-cocoa block leading-tight">
                    THE CAKE IS CUT! THE NISHA UNIVERSE IS UNLOCKED!
                  </span>
                  <span className="font-marathi text-[11px] font-bold text-cocoa-light">
                    वाढदिवसाच्या हार्दिक शुभेच्छा, मम्मा! आठवणी उघडल्या आहेत ❤️
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleResetCake}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-cream-warm hover:bg-sunshine text-cocoa text-[11px] font-bold border border-cocoa transition-colors cursor-pointer shrink-0"
                title="Cut cake again"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Cut Again</span>
              </button>
            </motion.div>

            {/* Unfolded Welcome Story Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Left Column: Secret Birthday Invitation Copy */}
              <motion.div
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-7 text-left"
              >
                {/* Chapter Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-paper border-2 border-cocoa shadow-sticker mb-2.5">
                  <Sparkles className="w-3.5 h-3.5 text-blush-deep" />
                  <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-cocoa">
                    CHAPTER 01 • 9 NOVEMBER 2026
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-cocoa leading-[1.15] tracking-tight mb-3">
                  WAIT! SOMEONE VERY SPECIAL IS HERE!
                </h1>

                {/* Playful Checklist Card */}
                <div className="paper-card rounded-3xl p-4 sm:p-5 mb-4 relative bg-cream-paper">
                  <div className="washi-tape washi-tape-pink -top-2.5 left-8 rotate-[-3deg]" />

                  <p className="font-heading text-base sm:text-lg font-bold text-cocoa mb-2">
                    Are you Nisha?
                  </p>

                  <ul className="grid grid-cols-2 gap-2 text-xs sm:text-sm font-bold text-cocoa-light mb-3">
                    <li className="flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-skyblue flex items-center justify-center text-cocoa border border-cocoa text-[10px] shrink-0">
                        ✓
                      </span>
                      <span>The professor?</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-blush flex items-center justify-center text-cocoa border border-cocoa text-[10px] shrink-0">
                        ✓
                      </span>
                      <span>The researcher?</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-peach flex items-center justify-center text-cocoa border border-cocoa text-[10px] shrink-0">
                        ✓
                      </span>
                      <span>The family advisor?</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-sunshine flex items-center justify-center text-cocoa border border-cocoa text-[10px] shrink-0">
                        ❤️
                      </span>
                      <span className="text-cocoa font-extrabold truncate">Our Mumma?</span>
                    </li>
                  </ul>

                  {/* Marathi Subtitle & Greeting */}
                  <div className="p-2.5 sm:p-3 rounded-xl bg-sunshine-soft border border-cocoa/20">
                    <p className="font-marathi text-sm sm:text-base font-bold text-cocoa leading-snug">
                      &ldquo;आजचा दिवस फक्त तुझ्यासाठी आहे, Mumma!&rdquo;
                    </p>
                    <p className="text-[11px] sm:text-xs font-bold text-cocoa-light mt-0.5">
                      तुझ्यासाठी... कारण तू खूप खास आहेस! ❤️ — Created with love by Shriraj
                    </p>
                  </div>
                </div>

                {/* CTA Begin Button & Scroll Down Prompt */}
                <div className="flex flex-wrap items-center gap-3.5">
                  <button
                    type="button"
                    onClick={handleBeginClick}
                    className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl bg-blush hover:bg-blush-deep text-cocoa font-heading font-bold text-base sm:text-lg border-3 border-cocoa shadow-sticker hover:shadow-stickerHover hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                    style={{ borderWidth: '3px' }}
                  >
                    <PartyPopper className="w-5 h-5 text-cocoa group-hover:rotate-12 transition-transform" />
                    <span>LET&apos;S BEGIN ❤️</span>
                    <ChevronDown className="w-5 h-5 text-cocoa group-hover:translate-y-1 transition-transform" />
                  </button>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-cocoa/80">
                    <Heart className="w-3.5 h-3.5 fill-blush-deep text-cocoa shrink-0" />
                    <span>Scroll down or tap to explore</span>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Polaroid Hero Frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 25 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-5 flex flex-col items-center relative"
              >
                {heroPhoto && (
                  <div
                    className="relative bg-cream-paper p-3.5 pb-4 rounded-3xl border-3 border-cocoa shadow-polaroid rotate-1 hover:rotate-0 transition-transform duration-300 max-w-[280px] sm:max-w-xs w-full"
                    style={{ borderWidth: '3px' }}
                  >
                    <div className="washi-tape washi-tape-blue -top-2.5 left-1/2 -translate-x-1/2 rotate-2" />

                    <div className="aspect-[3/4] max-h-[280px] w-full overflow-hidden rounded-2xl border-2 border-cocoa/20 bg-cream-warm mx-auto flex items-center justify-center">
                      <img
                        src={heroPhoto.src}
                        alt={heroPhoto.description}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="mt-2.5 text-center">
                      <p className="font-handwritten text-xl font-bold text-cocoa">
                        The Queen of Our Universe ✨
                      </p>
                      <p className="text-[11px] font-bold text-cocoa-light">
                        Nisha (Mumma) • 9 November 2026
                      </p>
                    </div>

                    {/* Original Mascot Sticker */}
                    <div className="absolute -top-4 -right-2 sm:-right-4">
                      <ShinchanMascot mood="party" className="w-14 h-14 sm:w-16 sm:h-16" />
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Floating Animated Scroll Down Arrow */}
            <motion.div
              animate={reducedMotion ? {} : { y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-8 text-center text-xs font-extrabold text-cocoa-light flex items-center justify-center gap-1 pointer-events-none"
            >
              <span>Scroll down to discover Chapter 02: The Queen</span>
              <ChevronDown className="w-4 h-4 text-cocoa" />
            </motion.div>
          </WaveReveal>
        )}
      </div>
    </div>
  );
};

export default WelcomeScreen;
