import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MailOpen, Heart, ChevronDown, Sparkles } from 'lucide-react';
import { letterEnvelopes, LetterEnvelopeItem } from '../data/messages';

const colorMap: Record<LetterEnvelopeItem['envelopeColor'], { bg: string; flap: string; pill: string }> = {
  blush: {
    bg: 'bg-blush-light',
    flap: 'bg-blush',
    pill: 'bg-blush text-cocoa',
  },
  sunshine: {
    bg: 'bg-sunshine-soft',
    flap: 'bg-sunshine',
    pill: 'bg-sunshine text-cocoa',
  },
  skyblue: {
    bg: 'bg-skyblue-soft',
    flap: 'bg-skyblue',
    pill: 'bg-skyblue text-cocoa',
  },
  peach: {
    bg: 'bg-peach-light',
    flap: 'bg-peach',
    pill: 'bg-peach text-cocoa',
  },
};

export const LetterEnvelopes: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['envelope-1']);

  const toggleEnvelope = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const openAll = () => {
    setOpenIds(letterEnvelopes.map((e) => e.id));
  };

  const closeAll = () => {
    setOpenIds([]);
  };

  return (
    <section
      id="letters"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cream via-blush-soft/50 to-cream border-y-2 border-cocoa/15 relative z-10"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blush border-2 border-cocoa shadow-sticker mb-4">
            <Mail className="w-4 h-4 text-cocoa" />
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-cocoa">
              Section 05 • Things I Don&apos;t Say Enough
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-cocoa tracking-tight mb-4">
            DEAR MUMMA, THERE ARE THINGS I DON&apos;T SAY ENOUGH...
          </h2>

          <p className="text-base sm:text-lg font-bold text-cocoa-light max-w-2xl mx-auto mb-6">
            Five personal letters sealed with love. Tap any envelope below to break the wax seal and read what&apos;s inside.
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={openAll}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold bg-cream-paper border-2 border-cocoa shadow-sticker hover:bg-sunshine transition-colors cursor-pointer"
            >
              Open All 5 Envelopes
            </button>
            <button
              type="button"
              onClick={closeAll}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold bg-cream-paper border-2 border-cocoa/40 text-cocoa-light hover:border-cocoa transition-colors cursor-pointer"
            >
              Fold All
            </button>
          </div>
        </div>

        {/* Envelopes Stack */}
        <div className="space-y-6">
          {letterEnvelopes.map((env) => {
            const isOpen = openIds.includes(env.id);
            const palette = colorMap[env.envelopeColor];

            return (
              <div
                key={env.id}
                className={`paper-card rounded-3xl overflow-hidden transition-all duration-300 ${palette.bg}`}
              >
                {/* Envelope Header Button */}
                <button
                  type="button"
                  onClick={() => toggleEnvelope(env.id)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-7 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-white/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Wax Seal / Stamp Icon */}
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${palette.flap} border-2 border-cocoa shadow-sticker flex items-center justify-center shrink-0 text-2xl`}
                    >
                      {isOpen ? <MailOpen className="w-6 h-6 text-cocoa" /> : <span>{env.stampEmoji}</span>}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-cream-paper border border-cocoa text-cocoa">
                          ENVELOPE 0{env.number}
                        </span>
                        <span className="font-marathi text-sm sm:text-base font-bold text-cocoa-light">
                          {env.marathiTag}
                        </span>
                      </div>

                      <h3 className="font-heading text-lg sm:text-2xl font-bold text-cocoa">
                        {env.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="hidden sm:inline-block text-xs font-extrabold uppercase tracking-wider text-cocoa-light">
                      {isOpen ? 'Close Letter' : 'Open Letter'}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-full bg-cream-paper border-2 border-cocoa flex items-center justify-center transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-sunshine' : ''
                      }`}
                    >
                      <ChevronDown className="w-5 h-5 text-cocoa" />
                    </div>
                  </div>
                </button>

                {/* Expandable Letter Paper Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-5 sm:px-7 sm:pb-7">
                        <div className="paper-lined rounded-2xl p-6 sm:p-8 border-2 border-cocoa/30 shadow-inner relative bg-cream-paper">
                          {/* Top Corner Stamp */}
                          <div className="hidden sm:flex items-center gap-1.5 absolute top-4 right-5 px-3 py-1 rounded-full bg-sunshine-soft border border-cocoa/20 text-xs font-bold text-cocoa">
                            <Sparkles className="w-3.5 h-3.5 text-sunshine-deep" />
                            <span>Air Mail • Vellore → Home</span>
                          </div>

                          <div className="space-y-4 text-base sm:text-lg font-semibold text-cocoa leading-relaxed">
                            {env.paragraphs.map((para, i) => (
                              <p
                                key={i}
                                className={
                                  i === 0 && env.number === 5
                                    ? 'font-handwritten text-2xl sm:text-3xl font-bold text-cocoa'
                                    : ''
                                }
                              >
                                {para}
                              </p>
                            ))}
                          </div>

                          {env.marathiClosing && (
                            <div className="mt-6 p-4 rounded-2xl bg-blush-soft/70 border-2 border-blush-deep/30">
                              <p className="font-marathi text-lg sm:text-2xl font-bold text-cocoa leading-relaxed">
                                {env.marathiClosing}
                              </p>
                            </div>
                          )}

                          {env.signOff && (
                            <div className="mt-6 pt-4 border-t border-cocoa/15 flex items-center justify-between">
                              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-cocoa-light">
                                <Heart className="w-4 h-4 fill-blush-deep text-cocoa" />
                                Written for 9 November 2026
                              </span>
                              <p className="font-handwritten text-2xl sm:text-3xl font-bold text-cocoa">
                                {env.signOff}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
