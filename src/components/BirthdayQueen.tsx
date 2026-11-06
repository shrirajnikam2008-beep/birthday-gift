import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Crown,
  BookOpen,
  Microscope,
  HeartHandshake,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { getPhotoById } from '../data/photos';

const personalityModes = [
  {
    id: 'prof',
    title: 'PROFESSOR MODE: ON',
    badge: 'Active Daily',
    description:
      'Explaining concepts with crystal clarity, inspiring students, and commanding respect effortlessly.',
    icon: BookOpen,
    bg: 'bg-skyblue-soft',
    accent: 'bg-skyblue',
  },
  {
    id: 'research',
    title: 'RESEARCH MODE: ON',
    badge: 'Deep Focus',
    description:
      'Always curious, reading, analysing, and pushing forward towards the next academic milestone.',
    icon: Microscope,
    bg: 'bg-sunshine-soft',
    accent: 'bg-sunshine',
  },
  {
    id: 'mumma',
    title: 'MUMMA MODE: ALWAYS ON',
    badge: '24 / 7 / 365',
    description:
      'Knowing when someone is hungry, tired, or stressed before they even say a single word.',
    icon: HeartHandshake,
    bg: 'bg-blush-soft',
    accent: 'bg-blush',
  },
  {
    id: 'strict',
    title: 'STRICT MODE: EXTREMELY DANGEROUS',
    badge: 'Proceed With Caution ⚠️',
    description:
      'One silent look is enough to restore complete law, order, and discipline across the entire room!',
    icon: ShieldAlert,
    bg: 'bg-peach-light',
    accent: 'bg-peach',
  },
];

const fictionalAwards = [
  {
    title: 'Lifetime Achievement Award in Caring',
    subtitle: 'For putting her family’s happiness, health, and well-being first every single day.',
    emoji: '🏆',
    color: 'bg-sunshine-soft',
  },
  {
    title: 'PhD in Handling Family Nonsense',
    subtitle: 'Awarded with highest honours for managing stubbornness, chaos, and daily drama.',
    emoji: '🎖️',
    color: 'bg-blush-soft',
  },
  {
    title: 'Professor of Giving Unsolicited but Correct Advice',
    subtitle: 'Because 99.9% of the time, "Mumma told you so" turns out to be completely true.',
    emoji: '💡',
    color: 'bg-skyblue-soft',
  },
  {
    title: 'CEO of the Nikam Household',
    subtitle: 'Supreme executive authority over kitchen operations, schedules, and major decisions.',
    emoji: '👑',
    color: 'bg-peach-light',
  },
];

export const BirthdayQueen: React.FC = () => {
  const [revealedIds, setRevealedIds] = useState<string[]>([
    'prof',
    'research',
    'mumma',
    'strict',
  ]);

  const heroPhoto = getPhotoById('photo-025'); // Royal Enfield motorcycle photo
  const secondaryPhoto = getPhotoById('photo-010'); // Sunglasses portrait

  const toggleCard = (id: string) => {
    setRevealedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Chapter 02 Header Banner */}
      <div className="text-center mb-6 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blush border-2 border-cocoa shadow-sticker mb-2">
          <Crown className="w-3.5 h-3.5 text-cocoa" />
          <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-cocoa">
            CHAPTER 02 • THE BIRTHDAY QUEEN
          </span>
        </div>
        <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-cocoa leading-tight">
          THE WOMAN. THE LEGEND. THE MUMMA.
        </h2>
        <p className="font-marathi text-base sm:text-lg font-bold text-cocoa mt-2">
          आपल्या घराची राणी 👑
        </p>
      </div>

      {/* Part 1: Hero Royal Enfield Portrait & Emotional Intro */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center mb-12 sm:mb-16">
        {/* Left Column: Royal Enfield Hunter Portrait */}
        <div className="md:col-span-5 flex justify-center">
          {heroPhoto && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="bg-cream-paper p-3 sm:p-3.5 pb-4 rounded-3xl border-3 border-cocoa shadow-polaroid rotate-[-1deg] hover:rotate-0 transition-transform max-w-[320px] w-full relative flex flex-col items-center"
              style={{ borderWidth: '3px' }}
            >
              <div className="washi-tape washi-tape-pink -top-2.5 left-1/2 -translate-x-1/2" />
              <div className="w-full rounded-2xl overflow-hidden border-2 border-cocoa/20 bg-cream-warm flex items-center justify-center shadow-inner">
                <img
                  src={heroPhoto.src}
                  alt={heroPhoto.description}
                  className="h-72 sm:h-80 md:h-[390px] w-auto max-w-full object-contain block"
                />
              </div>
              <div className="mt-2.5 text-center">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sunshine border border-cocoa text-[11px] font-extrabold text-cocoa mb-1">
                  🏍️ Rider Queen • Royal Enfield Hunter
                </span>
                <p className="font-handwritten text-base sm:text-lg font-bold text-center text-cocoa leading-snug">
                  {heroPhoto.caption}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column: Emotional Intro & Secondary Photo */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-7 space-y-4 text-left"
        >
          <div className="paper-card rounded-3xl p-5 sm:p-6 bg-cream-paper">
            <p className="text-sm sm:text-base font-bold text-cocoa-light leading-relaxed mb-3">
              &ldquo;A woman with a brilliant mind, a heart full of boundless warmth, ambitions bigger than her to-do list, and the natural authority to command any room with a single look.&rdquo;
            </p>

            <div className="p-3.5 rounded-2xl bg-sunshine-soft border-2 border-cocoa/20">
              <p className="font-marathi text-base sm:text-xl font-bold text-cocoa leading-snug">
                &ldquo;कधी प्रेमाने समजावणारी, कधी रागावणारी, पण प्रत्येक वेळी आपल्या माणसांसाठी खंबीरपणे उभी राहणारी आमची मम्मा!&rdquo;
              </p>
            </div>
          </div>

          {secondaryPhoto && (
            <div className="paper-card rounded-2xl p-3 sm:p-4 bg-cream-paper flex items-center gap-3.5">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-cocoa shrink-0 bg-cream-warm flex items-center justify-center">
                <img
                  src={secondaryPhoto.src}
                  alt={secondaryPhoto.description}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-cocoa-light">
                  Unstoppable Spirit 😎
                </span>
                <p className="text-xs sm:text-sm font-bold text-cocoa">
                  Equal parts intellect, grace, humour, and supreme household authority!
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Part 2: Four Personality Modes */}
      <div className="mb-12 sm:mb-16">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sunshine border-2 border-cocoa shadow-sticker mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cocoa" />
            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-cocoa">
              OPERATIONAL MODES
            </span>
          </div>
          <h3 className="font-heading text-xl sm:text-3xl font-bold text-cocoa">
            THE FOUR SIDES OF NISHA
          </h3>
          <p className="text-xs sm:text-sm font-bold text-cocoa-light mt-1">
            Tap any card to toggle mode details
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 max-w-4xl mx-auto">
          {personalityModes.map((mode) => {
            const IconComponent = mode.icon;
            const isActive = revealedIds.includes(mode.id);
            return (
              <motion.button
                key={mode.id}
                type="button"
                onClick={() => toggleCard(mode.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`paper-card rounded-2xl p-3.5 sm:p-4 text-left transition-all cursor-pointer ${
                  mode.bg
                } ${isActive ? 'ring-2 ring-cocoa shadow-sticker' : 'opacity-85'}`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${mode.accent} border-2 border-cocoa flex items-center justify-center shrink-0 shadow-sm`}
                    >
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-cocoa" />
                    </div>
                    <span className="font-heading text-xs sm:text-sm font-bold text-cocoa leading-tight">
                      {mode.title}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-cream-paper border border-cocoa text-cocoa shrink-0">
                    {mode.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-cocoa leading-relaxed pl-1">
                  {mode.description}
                </p>

                <div className="mt-2.5 pt-2 border-t border-cocoa/15 flex items-center justify-between text-[10px] font-extrabold text-cocoa-light">
                  <span>Status: {isActive ? 'Active' : 'Standby'}</span>
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${
                      isActive ? 'text-green-700' : 'text-cocoa/30'
                    }`}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Part 3: Official Household Recognitions & Fictional Awards */}
      <div>
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-peach border-2 border-cocoa shadow-sticker mb-1.5">
            <Crown className="w-3.5 h-3.5 text-cocoa" />
            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-cocoa">
              HALL OF HONOURS
            </span>
          </div>
          <h3 className="font-heading text-xl sm:text-3xl font-bold text-cocoa">
            OFFICIAL HOUSEHOLD AWARDS
          </h3>
          <p className="text-xs sm:text-sm font-bold text-cocoa-light mt-1">
            Certified by Papa & Shriraj with highest distinction
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 max-w-4xl mx-auto">
          {fictionalAwards.map((award, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`paper-card rounded-2xl p-4 ${award.color} relative overflow-hidden`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl sm:text-3xl shrink-0 p-1.5 rounded-xl bg-cream-paper border-2 border-cocoa/30 shadow-sm">
                  {award.emoji}
                </span>
                <div>
                  <h4 className="font-heading text-sm sm:text-base font-bold text-cocoa leading-snug">
                    {award.title}
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-cocoa-light leading-relaxed mt-1">
                    {award.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
