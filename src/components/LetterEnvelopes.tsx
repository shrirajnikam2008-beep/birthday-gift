import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  MailOpen,
  Heart,
  Sparkles,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { letterEnvelopes, LetterEnvelopeItem } from '../data/messages';

const colorMap: Record<
  LetterEnvelopeItem['envelopeColor'],
  { bg: string; flap: string; border: string; pill: string }
> = {
  blush: {
    bg: 'bg-blush-light',
    flap: 'bg-blush',
    border: 'border-blush-deep',
    pill: 'bg-blush text-cocoa',
  },
  sunshine: {
    bg: 'bg-sunshine-soft',
    flap: 'bg-sunshine',
    border: 'border-sunshine-deep',
    pill: 'bg-sunshine text-cocoa',
  },
  skyblue: {
    bg: 'bg-skyblue-soft',
    flap: 'bg-skyblue',
    border: 'border-skyblue-deep',
    pill: 'bg-skyblue text-cocoa',
  },
  peach: {
    bg: 'bg-peach-light',
    flap: 'bg-peach',
    border: 'border-peach-deep',
    pill: 'bg-peach text-cocoa',
  },
};

export const LetterEnvelopes: React.FC = () => {
  const [readIds, setReadIds] = useState<string[]>(['envelope-1']);

  const handleEnvelopeClick = (id: string, num: number) => {
    if (!readIds.includes(id)) {
      setReadIds((prev) => [...prev, id]);
    }
    const target = document.getElementById(`letter-${num}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Chapter 05 Header */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blush border-2 border-cocoa shadow-sticker mb-2.5">
          <Mail className="w-3.5 h-3.5 text-cocoa" />
          <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-cocoa">
            CHAPTER 05 • FIVE LETTERS FROM THE HEART
          </span>
        </div>

        <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-cocoa tracking-tight">
          DEAR MUMMA, THINGS I DON&apos;T SAY ENOUGH...
        </h2>

        <p className="text-xs sm:text-sm font-bold text-cocoa-light mt-1.5 max-w-xl mx-auto">
          Written during late nights in Vellore, reflecting on everything you do.
          Scroll down to read all 5 letters, or tap an envelope to jump.
        </p>

        <p className="font-marathi text-sm sm:text-base font-bold text-cocoa mt-2">
          &ldquo;मनातलं काही न बोललेलं... फक्त तुझ्यासाठी लिहिलेली पत्रं 💌&rdquo;
        </p>
      </div>

      {/* Top Interactive Envelope Index Rack */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 mb-10 max-w-4xl mx-auto">
        {letterEnvelopes.map((env) => {
          const palette = colorMap[env.envelopeColor];
          const isRead = readIds.includes(env.id);

          return (
            <button
              key={env.id}
              type="button"
              onClick={() => handleEnvelopeClick(env.id, env.number)}
              className={`paper-card rounded-2xl p-2.5 text-left cursor-pointer transition-all hover:-translate-y-1 hover:shadow-stickerHover flex flex-col justify-between ${palette.bg}`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-cream-paper border border-cocoa text-cocoa">
                  LETTER 0{env.number}
                </span>
                {isRead ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-700" />
                ) : (
                  <span className="text-[9px] font-extrabold text-cocoa">💌</span>
                )}
              </div>

              <div className="my-1 flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-xl ${palette.flap} border border-cocoa flex items-center justify-center text-sm shrink-0`}
                >
                  <span>{env.stampEmoji}</span>
                </div>
                <div className="min-w-0">
                  <p className="font-heading text-[11px] font-bold text-cocoa truncate">
                    {env.title}
                  </p>
                  <p className="font-marathi text-[9px] font-bold text-cocoa-light truncate">
                    {env.marathiTag}
                  </p>
                </div>
              </div>

              <div className="text-[9px] font-extrabold text-cocoa/70 flex items-center justify-between mt-1 pt-1 border-t border-cocoa/10">
                <span>Jump to letter</span>
                <ChevronDown className="w-2.5 h-2.5" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Continuous 5 Vintage Lined Stationery Letters */}
      <div className="space-y-8 sm:space-y-10 max-w-3xl mx-auto">
        {letterEnvelopes.map((letter) => {
          const palette = colorMap[letter.envelopeColor];

          return (
            <motion.article
              key={letter.id}
              id={`letter-${letter.number}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5 }}
              className="paper-card rounded-3xl p-4 sm:p-7 bg-cream-paper relative scroll-mt-24 shadow-polaroid"
              style={{ borderWidth: '3px' }}
            >
              {/* Top Washi Tape & Stamp Decoration */}
              <div
                className={`washi-tape ${
                  letter.number % 2 === 0 ? 'washi-tape-blue' : 'washi-tape-pink'
                } -top-3 left-8 rotate-[-2deg]`}
              />

              {/* Letter Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b-2 border-dashed border-cocoa/20">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-sunshine border-2 border-cocoa flex items-center justify-center text-base shadow-sticker shrink-0">
                    {letter.stampEmoji}
                  </span>
                  <div>
                    <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-cocoa-light">
                      LETTER 0{letter.number} OF 05 • {letter.marathiTag}
                    </span>
                    <h3 className="font-heading text-base sm:text-xl font-bold text-cocoa">
                      {letter.title}
                    </h3>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-skyblue-soft border border-cocoa/30 text-[11px] font-bold text-cocoa shrink-0">
                  <Sparkles className="w-3 h-3 text-skyblue-deep" />
                  <span>Air Mail • Vellore → Home</span>
                </div>
              </div>

              {/* Vintage Lined Letter Body */}
              <div className="paper-lined rounded-2xl p-4 sm:p-6 border-2 border-cocoa/20 bg-cream-paper relative">
                <div className="space-y-3 text-sm sm:text-base font-semibold text-cocoa leading-relaxed">
                  {letter.paragraphs.map((para, i) => (
                    <p
                      key={i}
                      className={
                        i === 0 && letter.number === 5
                          ? 'font-handwritten text-xl sm:text-2xl font-bold text-cocoa'
                          : ''
                      }
                    >
                      {para}
                    </p>
                  ))}
                </div>

                {/* Marathi Closing Note */}
                {letter.marathiClosing && (
                  <div className="mt-4 p-3 sm:p-4 rounded-xl bg-blush-soft/70 border-2 border-blush-deep/30">
                    <p className="font-marathi text-sm sm:text-base font-bold text-cocoa leading-relaxed">
                      {letter.marathiClosing}
                    </p>
                  </div>
                )}

                {/* Handwritten Sign-off */}
                {letter.signOff && (
                  <div className="mt-5 pt-3 border-t border-dashed border-cocoa/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <p className="font-handwritten text-xl sm:text-2xl font-bold text-cocoa">
                      — {letter.signOff}
                    </p>

                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-cocoa-light">
                      <Heart className="w-3 h-3 text-blush-deep fill-blush-deep" />
                      Written with boundless love
                    </span>
                  </div>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
};
