import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Edit3, Check, RotateCcw, Sparkles, Star } from 'lucide-react';
import { familyMessages } from '../data/messages';
import { getPhotoById } from '../data/photos';

export const FamilyMessages: React.FC = () => {
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

  const familyCoverPhoto = getPhotoById('photo-005'); // Main family portrait
  const papaPhoto = getPhotoById('photo-028'); // Mumma & Papa beach
  const sonPhoto = getPhotoById('photo-029'); // Mumma & Shriraj 2026 upright
  const highlightPhoto1 = getPhotoById('photo-014'); // Upright family trip
  const highlightPhoto2 = getPhotoById('photo-024'); // Festive family gathering
  const highlightPhoto3 = getPhotoById('photo-031'); // Evening chai together
  const highlightPhoto4 = getPhotoById('photo-040'); // Mumma holding baby Shriraj

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Chapter 06 Header */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-peach border-2 border-cocoa shadow-sticker mb-2">
          <Heart className="w-3.5 h-3.5 text-cocoa fill-blush-deep" />
          <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-cocoa">
            CHAPTER 06 • OUR FAMILY
          </span>
        </div>

        <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-cocoa tracking-tight">
          OUR FAMILY. OUR MEMORIES. OUR LOVE.
        </h2>

        <p className="text-xs sm:text-sm font-bold text-cocoa-light mt-1.5 max-w-xl mx-auto">
          Two heartfelt birthday notes from the two people whose whole world revolves around you.
        </p>

        <p className="font-marathi text-sm sm:text-base font-bold text-cocoa mt-2">
          &ldquo;आपलं कुटुंब, आपलं प्रेम आणि एकत्र घालवलेले अमूल्य क्षण... ❤️&rdquo;
        </p>
      </div>

      {/* Part 1: Central Family Portrait Hero Card */}
      {familyCoverPhoto && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="paper-card rounded-3xl p-5 sm:p-7 bg-cream-paper max-w-4xl mx-auto relative mb-12 sm:mb-16 shadow-polaroid"
          style={{ borderWidth: '3px' }}
        >
          <div className="washi-tape washi-tape-pink -top-2.5 left-1/2 -translate-x-1/2" />

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-7 items-center">
            <div className="sm:col-span-6 w-full h-52 sm:h-64 rounded-2xl overflow-hidden border-2 border-cocoa/20 bg-cream-warm flex items-center justify-center">
              <img
                src={familyCoverPhoto.src}
                alt={familyCoverPhoto.description}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="sm:col-span-6 text-left">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blush border border-cocoa text-xs font-extrabold text-cocoa mb-2.5">
                <Sparkles className="w-3.5 h-3.5" />
                Nikam Family • Together Always
              </span>

              <p className="font-handwritten text-2xl sm:text-3xl font-bold text-cocoa leading-tight mb-2.5">
                {familyCoverPhoto.caption}
              </p>

              <p className="text-xs sm:text-sm font-semibold text-cocoa-light leading-relaxed mb-3.5">
                Ahead are two personal birthday letters written with the deepest love, gratitude, and pride.
              </p>

              <div className="p-3 rounded-2xl bg-sunshine-soft border border-cocoa/20">
                <p className="font-marathi text-xs sm:text-sm font-bold text-cocoa">
                  &ldquo;आपलं घर, आपलं हसणं आणि आपल्या सगळ्या आठवणी तुझाच आधार आहेत ❤️&rdquo;
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Part 2: Two Letters Grid (Papa & Shriraj) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto mb-12 sm:mb-16">
        {/* Papa's Letter */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="paper-card rounded-3xl p-5 sm:p-6 bg-cream-paper relative flex flex-col justify-between shadow-polaroid"
          style={{ borderWidth: '3px' }}
        >
          <div className="washi-tape washi-tape-blue -top-2.5 left-8" />

          <div>
            <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-dashed border-cocoa/20">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-skyblue border border-cocoa text-cocoa">
                  {familyMessages[0].marathiBadge}
                </span>
                <h3 className="font-heading text-base sm:text-lg font-bold text-cocoa mt-0.5">
                  {familyMessages[0].senderTitle}
                </h3>
                <p className="text-xs font-bold text-cocoa-light">
                  {familyMessages[0].senderSubtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => (isEditingPapa ? handleSavePapa() : setIsEditingPapa(true))}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-extrabold bg-cream border border-cocoa text-cocoa cursor-pointer hover:bg-sunshine-soft transition-colors shrink-0 shadow-sm"
                title="Papa can customize this message"
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

            {/* Papa Photo Preview */}
            {papaPhoto && (
              <div className="mb-4 flex items-center gap-3 p-2 rounded-2xl bg-cream-warm border border-cocoa/20">
                <div className="w-16 h-16 rounded-xl overflow-hidden border border-cocoa/30 bg-cream shrink-0 flex items-center justify-center">
                  <img
                    src={papaPhoto.src}
                    alt={papaPhoto.description}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold text-cocoa-light uppercase">
                    Memories together
                  </span>
                  <p className="font-handwritten text-sm font-bold text-cocoa">
                    Mumma &amp; Papa 🌊❤️
                  </p>
                </div>
              </div>
            )}

            {isEditingPapa ? (
              <div className="space-y-2">
                <textarea
                  rows={5}
                  value={papaText}
                  onChange={(e) => setPapaText(e.target.value)}
                  className="w-full p-3 rounded-xl bg-cream border-2 border-cocoa text-xs sm:text-sm font-semibold text-cocoa focus:outline-none"
                />
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSavePapa}
                    className="px-3 py-1.5 rounded-xl bg-sunshine border border-cocoa text-xs font-extrabold text-cocoa shadow-sticker cursor-pointer"
                  >
                    Save Message
                  </button>
                  <button
                    type="button"
                    onClick={handleResetPapa}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cream border border-cocoa/40 text-xs font-bold text-cocoa-light cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-xs sm:text-sm font-semibold text-cocoa leading-relaxed">
                {papaText.split('\n\n').map((para, i) => (
                  <p
                    key={i}
                    className={
                      i === 0 ? 'font-handwritten text-base sm:text-lg font-bold text-cocoa' : ''
                    }
                  >
                    {para}
                  </p>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-cocoa/15 flex items-center justify-between">
            <span className="text-xs font-bold text-cocoa-light">With all my love &amp; respect</span>
            <span className="font-handwritten text-lg sm:text-xl font-bold text-cocoa">
              — Papa ❤️
            </span>
          </div>
        </motion.div>

        {/* Shriraj's Letter */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="paper-card rounded-3xl p-5 sm:p-6 bg-cream-paper relative flex flex-col justify-between shadow-polaroid"
          style={{ borderWidth: '3px' }}
        >
          <div className="washi-tape washi-tape-pink -top-2.5 right-8" />

          <div>
            <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-dashed border-cocoa/20">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blush border border-cocoa text-cocoa">
                  {familyMessages[1].marathiBadge}
                </span>
                <h3 className="font-heading text-base sm:text-lg font-bold text-cocoa mt-0.5">
                  {familyMessages[1].senderTitle}
                </h3>
                <p className="text-xs font-bold text-cocoa-light">
                  {familyMessages[1].senderSubtitle}
                </p>
              </div>
            </div>

            {/* Son Photo Preview */}
            {sonPhoto && (
              <div className="mb-4 flex items-center gap-3 p-2 rounded-2xl bg-cream-warm border border-cocoa/20">
                <div className="w-16 h-16 rounded-xl overflow-hidden border border-cocoa/30 bg-cream shrink-0 flex items-center justify-center">
                  <img
                    src={sonPhoto.src}
                    alt={sonPhoto.description}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold text-cocoa-light uppercase">
                    Mother &amp; Son
                  </span>
                  <p className="font-handwritten text-sm font-bold text-cocoa">
                    Mumma &amp; Shriraj ❤️
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-2 text-xs sm:text-sm font-semibold text-cocoa leading-relaxed">
              {familyMessages[1].paragraphs.map((para, i) => (
                <p
                  key={i}
                  className={
                    i === 0 ? 'font-handwritten text-base sm:text-lg font-bold text-cocoa' : ''
                  }
                >
                  {para}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-cocoa/15 flex items-center justify-between">
            <span className="text-xs font-bold text-cocoa-light">Always your little boy</span>
            <span className="font-handwritten text-lg sm:text-xl font-bold text-cocoa">
              — Shriraj ❤️
            </span>
          </div>
        </motion.div>
      </div>

      {/* Part 3: Precious Family Snapshots */}
      <div>
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sunshine border-2 border-cocoa shadow-sticker mb-2">
            <Star className="w-3.5 h-3.5 text-cocoa fill-sunshine-deep" />
            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-cocoa">
              FAMILY SCRAPBOOK HIGHLIGHTS
            </span>
          </div>

          <h3 className="font-heading text-xl sm:text-3xl font-bold text-cocoa tracking-tight">
            PRECIOUS FAMILY SNAPSHOTS
          </h3>

          <p className="text-xs sm:text-sm font-bold text-cocoa-light mt-1">
            Four cherished moments of warmth, laughter, and togetherness.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {[highlightPhoto1, highlightPhoto2, highlightPhoto3, highlightPhoto4].map(
            (photo, idx) =>
              photo && (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ delay: idx * 0.08 }}
                  className="paper-card rounded-2xl p-2.5 pb-3 bg-cream-paper flex flex-col justify-between hover:-translate-y-1 transition-transform"
                >
                  <div className="w-full h-36 sm:h-44 rounded-xl overflow-hidden border border-cocoa/20 bg-cream-warm mb-2 flex items-center justify-center">
                    <img
                      src={photo.src}
                      alt={photo.description}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <p className="font-handwritten text-xs sm:text-sm font-bold text-center text-cocoa line-clamp-1">
                    {photo.caption}
                  </p>
                </motion.div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default FamilyMessages;
