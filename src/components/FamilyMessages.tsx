import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Edit3, Check, RotateCcw, ArrowRight } from 'lucide-react';
import { familyMessages } from '../data/messages';
import { getPhotoById } from '../data/photos';

interface FamilyMessagesProps {
  onNext: () => void;
}

export const FamilyMessages: React.FC<FamilyMessagesProps> = ({ onNext }) => {
  const defaultPapaText = familyMessages[0].paragraphs.join('\n\n');
  const [papaText, setPapaText] = useState<string>(() => {
    try {
      return localStorage.getItem('nisha_papa_message') || defaultPapaText;
    } catch {
      return defaultPapaText;
    }
  });
  const [isEditingPapa, setIsEditingPapa] = useState(false);

  const handleSavePapa = () => {
    try {
      localStorage.setItem('nisha_papa_message', papaText);
    } catch {
      // ignore storage errors
    }
    setIsEditingPapa(false);
  };

  const handleResetPapa = () => {
    setPapaText(defaultPapaText);
    try {
      localStorage.removeItem('nisha_papa_message');
    } catch {
      // ignore
    }
    setIsEditingPapa(false);
  };

  const papaPhoto = getPhotoById('photo-028');
  const sonPhoto = getPhotoById('photo-029');
  const trioPhoto = getPhotoById('photo-033');
  const babyPhoto = getPhotoById('photo-040');
  const chaiPhoto = getPhotoById('photo-031');

  return (
    <section
      aria-label="Chapter 06: Made With Love, From Our Family"
      className="h-full w-full overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Chapter Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-peach border-2 border-cocoa shadow-sticker mb-3">
            <Heart className="w-3.5 h-3.5 text-cocoa fill-blush-deep" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-cocoa">
              CHAPTER 06 / 08 • MADE WITH LOVE, FROM OUR FAMILY
            </span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-cocoa tracking-tight mb-2">
            OUR FAMILY. OUR MEMORIES. OUR LOVE.
          </h2>

          <p className="text-sm sm:text-base font-bold text-cocoa-light">
            Two heartfelt birthday notes from the two people whose world revolves around you.
          </p>
        </div>

        {/* Two Message Cards: FROM PAPA & FROM YOUR SON */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Card 1: FROM PAPA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="paper-card rounded-3xl p-5 sm:p-6 bg-cream-paper relative flex flex-col justify-between"
          >
            <div className="washi-tape washi-tape-blue -top-3 left-10" />

            <div>
              <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b-2 border-dashed border-cocoa/20">
                <div className="flex items-center gap-3">
                  {papaPhoto && (
                    <img
                      src={papaPhoto.src}
                      alt={papaPhoto.description}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-cocoa shadow-sm"
                    />
                  )}
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-skyblue border border-cocoa text-cocoa">
                      {familyMessages[0].marathiBadge}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-cocoa mt-0.5">
                      {familyMessages[0].senderTitle}
                    </h3>
                    <p className="text-xs font-bold text-cocoa-light">
                      {familyMessages[0].senderSubtitle}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => (isEditingPapa ? handleSavePapa() : setIsEditingPapa(true))}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-extrabold bg-cream border-2 border-cocoa/30 hover:border-cocoa text-cocoa cursor-pointer transition-colors"
                  title="Papa can review or customise this message"
                >
                  {isEditingPapa ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-700" />
                      <span>Save</span>
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </>
                  )}
                </button>
              </div>

              {isEditingPapa ? (
                <div className="space-y-2.5">
                  <label
                    htmlFor="papa-message-editor"
                    className="block text-xs font-extrabold text-cocoa-light"
                  >
                    Review or edit Papa&apos;s birthday message below:
                  </label>
                  <textarea
                    id="papa-message-editor"
                    rows={5}
                    value={papaText}
                    onChange={(e) => setPapaText(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-cream border-2 border-cocoa text-sm sm:text-base font-semibold text-cocoa focus:outline-none"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSavePapa}
                      className="px-3.5 py-1.5 rounded-xl bg-sunshine border-2 border-cocoa text-xs font-extrabold text-cocoa shadow-sticker cursor-pointer"
                    >
                      Save Message
                    </button>
                    <button
                      type="button"
                      onClick={handleResetPapa}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cream border border-cocoa/40 text-xs font-bold text-cocoa-light cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset Default
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-sm sm:text-base font-semibold text-cocoa leading-relaxed">
                  {papaText.split('\n\n').map((para, i) => (
                    <p
                      key={i}
                      className={
                        i === 0 ? 'font-handwritten text-xl sm:text-2xl font-bold' : ''
                      }
                    >
                      {para}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-cocoa/15 flex items-center justify-between">
              <span className="text-xs font-bold text-cocoa-light">With love &amp; pride</span>
              <span className="font-handwritten text-xl sm:text-2xl font-bold text-cocoa">
                — Papa ❤️
              </span>
            </div>
          </motion.div>

          {/* Card 2: FROM YOUR SON */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="paper-card rounded-3xl p-5 sm:p-6 bg-cream-paper relative flex flex-col justify-between"
          >
            <div className="washi-tape washi-tape-pink -top-3 right-10" />

            <div>
              <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-dashed border-cocoa/20">
                {sonPhoto && (
                  <img
                    src={sonPhoto.src}
                    alt={sonPhoto.description}
                    className="w-14 h-14 rounded-2xl object-cover object-top border-2 border-cocoa shadow-sm"
                  />
                )}
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blush border border-cocoa text-cocoa">
                    {familyMessages[1].marathiBadge}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-cocoa mt-0.5">
                    {familyMessages[1].senderTitle}
                  </h3>
                  <p className="text-xs font-bold text-cocoa-light">
                    {familyMessages[1].senderSubtitle}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm sm:text-base font-semibold text-cocoa leading-relaxed">
                {familyMessages[1].paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className={
                      i === 0 ? 'font-handwritten text-xl sm:text-2xl font-bold' : ''
                    }
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-cocoa/15 flex items-center justify-between">
              <span className="text-xs font-bold text-cocoa-light">Always in my heart</span>
              <span className="font-handwritten text-xl sm:text-2xl font-bold text-cocoa">
                — Shriraj ❤️
              </span>
            </div>
          </motion.div>
        </div>

        {/* Mini Family Scrapbook Strip + Next Chapter CTA */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[trioPhoto, babyPhoto, chaiPhoto].map(
            (photo) =>
              photo && (
                <div
                  key={photo.id}
                  className="paper-card rounded-2xl p-2.5 pb-3.5 bg-cream-paper"
                >
                  <div className="aspect-[4/3] max-h-[160px] w-full rounded-xl overflow-hidden border border-cocoa/20 mb-2">
                    <img
                      src={photo.src}
                      alt={photo.description}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                  <p className="font-handwritten text-lg font-bold text-center text-cocoa">
                    {photo.caption}
                  </p>
                </div>
              )
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={onNext}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-sunshine hover:bg-sunshine-deep text-cocoa font-heading font-bold text-sm sm:text-base border-2 border-cocoa shadow-sticker cursor-pointer transition-all"
          >
            <span>NEXT: IT&apos;S CAKE TIME →</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
