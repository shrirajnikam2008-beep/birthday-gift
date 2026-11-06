import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Sparkles,
  Maximize2,
  Calendar,
  Heart,
  ArrowLeftRight,
  LayoutGrid,
} from 'lucide-react';
import { galleryPhotos, museumCategories, PhotoItem } from '../data/photos';
import { PhotoLightbox } from './PhotoLightbox';
import { ThenVsNow } from './ThenVsNow';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const MemoryMuseum: React.FC = () => {
  const [activeView, setActiveView] = useState<'stream' | 'then-vs-now'>('stream');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();

  const filteredPhotos: PhotoItem[] = useMemo(() => {
    const list =
      selectedCategory === 'all'
        ? galleryPhotos
        : galleryPhotos.filter((p) => p.museumCategory === selectedCategory);

    return [...list].sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return b.priority - a.priority;
    });
  }, [selectedCategory]);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleLightboxPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const handleLightboxNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
  };

  // Washi tape color cyclical rotation for charming scrapbook variation
  const getWashiTapeClass = (idx: number) => {
    const tapes = ['washi-tape-pink', 'washi-tape-blue', 'washi-tape-gold', 'washi-tape-green'];
    return tapes[idx % tapes.length];
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Chapter 04 Header Banner */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sunshine border-2 border-cocoa shadow-sticker mb-2.5">
          <Camera className="w-3.5 h-3.5 text-cocoa" />
          <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-cocoa">
            CHAPTER 04 • THE NISHA MEMORY MUSEUM
          </span>
        </div>

        <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-cocoa tracking-tight">
          A THOUSAND PICTURES. A MILLION FEELINGS.
        </h2>

        <p className="text-xs sm:text-sm md:text-base font-bold text-cocoa-light mt-1.5 max-w-2xl mx-auto">
          Every cherished memory pops into focus as you scroll down. Two big memories per view,
          bright, vibrant and overflowing with our family&apos;s love.
        </p>

        <p className="font-marathi text-sm sm:text-base font-bold text-cocoa mt-2">
          &ldquo;प्रत्येक फोटोमागे एक गोड आठवण आणि आपल्या कुटुंबाचं प्रेम दडलेलं आहे ❤️&rdquo;
        </p>
      </div>

      {/* Top Controls: Mode Switcher & Category Filters */}
      <div className="sticky top-14 sm:top-16 z-30 bg-cream/95 backdrop-blur-md py-3 mb-8 border-y border-cocoa/15 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: View Mode Toggle */}
        <div className="flex items-center gap-1.5 bg-cream-warm p-1 rounded-2xl border-2 border-cocoa shadow-sm shrink-0">
          <button
            type="button"
            onClick={() => setActiveView('stream')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeView === 'stream'
                ? 'bg-sunshine text-cocoa shadow-sticker font-black'
                : 'text-cocoa-light hover:text-cocoa'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Two per View ({galleryPhotos.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('then-vs-now')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeView === 'then-vs-now'
                ? 'bg-blush text-cocoa shadow-sticker font-black'
                : 'text-cocoa-light hover:text-cocoa'
            }`}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Then vs Now</span>
          </button>
        </div>

        {/* Right: Museum Category Filter Pills */}
        {activeView === 'stream' && (
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {museumCategories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? galleryPhotos.length
                  : galleryPhotos.filter((p) => p.museumCategory === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-xs font-extrabold border-2 border-cocoa transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-sunshine text-cocoa shadow-sticker -translate-y-0.5'
                      : 'bg-cream-paper text-cocoa-light hover:bg-sunshine-soft hover:text-cocoa'
                  }`}
                >
                  <span>{cat.emoji}</span>
                  <span className="truncate max-w-[120px] sm:max-w-none">{cat.label}</span>
                  <span className="text-[10px] font-black opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {activeView === 'then-vs-now' ? (
        <div className="py-4">
          <ThenVsNow />
        </div>
      ) : (
        /* =========================================================================
           SCROLL-DRIVEN MEMORY FLASHBACK STREAM (TWO LARGE IMAGES PER VIEW)
           ========================================================================= */
        <div>
          {/* Active Category Meta Bar */}
          <div className="flex items-center justify-between mb-4 px-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-cocoa-light flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sunshine-deep" />
              Showing {filteredPhotos.length} Memories • Scroll down to experience each flashback
            </span>
            <span className="text-xs font-bold text-cocoa-light hidden sm:inline">
              Tap any photo for high-res view
            </span>
          </div>

          {/* 2-Images-Per-View Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={
                    reducedMotion
                      ? { opacity: 1 }
                      : {
                          opacity: 0,
                          y: 45,
                          scale: 0.92,
                          filter: 'brightness(1.28) blur(6px)',
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'brightness(1) blur(0px)',
                  }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{
                    duration: reducedMotion ? 0.05 : 0.65,
                    delay: (index % 2) * 0.12,
                    ease: [0.22, 1, 0.36, 1], // Buttery smooth spring pop
                  }}
                  className="group relative bg-cream-paper rounded-3xl p-4 sm:p-5 pb-5 border-3 border-cocoa shadow-scrapbook hover:shadow-polaroid hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                  style={{ borderWidth: '3px' }}
                >
                  {/* Washi Tape Accent */}
                  <div
                    className={`washi-tape ${getWashiTapeClass(
                      index
                    )} -top-2.5 left-1/2 -translate-x-1/2 scale-85 opacity-90`}
                  />

                  {/* Golden Camera Flash / Memory Bloom Entrance Overlay */}
                  {!reducedMotion && (
                    <motion.div
                      initial={{ opacity: 0.55 }}
                      whileInView={{ opacity: 0 }}
                      viewport={{ once: true, amount: 0.18 }}
                      transition={{ duration: 0.65, ease: 'easeOut', delay: (index % 2) * 0.12 }}
                      className="absolute inset-0 bg-radial from-sunshine/40 via-blush/20 to-transparent pointer-events-none rounded-3xl z-10"
                    />
                  )}

                  {/* Big Photo Container (h-80 sm:h-96 md:h-[460px] lg:h-[500px] xl:h-[520px]) */}
                  <div
                    onClick={() => handleOpenLightbox(index)}
                    className="w-full h-80 sm:h-96 md:h-[460px] lg:h-[500px] xl:h-[520px] rounded-2xl overflow-hidden border-2 border-cocoa/20 bg-cream-warm flex items-center justify-center cursor-pointer relative group-hover:border-cocoa transition-colors shadow-inner"
                  >
                    <img
                      src={photo.src}
                      alt={photo.caption || photo.description}
                      loading="lazy"
                      className="w-full h-full object-contain p-1.5 group-hover:scale-102 transition-transform duration-300 block"
                    />

                    {/* Hover Overlay with Zoom Icon */}
                    <div className="absolute inset-0 bg-cocoa/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="px-3.5 py-1.5 rounded-full bg-cream-paper border-2 border-cocoa shadow-sticker text-xs font-extrabold text-cocoa flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Tap for Full View</span>
                      </span>
                    </div>

                    {/* Date Badge */}
                    {photo.date && (
                      <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-cream-paper/95 backdrop-blur-xs border border-cocoa/30 text-xs font-extrabold text-cocoa flex items-center gap-1.5 shadow-sm">
                        <Calendar className="w-3 h-3 text-cocoa-light" />
                        <span>{photo.date}</span>
                      </span>
                    )}

                    {/* Photo Number Tag */}
                    <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-cream-paper/90 border border-cocoa/30 text-xs font-black text-cocoa/60 shadow-xs">
                      #{photo.id.replace('photo-', '')}
                    </span>

                    {/* Category Tag Badge */}
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-sunshine/90 border border-cocoa/30 text-[10px] font-black uppercase tracking-wider text-cocoa shadow-xs">
                      {photo.familyCategory || photo.museumCategory}
                    </span>
                  </div>

                  {/* Card Caption & Meta */}
                  <div className="mt-3.5 sm:mt-4 flex flex-col flex-1 justify-between">
                    <div>
                      <p className="font-handwritten text-xl sm:text-2xl md:text-3xl font-bold text-cocoa leading-snug">
                        {photo.caption || photo.description}
                      </p>

                      {photo.description && photo.caption !== photo.description && (
                        <p className="text-xs sm:text-sm font-semibold text-cocoa-light mt-1">
                          {photo.description}
                        </p>
                      )}
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="mt-3.5 pt-2.5 border-t border-dashed border-cocoa/20 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleOpenLightbox(index)}
                        className="text-xs font-extrabold text-cocoa hover:text-blush-deep inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-sunshine-deep" />
                        <span>View high-res photo</span>
                      </button>
                      <Heart className="w-4 h-4 text-cocoa/30 group-hover:text-blush-deep group-hover:fill-blush-deep transition-colors" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* End of Gallery Loving Note */}
          <div className="mt-12 p-5 rounded-3xl bg-sunshine-soft/60 border-2 border-cocoa/30 max-w-xl mx-auto text-center">
            <p className="font-marathi text-base font-bold text-cocoa">
              &ldquo;सर्व ४४ आठवणी येथे सुरक्षित आहेत. प्रत्येक फोटोमध्ये आपल्या कुटुंबाचं प्रेम आहे! ❤️&rdquo;
            </p>
            <p className="text-xs sm:text-sm font-bold text-cocoa-light mt-1.5">
              Scroll down for Chapter 05: Five Letters From The Heart ↓
            </p>
          </div>
        </div>
      )}

      {/* Full-screen Lightbox Modal */}
      <PhotoLightbox
        photos={filteredPhotos}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={handleLightboxPrev}
        onNext={handleLightboxNext}
      />
    </div>
  );
};

export default MemoryMuseum;
