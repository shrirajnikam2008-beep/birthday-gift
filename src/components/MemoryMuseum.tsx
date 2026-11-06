import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles, Maximize2, Calendar, Star } from 'lucide-react';
import { galleryPhotos, museumCategories } from '../data/photos';
import { PhotoLightbox } from './PhotoLightbox';
import { ThenVsNow } from './ThenVsNow';

export const MemoryMuseum: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = useMemo(() => {
    const list =
      selectedCategory === 'all'
        ? galleryPhotos
        : galleryPhotos.filter((p) => p.museumCategory === selectedCategory);

    // Sort featured & high-priority photographs first
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
      id="museum"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sunshine border-2 border-cocoa shadow-sticker mb-4">
          <Camera className="w-4 h-4 text-cocoa" />
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-cocoa">
            Section 04 • The Nisha Memory Museum
          </span>
        </div>

        <h2 className="font-heading text-3xl sm:text-5xl font-bold text-cocoa tracking-tight mb-4">
          A THOUSAND PICTURES. A MILLION FEELINGS.
        </h2>

        <p className="text-base sm:text-lg font-bold text-cocoa-light leading-relaxed">
          Every Polaroid here is a real piece of our story — from timeless monochrome portraits and wedding garlands to seaside sunsets, Royal Enfield rides, and afternoon chai.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div
        className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10"
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
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold border-2 border-cocoa transition-all cursor-pointer ${
                isActive
                  ? 'bg-blush text-cocoa shadow-sticker -translate-y-0.5'
                  : 'bg-cream-paper text-cocoa hover:bg-sunshine-soft'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] bg-cream border border-cocoa/30">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Editorial Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredPhotos.map((photo, idx) => {
          const tiltClass =
            idx % 3 === 0
              ? 'sm:rotate-[-1deg]'
              : idx % 3 === 1
              ? 'sm:rotate-[1deg]'
              : 'sm:rotate-[-0.5deg]';

          const tapeColor =
            idx % 3 === 0
              ? ''
              : idx % 3 === 1
              ? 'washi-tape-pink'
              : 'washi-tape-blue';

          return (
            <motion.article
              key={photo.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.35 }}
              onClick={() => setLightboxIndex(idx)}
              className={`group paper-card rounded-3xl p-3.5 sm:p-4 pb-5 bg-cream-paper relative cursor-pointer transition-all duration-300 hover:rotate-0 hover:-translate-y-1.5 hover:shadow-polaroid flex flex-col justify-between ${tiltClass}`}
            >
              <div className={`washi-tape ${tapeColor} -top-3 left-1/2 -translate-x-1/2`} />

              <div>
                {/* Featured / Date Top Meta */}
                <div className="flex items-center justify-between gap-2 mb-2.5 px-1">
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

                {/* Image Container */}
                <div
                  className={`w-full overflow-hidden rounded-2xl border-2 border-cocoa/20 bg-cream-warm relative ${
                    photo.orientation === 'portrait'
                      ? 'aspect-[3/4]'
                      : 'aspect-[4/3]'
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

              {/* Polaroid Caption Footer */}
              <div className="mt-3.5 pt-1 text-center px-1">
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
          );
        })}
      </div>

      {/* Interactive Then vs Now Slider Sub-Feature */}
      <ThenVsNow />

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
