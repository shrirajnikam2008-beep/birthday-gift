import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Sparkles,
  Maximize2,
  Calendar,
  Star,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  ArrowLeftRight,
} from 'lucide-react';
import { galleryPhotos, museumCategories, getPhotoById } from '../data/photos';
import { PhotoLightbox } from './PhotoLightbox';
import { ThenVsNow } from './ThenVsNow';

interface MemoryMuseumProps {
  onNext: () => void;
}

export const MemoryMuseum: React.FC<MemoryMuseumProps> = ({ onNext }) => {
  const [isAlbumOpen, setIsAlbumOpen] = useState(false);
  const [activeView, setActiveView] = useState<'gallery' | 'then-vs-now'>('gallery');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const coverPhotos = [
    getPhotoById('photo-003'), // Young Shriraj hugging Mumma
    getPhotoById('photo-028'), // Mumma & Papa at beach
    getPhotoById('photo-008'), // Bridal portrait
    getPhotoById('photo-029'), // 2026 Mumma & Shriraj
  ].filter(Boolean);

  const filteredPhotos = useMemo(() => {
    const list =
      selectedCategory === 'all'
        ? galleryPhotos
        : galleryPhotos.filter((p) => p.museumCategory === selectedCategory);

    return [...list].sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return b.priority - a.priority;
    });
  }, [selectedCategory]);

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
  };

  return (
    <section
      aria-label="Chapter 04: The Nisha Memory Museum"
      className="h-full w-full overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative"
    >
      <div className="max-w-7xl mx-auto h-full flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {!isAlbumOpen ? (
            /* STATE 1: BEAUTIFUL HARDCOVER SCRAPBOOK ALBUM COVER */
            <motion.div
              key="album-cover"
              initial={{ opacity: 0, scale: 0.96, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -14 }}
              transition={{ duration: 0.38 }}
              className="max-w-4xl mx-auto w-full my-auto"
            >
              <div className="text-center mb-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sunshine border-2 border-cocoa shadow-sticker mb-2.5">
                  <Camera className="w-3.5 h-3.5 text-cocoa" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-cocoa">
                    CHAPTER 04 / 08 • THE NISHA MEMORY MUSEUM
                  </span>
                </div>
              </div>

              {/* Scrapbook Album Book Cover Card */}
              <div
                className="paper-card rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-cream-paper via-sunshine-soft/60 to-blush-soft/70 border-3 border-cocoa shadow-polaroid relative overflow-hidden"
                style={{ borderWidth: '3px' }}
              >
                {/* Book Spine Accent on Left */}
                <div
                  className="hidden sm:block absolute top-0 bottom-0 left-0 w-7 bg-blush border-r-3 border-cocoa"
                  style={{ borderRightWidth: '3px' }}
                />

                <div className="sm:pl-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                  {/* Cover Text & Open Button */}
                  <div className="lg:col-span-7 text-left">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-paper border border-cocoa text-xs font-extrabold text-cocoa mb-3">
                      <Sparkles className="w-3.5 h-3.5 text-sunshine-deep" />
                      {galleryPhotos.length} Curated Family Photographs + Then vs Now
                    </span>

                    <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-cocoa leading-tight mb-3">
                      A THOUSAND PICTURES. A MILLION FEELINGS.
                    </h2>

                    <p className="text-sm sm:text-base font-bold text-cocoa-light leading-relaxed mb-4">
                      Step inside our personal family photo album — from classic monochrome memories and wedding garlands to seaside sunsets, houseboat trips, and afternoon chai.
                    </p>

                    <p className="font-marathi text-base sm:text-xl font-bold text-cocoa mb-6">
                      &ldquo;प्रत्येक फोटोमागे एक गोड आठवण आणि आपल्या कुटुंबाचं प्रेम दडलेलं आहे ❤️&rdquo;
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setIsAlbumOpen(true)}
                        className="group inline-flex items-center gap-3 px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-sunshine hover:bg-sunshine-deep text-cocoa font-heading font-bold text-base sm:text-lg border-3 border-cocoa shadow-sticker hover:shadow-stickerHover hover:-translate-y-0.5 transition-all cursor-pointer"
                        style={{ borderWidth: '3px' }}
                      >
                        <BookOpen className="w-5 h-5 text-cocoa" />
                        <span>OPEN OUR MEMORY ALBUM</span>
                      </button>

                      <button
                        type="button"
                        onClick={onNext}
                        className="inline-flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-cream-paper hover:bg-blush-light text-cocoa font-heading font-bold text-xs sm:text-sm border-2 border-cocoa/40 hover:border-cocoa transition-all cursor-pointer"
                      >
                        <span>NEXT: SOMETHING FROM MY HEART →</span>
                      </button>
                    </div>
                  </div>

                  {/* Cover 2x2 Polaroid Preview Stack */}
                  <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                    {coverPhotos.map((p, idx) =>
                      p ? (
                        <div
                          key={p.id}
                          onClick={() => setIsAlbumOpen(true)}
                          className={`bg-cream-paper p-2 pb-3 rounded-2xl border-2 border-cocoa shadow-scrapbook cursor-pointer hover:scale-105 transition-transform ${
                            idx % 2 === 0 ? '-rotate-2' : 'rotate-2'
                          }`}
                        >
                          <div className="aspect-square rounded-xl overflow-hidden border border-cocoa/20">
                            <img
                              src={p.src}
                              alt={p.description}
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* STATE 2: FULL-SCREEN INTERACTIVE ALBUM EXPERIENCE */
            <motion.div
              key="album-open"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35 }}
              className="w-full my-auto"
            >
              {/* Top Album Control Bar */}
              <div className="paper-card rounded-3xl p-4 sm:p-5 bg-cream-paper mb-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAlbumOpen(false)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cream hover:bg-sunshine-soft text-cocoa font-heading font-bold text-xs sm:text-sm border-2 border-cocoa shadow-sticker cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Album Cover</span>
                  </button>

                  <div>
                    <h3 className="font-heading text-base sm:text-xl font-bold text-cocoa">
                      THE NISHA MEMORY ALBUM
                    </h3>
                    <p className="text-[11px] sm:text-xs font-bold text-cocoa-light">
                      Click any Polaroid to open full-screen view
                    </p>
                  </div>
                </div>

                {/* Switch between Polaroid Gallery & Then vs Now Slider */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveView('gallery')}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-heading text-xs sm:text-sm font-bold border-2 border-cocoa cursor-pointer transition-colors ${
                      activeView === 'gallery'
                        ? 'bg-sunshine text-cocoa shadow-sticker'
                        : 'bg-cream text-cocoa-light hover:text-cocoa'
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>All Photos ({galleryPhotos.length})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveView('then-vs-now')}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-heading text-xs sm:text-sm font-bold border-2 border-cocoa cursor-pointer transition-colors ${
                      activeView === 'then-vs-now'
                        ? 'bg-blush text-cocoa shadow-sticker'
                        : 'bg-cream text-cocoa-light hover:text-cocoa'
                    }`}
                  >
                    <ArrowLeftRight className="w-3.5 h-3.5" />
                    <span>Then vs Now (3 Pairs)</span>
                  </button>

                  <button
                    type="button"
                    onClick={onNext}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blush hover:bg-blush-deep text-cocoa font-heading font-bold text-xs sm:text-sm border-2 border-cocoa shadow-sticker cursor-pointer transition-colors"
                  >
                    <span>NEXT: SOMETHING FROM MY HEART →</span>
                  </button>
                </div>
              </div>

              {activeView === 'gallery' ? (
                <>
                  {/* Category Filter Pills */}
                  <div
                    className="flex flex-wrap items-center justify-center gap-2 mb-6"
                    role="tablist"
                    aria-label="Memory Museum Categories"
                  >
                    {museumCategories.map((cat) => {
                      const isActive = selectedCategory === cat.id;
                      const count =
                        cat.id === 'all'
                          ? galleryPhotos.length
                          : galleryPhotos.filter((p) => p.museumCategory === cat.id).length;

                      return (
                        <button
                          key={cat.id}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          onClick={() => {
                            setSelectedCategory(cat.id);
                            setLightboxIndex(null);
                          }}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-extrabold border-2 border-cocoa transition-all cursor-pointer ${
                            isActive
                              ? 'bg-blush text-cocoa shadow-sticker -translate-y-0.5'
                              : 'bg-cream-paper text-cocoa hover:bg-sunshine-soft'
                          }`}
                        >
                          <span>{cat.emoji}</span>
                          <span>{cat.label}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] bg-cream border border-cocoa/30">
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Contained Internal Gallery Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 pb-4">
                    {filteredPhotos.map((photo, idx) => (
                      <motion.article
                        key={photo.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => setLightboxIndex(idx)}
                        className="group paper-card rounded-3xl p-3.5 pb-4 bg-cream-paper relative cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-polaroid flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2 px-1">
                            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-cocoa-light">
                              <Sparkles className="w-3 h-3 text-sunshine-deep" />
                              {photo.museumCategory}
                            </span>

                            {photo.featured && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-sunshine border border-cocoa text-cocoa">
                                <Star className="w-2.5 h-2.5 fill-cocoa" />
                                Featured
                              </span>
                            )}
                          </div>

                          <div
                            className={`w-full overflow-hidden rounded-2xl border-2 border-cocoa/20 bg-cream-warm relative ${
                              photo.orientation === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]'
                            }`}
                          >
                            <img
                              src={photo.src}
                              alt={photo.description}
                              loading="lazy"
                              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                            />

                            <div className="absolute bottom-2.5 right-2.5 p-2 rounded-full bg-cream-paper/90 border border-cocoa text-cocoa opacity-85 group-hover:opacity-100 group-hover:bg-sunshine transition-all">
                              <Maximize2 className="w-4 h-4" />
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 text-center px-1">
                          <p className="font-handwritten text-xl sm:text-2xl font-bold text-cocoa leading-snug">
                            {photo.caption}
                          </p>
                          {photo.date && (
                            <p className="inline-flex items-center gap-1 text-xs font-bold text-cocoa-light mt-1">
                              <Calendar className="w-3 h-3" />
                              <span>{photo.date}</span>
                            </p>
                          )}
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </>
              ) : (
                <div className="pb-4">
                  <ThenVsNow />
                </div>
              )}

              {/* Bottom Album Continue Strip */}
              <div className="mt-4 p-4 rounded-2xl bg-cream-paper border-2 border-cocoa/20 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setIsAlbumOpen(false)}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-cocoa hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Close Album Cover</span>
                </button>

                <button
                  type="button"
                  onClick={onNext}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-sunshine hover:bg-sunshine-deep text-cocoa font-heading font-bold text-xs sm:text-sm border-2 border-cocoa shadow-sticker cursor-pointer"
                >
                  <span>NEXT: SOMETHING FROM MY HEART →</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fullscreen Lightbox */}
      <PhotoLightbox
        photos={filteredPhotos}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
};
