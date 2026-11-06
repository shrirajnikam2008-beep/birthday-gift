import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  MailOpen,
  Heart,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  X,
} from 'lucide-react';
import { letterEnvelopes, LetterEnvelopeItem } from '../data/messages';

interface LetterEnvelopesProps {
  onNext: () => void;
}

const colorMap: Record<
  LetterEnvelopeItem['envelopeColor'],
  { bg: string; flap: string; pill: string }
> = {
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

export const LetterEnvelopes: React.FC<LetterEnvelopesProps> = ({ onNext }) => {
  // Initially all 5 envelopes are sealed (activeLetterId === null)
  const [activeLetterId, setActiveLetterId] = useState<string | null>(null);
  const [readIds, setReadIds] = useState<string[]>([]);

  const activeLetter = letterEnvelopes.find((e) => e.id === activeLetterId) || null;

  const openEnvelope = (id: string) => {
    setActiveLetterId(id);
    if (!readIds.includes(id)) {
      setReadIds((prev) => [...prev, id]);
    }
  };

  const closeLetter = () => {
    setActiveLetterId(null);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeLetterId) {
        closeLetter();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeLetterId]);

  return (
    <section
      aria-label="Chapter 05: Things I Don't Say Enough"
      className="h-full w-full overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 bg-gradient-to-b from-cream via-blush-soft/45 to-cream relative"
    >
      <div className="max-w-5xl mx-auto h-full flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {!activeLetter ? (
            /* COLLECTION VIEW: 5 SEALED ENVELOPES */
            <motion.div
              key="envelope-collection"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.32 }}
              className="my-auto"
            >
              {/* Chapter Header */}
              <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blush border-2 border-cocoa shadow-sticker mb-3">
                  <Mail className="w-3.5 h-3.5 text-cocoa" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-cocoa">
                    CHAPTER 05 / 08 • THINGS I DON&apos;T SAY ENOUGH
                  </span>
                </div>

                <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-cocoa tracking-tight mb-2.5">
                  DEAR MUMMA, THERE ARE THINGS I DON&apos;T SAY ENOUGH...
                </h2>

                <p className="text-sm sm:text-base font-bold text-cocoa-light">
                  Five sealed envelopes waiting for you ({readIds.length} of 5 opened). Tap any envelope below to break the seal and read the letter inside!
                </p>
              </div>

              {/* 5 Sealed Envelopes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-6">
                {letterEnvelopes.map((env, idx) => {
                  const palette = colorMap[env.envelopeColor];
                  const isRead = readIds.includes(env.id);

                  return (
                    <motion.button
                      key={env.id}
                      type="button"
                      onClick={() => openEnvelope(env.id)}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.06 }}
                      whileHover={{ y: -4, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group paper-card rounded-3xl p-5 text-left cursor-pointer transition-all flex flex-col justify-between min-h-[185px] relative overflow-hidden ${
                        palette.bg
                      } ${idx === 4 ? 'sm:col-span-2 lg:col-span-2' : ''}`}
                    >
                      {/* Top Envelope Flap Line Decoration */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-cream-paper border border-cocoa text-cocoa">
                          ENVELOPE 0{env.number}
                        </span>

                        {isRead ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-cream-paper border border-cocoa text-green-800">
                            <CheckCircle2 className="w-3 h-3" />
                            Opened
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-sunshine border border-cocoa text-cocoa">
                            Sealed 💌
                          </span>
                        )}
                      </div>

                      {/* Center Wax Seal Stamp & Title */}
                      <div className="my-2 flex items-center gap-3.5">
                        <div
                          className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl ${palette.flap} border-2 border-cocoa shadow-sticker flex items-center justify-center text-2xl shrink-0 group-hover:rotate-6 transition-transform`}
                        >
                          {isRead ? (
                            <MailOpen className="w-6 h-6 text-cocoa" />
                          ) : (
                            <span>{env.stampEmoji}</span>
                          )}
                        </div>

                        <div>
                          <p className="font-marathi text-sm font-bold text-cocoa-light">
                            {env.marathiTag}
                          </p>
                          <h3 className="font-heading text-base sm:text-xl font-bold text-cocoa leading-snug mt-0.5">
                            {env.title}
                          </h3>
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-cocoa/15 flex items-center justify-between text-xs font-extrabold text-cocoa">
                        <span>Tap to open &amp; read letter</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Optional Continue Strip (Never forces opening all letters) */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={onNext}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-sunshine hover:bg-sunshine-deep text-cocoa font-heading font-bold text-sm sm:text-base border-2 border-cocoa shadow-sticker cursor-pointer transition-all"
                >
                  <span>NEXT: A MESSAGE FROM OUR FAMILY →</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ) : (
            /* UNFOLDED LETTER VIEW */
            <motion.div
              key={activeLetter.id}
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -16 }}
              transition={{ duration: 0.32 }}
              className="max-w-3xl mx-auto w-full my-auto"
            >
              <div className="paper-card rounded-3xl p-4 sm:p-7 bg-cream-paper relative">
                {/* Top Controls inside Letter Modal */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b-2 border-dashed border-cocoa/20">
                  <button
                    type="button"
                    onClick={closeLetter}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cream hover:bg-sunshine-soft text-cocoa font-heading font-bold text-xs sm:text-sm border-2 border-cocoa shadow-sticker cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to All 5 Envelopes</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blush border border-cocoa text-cocoa">
                      LETTER 0{activeLetter.number} OF 05
                    </span>
                    <button
                      type="button"
                      onClick={closeLetter}
                      aria-label="Close letter"
                      className="p-1.5 rounded-full bg-cream border-2 border-cocoa text-cocoa hover:bg-blush cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Lined Letter Paper */}
                <div className="paper-lined rounded-2xl p-5 sm:p-8 border-2 border-cocoa/25 shadow-inner relative bg-cream-paper">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div>
                      <span className="font-marathi text-sm sm:text-base font-bold text-cocoa-light">
                        {activeLetter.marathiTag}
                      </span>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-cocoa">
                        {activeLetter.title}
                      </h3>
                    </div>

                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-sunshine-soft border border-cocoa/20 text-xs font-bold text-cocoa">
                      <Sparkles className="w-3.5 h-3.5 text-sunshine-deep" />
                      <span>Air Mail • Vellore → Home</span>
                    </div>
                  </div>

                  <div className="space-y-3.5 text-sm sm:text-lg font-semibold text-cocoa leading-relaxed">
                    {activeLetter.paragraphs.map((para, i) => (
                      <p
                        key={i}
                        className={
                          i === 0 && activeLetter.number === 5
                            ? 'font-handwritten text-2xl sm:text-3xl font-bold text-cocoa'
                            : ''
                        }
                      >
                        {para}
                      </p>
                    ))}
                  </div>

                  {activeLetter.marathiClosing && (
                    <div className="mt-5 p-3.5 sm:p-4 rounded-2xl bg-blush-soft/70 border-2 border-blush-deep/30">
                      <p className="font-marathi text-base sm:text-2xl font-bold text-cocoa leading-relaxed">
                        {activeLetter.marathiClosing}
                      </p>
                    </div>
                  )}

                  {activeLetter.signOff && (
                    <div className="mt-5 pt-3.5 border-t border-cocoa/15 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-cocoa-light">
                        <Heart className="w-3.5 h-3.5 fill-blush-deep text-cocoa" />
                        9 November 2026
                      </span>
                      <p className="font-handwritten text-2xl sm:text-3xl font-bold text-cocoa">
                        {activeLetter.signOff}
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom Letter Controls */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={closeLetter}
                    className="px-4 py-2 rounded-xl bg-sunshine hover:bg-sunshine-deep text-cocoa font-heading font-bold text-xs sm:text-sm border-2 border-cocoa shadow-sticker cursor-pointer"
                  >
                    Close Letter &amp; Return to Envelopes
                  </button>

                  {activeLetter.number < 5 ? (
                    <button
                      type="button"
                      onClick={() =>
                        openEnvelope(`envelope-${activeLetter.number + 1}`)
                      }
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blush hover:bg-blush-deep text-cocoa font-heading font-bold text-xs sm:text-sm border-2 border-cocoa shadow-sticker cursor-pointer"
                    >
                      <span>Open Envelope 0{activeLetter.number + 1}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={onNext}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blush hover:bg-blush-deep text-cocoa font-heading font-bold text-xs sm:text-sm border-2 border-cocoa shadow-sticker cursor-pointer"
                    >
                      <span>NEXT: A MESSAGE FROM OUR FAMILY →</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
