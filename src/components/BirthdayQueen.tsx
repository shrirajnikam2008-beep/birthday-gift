import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Crown,
  BookOpen,
  Microscope,
  HeartHandshake,
  ShieldAlert,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { getPhotoById } from '../data/photos';

interface BirthdayQueenProps {
  onNext: () => void;
}

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
    subtitle: 'For putting her family’s happiness and well-being first every single day.',
    emoji: '🏆',
  },
  {
    title: 'PhD in Handling Family Nonsense',
    subtitle: 'Awarded with highest honours for managing stubbornness, chaos, and daily drama.',
    emoji: '🎖️',
  },
  {
    title: 'Professor of Giving Unsolicited but Correct Advice',
    subtitle: 'Because 99.9% of the time, "Mumma told you so" turns out to be completely true.',
    emoji: '💡',
  },
  {
    title: 'CEO of the Nikam Household',
    subtitle: 'Supreme executive authority over kitchen operations, schedules, and family decisions.',
    emoji: '👑',
  },
];

export const BirthdayQueen: React.FC<BirthdayQueenProps> = ({ onNext }) => {
  const [revealedIds, setRevealedIds] = useState<string[]>(['prof', 'research', 'mumma', 'strict']);
  const [activeTab, setActiveTab] = useState<'modes' | 'awards'>('modes');

  const riderPhoto = getPhotoById('photo-025'); // Iconic Royal Enfield motorcycle photo
  const sunglassesPhoto = getPhotoById('photo-010');

  const toggleCard = (id: string) => {
    setRevealedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      aria-label="Chapter 02: Meet The Birthday Queen"
      className="h-full w-full overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Compact Chapter Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blush border-2 border-cocoa shadow-sticker mb-3">
            <Crown className="w-3.5 h-3.5 text-cocoa" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-cocoa">
              CHAPTER 02 / 08 • MEET THE BIRTHDAY QUEEN
            </span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-cocoa tracking-tight mb-3">
            THE WOMAN. THE LEGEND. THE MUMMA.
          </h2>

          <p className="text-sm sm:text-lg font-bold text-cocoa-light leading-relaxed mb-4">
            &ldquo;A woman with a brilliant mind, a heart full of love, ambitions bigger than her to-do list, and the authority to silence an entire room with one look.&rdquo;
          </p>

          <div className="paper-card rounded-2xl px-4 py-2.5 bg-sunshine-soft inline-block max-w-2xl">
            <p className="font-marathi text-base sm:text-xl font-bold text-cocoa">
              &ldquo;कधी प्रेमाने समजावणारी, कधी रागावणारी, पण प्रत्येक वेळी आपल्या माणसांसाठी मनापासून उभी राहणारी.&rdquo;
            </p>
          </div>
        </div>

        {/* Main Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left 5 Cols: Mumma's Selected Hero Photographs */}
          <div className="lg:col-span-5 flex flex-col items-center gap-4">
            {riderPhoto && (
              <div className="paper-card rounded-3xl p-3.5 pb-5 bg-cream-paper relative w-full max-w-sm rotate-[-1deg] hover:rotate-0 transition-transform">
                <div className="washi-tape -top-3 left-1/2 -translate-x-1/2" />
                <div className="aspect-[4/4] max-h-[300px] sm:max-h-[340px] w-full rounded-2xl overflow-hidden border-2 border-cocoa/20 bg-cream-warm">
                  <img
                    src={riderPhoto.src}
                    alt={riderPhoto.description}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <p className="font-handwritten text-xl sm:text-2xl font-bold text-center text-cocoa mt-2.5">
                  {riderPhoto.caption}
                </p>
              </div>
            )}

            {sunglassesPhoto && (
              <div className="paper-card rounded-2xl p-3 bg-cream-paper flex items-center gap-3.5 w-full max-w-sm">
                <img
                  src={sunglassesPhoto.src}
                  alt={sunglassesPhoto.description}
                  className="w-16 h-16 rounded-xl object-cover border-2 border-cocoa shrink-0"
                />
                <div className="text-left">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-cocoa-light">
                    Unstoppable Vibes 😎
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-cocoa mt-0.5">
                    Equal parts grace, intellect, humour, and supreme household authority!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right 7 Cols: Interactive Mode Switcher (Personality Modes + Playful Household Awards) */}
          <div className="lg:col-span-7">
            {/* Sub-view Toggle Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="inline-flex p-1 rounded-2xl bg-cream-paper border-2 border-cocoa shadow-sticker">
                <button
                  type="button"
                  onClick={() => setActiveTab('modes')}
                  className={`px-4 py-2 rounded-xl font-heading text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                    activeTab === 'modes'
                      ? 'bg-sunshine text-cocoa border border-cocoa'
                      : 'text-cocoa-light hover:text-cocoa'
                  }`}
                >
                  ⚡ 4 Personality Modes
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('awards')}
                  className={`px-4 py-2 rounded-xl font-heading text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                    activeTab === 'awards'
                      ? 'bg-blush text-cocoa border border-cocoa'
                      : 'text-cocoa-light hover:text-cocoa'
                  }`}
                >
                  🏆 4 Official Family Awards
                </button>
              </div>

              <span className="text-xs font-bold text-cocoa-light flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-sunshine-deep" />
                {activeTab === 'modes'
                  ? 'Tap any card to inspect status'
                  : 'Playful family-voted honours'}
              </span>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'modes' ? (
                <motion.div
                  key="modes-grid"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {personalityModes.map((mode, idx) => {
                    const IconComponent = mode.icon;
                    const isActive = revealedIds.includes(mode.id);
                    return (
                      <motion.button
                        key={mode.id}
                        type="button"
                        onClick={() => toggleCard(mode.id)}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.07 }}
                        className={`paper-card rounded-3xl p-4 sm:p-5 text-left transition-all cursor-pointer flex flex-col justify-between ${mode.bg} hover:-translate-y-0.5`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <div
                              className={`w-10 h-10 rounded-2xl ${mode.accent} border-2 border-cocoa flex items-center justify-center shadow-sticker`}
                            >
                              <IconComponent className="w-5 h-5 text-cocoa" />
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-cream-paper border border-cocoa text-cocoa">
                              {mode.badge}
                            </span>
                          </div>

                          <h3 className="font-heading text-base sm:text-lg font-bold text-cocoa mb-1.5">
                            {mode.title}
                          </h3>

                          <p className="text-xs sm:text-sm font-semibold text-cocoa-light leading-relaxed">
                            {mode.description}
                          </p>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-cocoa/15 flex items-center justify-between text-[11px] font-extrabold text-cocoa">
                          <span>LIVE STATUS</span>
                          <span className="inline-flex items-center gap-1 text-green-800">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {isActive ? 'VERIFIED ACTIVE' : 'STANDBY'}
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  key="awards-grid"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="paper-card rounded-3xl p-5 sm:p-6 bg-cream-paper"
                >
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-dashed border-cocoa/20">
                    <div className="w-10 h-10 rounded-2xl bg-sunshine border-2 border-cocoa flex items-center justify-center shadow-sticker">
                      <Award className="w-5 h-5 text-cocoa" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg sm:text-xl font-bold text-cocoa">
                        THE NIKAM HOUSEHOLD HALL OF FAME
                      </h3>
                      <p className="text-xs font-bold text-cocoa-light">
                        Playful fictional awards voted unanimously at home!
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {fictionalAwards.map((award) => (
                      <div
                        key={award.title}
                        className="p-3.5 rounded-2xl bg-cream border-2 border-cocoa/25 flex items-start gap-3"
                      >
                        <span className="text-2xl sm:text-3xl select-none" aria-hidden="true">
                          {award.emoji}
                        </span>
                        <div>
                          <h4 className="font-heading text-sm sm:text-base font-bold text-cocoa">
                            {award.title}
                          </h4>
                          <p className="text-xs font-semibold text-cocoa-light mt-1 leading-relaxed">
                            {award.subtitle}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chapter 2 Bottom Continue CTA */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-cream-paper border-2 border-cocoa/25">
              <div className="text-xs sm:text-sm font-bold text-cocoa-light">
                {activeTab === 'modes' ? (
                  <button
                    type="button"
                    onClick={() => setActiveTab('awards')}
                    className="underline decoration-blush-deep decoration-2 font-extrabold text-cocoa cursor-pointer"
                  >
                    Don&apos;t forget to check her 4 Playful Family Awards 🏆
                  </button>
                ) : (
                  <span>Ready for Chapter 03?</span>
                )}
              </div>

              <button
                type="button"
                onClick={onNext}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-sunshine hover:bg-sunshine-deep text-cocoa font-heading font-bold text-sm sm:text-base border-2 border-cocoa shadow-sticker cursor-pointer transition-all"
              >
                <span>NEXT: DISCOVER HER WORLD →</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
