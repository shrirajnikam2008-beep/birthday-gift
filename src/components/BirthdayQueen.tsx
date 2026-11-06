import React from 'react';
import { motion } from 'framer-motion';
import { Crown, BookOpen, Microscope, HeartHandshake, ShieldAlert, Award, Sparkles } from 'lucide-react';
import { getPhotoById } from '../data/photos';

const personalityModes = [
  {
    title: 'PROFESSOR MODE: ON',
    badge: 'Active Daily',
    description: 'Explaining concepts with crystal clarity, inspiring students, and commanding respect effortlessly.',
    icon: BookOpen,
    bg: 'bg-skyblue-soft',
    accent: 'bg-skyblue',
  },
  {
    title: 'RESEARCH MODE: ON',
    badge: 'Deep Focus',
    description: 'Always curious, reading, analysing, and pushing forward towards the next academic milestone.',
    icon: Microscope,
    bg: 'bg-sunshine-soft',
    accent: 'bg-sunshine',
  },
  {
    title: 'MUMMA MODE: ALWAYS ON',
    badge: '24 / 7 / 365',
    description: 'Knowing when someone is hungry, tired, or stressed before they even say a single word.',
    icon: HeartHandshake,
    bg: 'bg-blush-soft',
    accent: 'bg-blush',
  },
  {
    title: 'STRICT MODE: EXTREMELY DANGEROUS',
    badge: 'Proceed With Caution ⚠️',
    description: 'One silent look is enough to restore complete law, order, and discipline across the entire room!',
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

export const BirthdayQueen: React.FC = () => {
  const riderPhoto = getPhotoById('photo-025'); // Royal Enfield motorcycle photo!
  const sunglassesPhoto = getPhotoById('photo-010');
  const boatPhoto = getPhotoById('photo-034');

  return (
    <section
      id="queen"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blush border-2 border-cocoa shadow-sticker mb-4">
          <Crown className="w-4 h-4 text-cocoa" />
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-cocoa">
            Section 02 • Meet The Birthday Queen
          </span>
        </div>

        <h2 className="font-heading text-3xl sm:text-5xl font-bold text-cocoa tracking-tight mb-5">
          THE WOMAN. THE LEGEND. THE MUMMA.
        </h2>

        <p className="text-base sm:text-xl font-bold text-cocoa-light leading-relaxed mb-6">
          &ldquo;A woman with a brilliant mind, a heart full of love, ambitions bigger than her to-do list, and the authority to silence an entire room with one look.&rdquo;
        </p>

        {/* Marathi Quote Banner */}
        <div className="paper-card rounded-2xl p-4 sm:p-5 bg-sunshine-soft inline-block max-w-2xl">
          <p className="font-marathi text-lg sm:text-2xl font-bold text-cocoa leading-relaxed">
            &ldquo;कधी प्रेमाने समजावणारी, कधी रागावणारी, पण प्रत्येक वेळी आपल्या माणसांसाठी मनापासून उभी राहणारी.&rdquo;
          </p>
        </div>
      </div>

      {/* Main Content Grid: 4 Personality Cards + Real Photographs Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-16">
        {/* Left 7 Cols: 4 Animated Personality Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {personalityModes.map((mode, idx) => {
            const IconComponent = mode.icon;
            return (
              <motion.div
                key={mode.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className={`paper-card rounded-3xl p-5 sm:p-6 ${mode.bg} flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className={`w-11 h-11 rounded-2xl ${mode.accent} border-2 border-cocoa flex items-center justify-center shadow-sticker`}>
                      <IconComponent className="w-5 h-5 text-cocoa" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-cream-paper border border-cocoa text-cocoa">
                      {mode.badge}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg sm:text-xl font-bold text-cocoa mb-2">
                    {mode.title}
                  </h3>

                  <p className="text-sm sm:text-base font-semibold text-cocoa-light leading-relaxed">
                    {mode.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-cocoa/15 flex items-center justify-between text-xs font-extrabold text-cocoa">
                  <span>STATUS</span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-600 animate-ping" />
                    <span>100% VERIFIED</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right 5 Cols: Iconic Real Photo Collage (Royal Enfield + Cool Shades) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {riderPhoto && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="paper-card rounded-3xl p-4 pb-6 bg-cream-paper relative rotate-1 hover:rotate-0 transition-transform"
            >
              <div className="washi-tape -top-3 left-1/2 -translate-x-1/2" />
              <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden border-2 border-cocoa/20 bg-cream-warm">
                <img
                  src={riderPhoto.src}
                  alt={riderPhoto.description}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
              <p className="font-handwritten text-xl sm:text-2xl font-bold text-center text-cocoa mt-3">
                {riderPhoto.caption}
              </p>
            </motion.div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {sunglassesPhoto && (
              <div className="paper-card rounded-2xl p-2.5 pb-4 bg-cream-paper -rotate-2">
                <div className="aspect-[3/4] rounded-xl overflow-hidden border border-cocoa/20">
                  <img
                    src={sunglassesPhoto.src}
                    alt={sunglassesPhoto.description}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="font-handwritten text-base font-bold text-center text-cocoa mt-2">
                  Boss Vibes 😎
                </p>
              </div>
            )}
            {boatPhoto && (
              <div className="paper-card rounded-2xl p-2.5 pb-4 bg-cream-paper rotate-2">
                <div className="aspect-[3/4] rounded-xl overflow-hidden border border-cocoa/20">
                  <img
                    src={boatPhoto.src}
                    alt={boatPhoto.description}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="font-handwritten text-base font-bold text-center text-cocoa mt-2">
                  Unstoppable Spirit 🚤
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Playful Fictional Family Awards Hall of Fame */}
      <div className="paper-card rounded-3xl p-6 sm:p-8 lg:p-10 bg-cream-paper relative">
        <div className="washi-tape washi-tape-pink -top-3 right-10 rotate-3" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-dashed border-cocoa/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sunshine border-2 border-cocoa flex items-center justify-center shadow-sticker">
              <Award className="w-6 h-6 text-cocoa" />
            </div>
            <div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-cocoa">
                THE OFFICIAL NIKAM HOUSEHOLD HONOURS
              </h3>
              <p className="text-xs sm:text-sm font-bold text-cocoa-light flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blush-deep" />
                <span>Playful family-voted honours (100% affectionate &amp; unofficial!)</span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {fictionalAwards.map((award) => (
            <div
              key={award.title}
              className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-cream border-2 border-cocoa/25 hover:border-cocoa transition-colors"
            >
              <span className="text-3xl sm:text-4xl select-none" aria-hidden="true">
                {award.emoji}
              </span>
              <div>
                <h4 className="font-heading text-base sm:text-lg font-bold text-cocoa">
                  {award.title}
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-cocoa-light mt-1 leading-relaxed">
                  {award.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
