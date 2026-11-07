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
  Check,
  Award,
} from 'lucide-react';
import { getPhotoById } from '../data/photos';
import { ShinchanMascot } from './ShinchanMascot';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useAudio } from '../context/AudioContext';

interface WelcomeScreenProps {
  isUnfolded: boolean;
  onUnfold: () => void;
  onNext?: () => void;
  onReplay?: () => void;
}

const CHECKLIST_ITEMS = [
  { id: 'prof', label: 'The inspiring professor?', sub: 'Loved by students', bg: 'bg-skyblue', emoji: '🎓' },
  { id: 'res', label: 'The PhD researcher?', sub: 'Always curious', bg: 'bg-blush', emoji: '🔬' },
  { id: 'adv', label: 'The chief family advisor?', sub: '99.9% always right', bg: 'bg-peach', emoji: '💡' },
  { id: 'mum', label: 'Our beloved Mumma?', sub: 'Heart of our home', bg: 'bg-sunshine', emoji: '❤️' },
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  isUnfolded,
  onUnfold,
  onNext,
  onReplay,
}) => {
  const [litCandles, setLitCandles] = useState<boolean[]>([true, true, true, true, true]);
  const [isCutting, setIsCutting] = useState(false);
  const [checkedRoles, setCheckedRoles] = useState<string[]>(['prof', 'res', 'adv', 'mum']);
  const heroPhoto = getPhotoById('photo-002');
  const reducedMotion = useReducedMotion();
  const { playTrack, isPlaying } = useAudio();

  const litCount = litCandles.filter(Boolean).length;

  // Blow out an individual candle
  const handleCandleClick = (index: number) => {
    if (!litCandles[index]) return;
    const next = [...litCandles];
    next[index] = false;
    setLitCandles(next);
  };

  const toggleRoleCheck = (id: string) => {
    setCheckedRoles((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
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
    onNext?.();
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
          className="absolute top-4 left-[3%] sm:left-[4%] w-10 h-14 sm:w-14 sm:h-18 opacity-85"
        >
          <svg viewBox="0 0 64 90" fill="none">
            <ellipse cx="32" cy="30" rx="26" ry="28" fill="#F7B8C8" stroke="#51463F" strokeWidth="3" />
            <ellipse cx="22" cy="20" rx="5" ry="9" fill="#FFFDF7" opacity="0.65" />
            <polygon points="32,58 27,64 37,64" fill="#F7B8C8" stroke="#51463F" strokeWidth="2.5" />
            <path d="M32 64 Q36 76 28 88" stroke="#51463F" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </motion.div>

        <motion.div
          animate={reducedMotion ? {} : { y: [0, -12, 0], x: [0, -5, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
          className="absolute top-6 right-[3%] sm:right-[5%] w-10 h-14 sm:w-14 sm:h-18 opacity-85"
        >
          <svg viewBox="0 0 64 90" fill="none">
            <ellipse cx="32" cy="30" rx="26" ry="28" fill="#9DDDF2" stroke="#51463F" strokeWidth="3" />
            <ellipse cx="22" cy="20" rx="5" ry="9" fill="#FFFDF7" opacity="0.65" />
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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

            <p className="text-xs sm:text-sm font-bold text-cocoa-light mt-1.5 mb-5">
              Tap the candles to make a wish, or cut the cake to unfold all 8 chapters of your universe.
            </p>

            {/* Interactive Birthday Cake Stand Card */}
            <div
              className="paper-card rounded-3xl p-5 sm:p-8 bg-cream-paper relative w-full max-w-md mx-auto shadow-polaroid"
              style={{ borderWidth: '3px' }}
            >
              <div className="washi-tape washi-tape-pink -top-3 left-1/2 -translate-x-1/2 scale-90" />

              {/* Candle Counter Pill */}
              <div className="flex items-center justify-between gap-2 mb-3 px-3 py-1 rounded-full bg-sunshine-soft border border-cocoa/25 text-[11px] font-extrabold text-cocoa">
                <span>🕯️ {litCount} of 5 Birthday Candles Lit</span>
                <span className="text-cocoa-light">
                  {litCount === 0 ? 'Wishes ready! ✨' : 'Tap flames to blow'}
                </span>
              </div>

              {/* 5 Candle Flames Row */}
              <div className="flex justify-center items-end gap-3.5 sm:gap-5 mb-1">
                {litCandles.map((isLit, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleCandleClick(i)}
                    className="flex flex-col items-center cursor-pointer group"
                    title={isLit ? `Tap to blow out candle ${i + 1}` : 'Candle blown out'}
                    aria-label={isLit ? `Blow out candle ${i + 1}` : `Candle ${i + 1} blown out`}
                  >
                    {/* Animated Flame with Warm Glow Halo */}
                    <div className="h-8 sm:h-9 flex items-center justify-center relative">
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

                    {/* Striped Candle Stick */}
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

              {/* Illustrated 3-Tier Patisserie Cake with Berries & Frosting Drips */}
              <motion.div
                animate={isCutting ? { scale: [1, 1.05, 1], rotate: [0, -1.2, 1.2, 0] } : {}}
                transition={{ duration: 0.6 }}
                onClick={handleCutTheCake}
                className="w-full max-w-[270px] mx-auto cursor-pointer group"
                title="Click cake to cut & unfold universe!"
              >
                <svg viewBox="0 0 280 185" className="w-full h-auto drop-shadow-md group-hover:scale-102 transition-transform duration-300">
                  {/* Decorative Strawberries / Cherries on Top Tier */}
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
                  {/* Heart Emblem on Bottom Tier */}
                  <path
                    d="M140 151 C140 151 131 145 131 139 C131 136 133.5 134 136 134 C138 134 139.2 135 140 136.5 C140.8 135 142 134 144 134 C146.5 134 149 136 149 139 C149 145 140 151 140 151 Z"
                    fill="#F7B8C8"
                    stroke="#51463F"
                    strokeWidth="2.2"
                  />

                  {/* Cake Plate Stand */}
                  <ellipse
                    cx="140"
                    cy="169"
                    rx="136"
                    ry="10"
                    fill="#FFE896"
                    stroke="#51463F"
                    strokeWidth="4"
                  />
                </svg>
              </motion.div>

              {/* Big Pulsing "Cut the Cake" Button */}
              <div className="mt-5 flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={handleCutTheCake}
                  disabled={isCutting}
                  className="group relative inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl bg-sunshine hover:bg-sunshine-deep active:scale-95 text-cocoa font-heading font-black text-sm sm:text-lg border-3 border-cocoa shadow-sticker hover:shadow-stickerHover hover:-translate-y-0.5 transition-all cursor-pointer"
                  style={{ borderWidth: '3px' }}
                >
                  <PartyPopper className="w-5 h-5 text-cocoa group-hover:rotate-12 transition-transform shrink-0" />
                  <span>
                    {isCutting ? 'CUTTING THE CAKE... 🍰' : 'CUT THE CAKE & OPEN UNIVERSE ✨'}
                  </span>
                  <Sparkles className="w-5 h-5 text-cocoa group-hover:scale-125 transition-transform shrink-0" />
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
          <>
            {/* Top Celebratory Banner */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between gap-2 p-3 sm:p-3.5 mb-6 rounded-2xl bg-cream-paper border-2 border-cocoa shadow-sticker"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl sm:text-2xl">🎂</span>
                <div>
                  <span className="font-heading text-xs sm:text-sm font-bold text-cocoa block leading-tight">
                    THE CAKE IS CUT! THE NISHA UNIVERSE IS UNLOCKED!
                  </span>
                  <span className="font-marathi text-[11px] sm:text-xs font-bold text-cocoa-light">
                    वाढदिवसाच्या हार्दिक शुभेच्छा, मम्मा! आठवणी उघडल्या आहेत ❤️
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleResetCake}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-cream-warm hover:bg-sunshine active:scale-95 text-cocoa text-[11px] font-extrabold border-2 border-cocoa transition-all cursor-pointer shrink-0"
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
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cream-paper border-2 border-cocoa shadow-sticker mb-2.5">
                  <Sparkles className="w-3.5 h-3.5 text-blush-deep" />
                  <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-cocoa">
                    CHAPTER 01 • 9 NOVEMBER 2026 • SPECIAL EDITION
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-cocoa leading-[1.12] tracking-tight mb-3">
                  WAIT! SOMEONE VERY SPECIAL IS HERE!
                </h1>

                {/* Interactive Checklist Card */}
                <div className="paper-card rounded-3xl p-4 sm:p-5 mb-4 relative bg-cream-paper">
                  <div className="washi-tape washi-tape-pink -top-2.5 left-8 rotate-[-3deg]" />

                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <p className="font-heading text-base sm:text-lg font-bold text-cocoa">
                      Identity Verification: Are you Nisha?
                    </p>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sunshine-soft border border-cocoa/30 text-[10px] font-extrabold text-cocoa">
                      <Award className="w-3 h-3 text-sunshine-deep" />
                      {checkedRoles.length}/4 Verified
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3.5">
                    {CHECKLIST_ITEMS.map((item) => {
                      const isChecked = checkedRoles.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleRoleCheck(item.id)}
                          aria-pressed={isChecked}
                          className={`flex items-center justify-between gap-2 p-2 rounded-xl border-2 text-left transition-all cursor-pointer ${
                            isChecked
                              ? 'bg-cream border-cocoa shadow-2xs'
                              : 'bg-cream/50 border-cocoa/20 opacity-75 hover:opacity-100'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className={`w-5 h-5 rounded-full ${item.bg} flex items-center justify-center text-cocoa border border-cocoa text-[10px] font-black shrink-0`}
                            >
                              {isChecked ? <Check className="w-3 h-3 stroke-[3]" /> : item.emoji}
                            </span>
                            <div className="min-w-0">
                              <span className="text-xs sm:text-sm font-extrabold text-cocoa block truncate">
                                {item.label}
                              </span>
                              <span className="text-[10px] font-bold text-cocoa-light block truncate">
                                {item.sub}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs shrink-0">{item.emoji}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Marathi Subtitle & Greeting */}
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-sunshine-soft border-2 border-cocoa/20">
                    <p className="font-marathi text-sm sm:text-base font-bold text-cocoa leading-snug">
                      &ldquo;आजचा दिवस फक्त तुझ्यासाठी आहे, Mumma!&rdquo;
                    </p>
                    <p className="text-[11px] sm:text-xs font-bold text-cocoa-light mt-0.5">
                      तुझ्यासाठी... कारण तू खूप खास आहेस! ❤️ — Created with boundless love by Shriraj
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
                    <span>Scroll down or tap to explore all 8 chapters</span>
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
                    className="relative bg-cream-paper p-3.5 pb-4 rounded-3xl border-3 border-cocoa shadow-polaroid rotate-1 hover:rotate-0 transition-transform duration-300 max-w-[290px] sm:max-w-xs w-full"
                    style={{ borderWidth: '3px' }}
                  >
                    <div className="washi-tape washi-tape-blue -top-2.5 left-1/2 -translate-x-1/2 rotate-2" />

                    <div className="relative aspect-[3/4] max-h-[290px] w-full overflow-hidden rounded-2xl border-2 border-cocoa/20 bg-cream-warm mx-auto flex items-center justify-center">
                      <span className="photo-corner-tl" />
                      <span className="photo-corner-br" />
                      <img
                        src={heroPhoto.src}
                        alt={heroPhoto.description}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="mt-3 text-center">
                      <p className="font-handwritten text-xl sm:text-2xl font-bold text-cocoa">
                        The Queen of Our Universe ✨
                      </p>
                      <div className="inline-flex items-center gap-1.5 mt-0.5 px-2.5 py-0.5 rounded-full bg-sunshine-soft border border-cocoa/20 text-[11px] font-extrabold text-cocoa">
                        <span>Nisha (Mumma)</span>
                        <span>•</span>
                        <span>9 November 2026</span>
                      </div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default WelcomeScreen;
