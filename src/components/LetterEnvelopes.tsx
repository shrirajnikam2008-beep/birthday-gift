import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  MailOpen,
  Heart,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';
import { letterEnvelopes, LetterEnvelopeItem } from '../data/messages';

interface LetterEnvelopesProps {
  onNext?: () => void;
}

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

export const LetterEnvelopes: React.FC<LetterEnvelopesProps> = ({ onNext }) => {
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

  const markLetterRead = (id: string) => {
    if (!readIds.includes(id)) {
      setReadIds((prev) => [...prev, id]);
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
          Tap any wax-sealed envelope below to jump directly to that letter.
        </p>

        <p className="font-marathi text-sm sm:text-base font-bold text-cocoa mt-2">
          &ldquo;मनातलं काही न बोललेलं... फक्त तुझ्यासाठी लिहिलेली पत्रं 💌&rdquo;
        </p>

        {/* Unsealed Progress Pill */}
        <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream-paper border-2 border-cocoa text-xs font-extrabold text-cocoa shadow-xs">
          <MailOpen className="w-3.5 h-3.5 text-blush-deep" />
          <span>{readIds.length} of 5 Envelopes Unsealed</span>
        </div>
      </div>

      {/* Top Interactive Wax-Sealed Envelope Index Rack */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10 max-w-4xl mx-auto">
        {letterEnvelopes.map((env) => {
          const palette = colorMap[env.envelopeColor];
          const isRead = readIds.includes(env.id);

          return (
            <button
              key={env.id}
              type="button"
              onClick={() => handleEnvelopeClick(env.id, env.number)}
              className={`paper-card-interactive rounded-2xl p-3 text-left cursor-pointer flex flex-col justify-between relative overflow-hidden ${palette.bg} ${
                env.number === 5 ? 'col-span-2 sm:col-span-1' : ''
              }`}
            >
              {/* Subtle Envelope Flap V-line */}
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-cream-paper border border-cocoa text-cocoa">
                  LETTER 0{env.number}
                </span>
                {isRead ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-cocoa fill-sunshine" />
                ) : (
                  <span className="text-[10px] font-extrabold text-cocoa">SEALED</span>
                )}
              </div>

              <div className="my-1.5 flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full wax-seal flex items-center justify-center text-sm shrink-0">
                  <span>{env.stampEmoji}</span>
                </div>
                <div className="min-w-0">
                  <p className="font-heading text-xs font-bold text-cocoa truncate">
                    {env.title}
                  </p>
                  <p className="font-marathi text-[10px] font-bold text-cocoa-light truncate">
                    {env.marathiTag}
                  </p>
                </div>
              </div>

              <div className="text-[10px] font-extrabold text-cocoa/80 flex items-center justify-between mt-1.5 pt-1.5 border-t border-cocoa/15">
                <span>{isRead ? 'Read again' : 'Unseal letter'}</span>
                <ChevronDown className="w-3 h-3" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Continuous 5 Vintage Lined Stationery Letters */}
      <div className="space-y-8 sm:space-y-10 max-w-3xl mx-auto">
        {letterEnvelopes.map((letter) => {
          return (
            <motion.article
              key={letter.id}
              id={`letter-${letter.number}`}
              onViewportEnter={() => markLetterRead(letter.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5 }}
              className="paper-card rounded-3xl overflow-hidden bg-cream-paper relative scroll-mt-24 shadow-polaroid"
              style={{ borderWidth: '3px' }}
            >
              {/* Vintage Air-Mail Top Stripe */}
              <div className="w-full h-2.5 airmail-border border-b-2 border-cocoa" />

              <div className="p-4 sm:p-7 relative">
                {/* Letter Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 mb-4 border-b-2 border-dashed border-cocoa/20">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-full wax-seal flex items-center justify-center text-base shrink-0">
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

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-warm border-2 border-cocoa/30 text-[10px] sm:text-[11px] font-extrabold text-cocoa shrink-0">
                    <Sparkles className="w-3 h-3 text-sunshine-deep" />
                    <span>AIR MAIL • VELLORE → HOME</span>
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
                    <div className="mt-4 p-3 sm:p-4 rounded-xl bg-blush-soft/75 border-2 border-blush-deep/35">
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
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Chapter 05 Next Chapter Bridge CTA */}
      {onNext && (
        <div className="mt-10 sm:mt-12 text-center">
          <button
            type="button"
            onClick={onNext}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-peach hover:bg-peach-deep active:scale-95 text-cocoa font-heading font-bold text-xs sm:text-sm border-2 border-cocoa shadow-sticker hover:shadow-stickerHover hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <span>NEXT: MESSAGES FROM OUR FAMILY (CHAPTER 06)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};
