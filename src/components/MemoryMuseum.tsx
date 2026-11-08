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
  ArrowRight,
  ArrowLeft,
  Clock,
} from 'lucide-react';
import { galleryPhotos, museumCategories, PhotoItem, getPhotoById } from '../data/photos';
import { PhotoLightbox } from './PhotoLightbox';
import { ThenVsNow } from './ThenVsNow';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface MemoryMuseumProps {
  onPrev?: () => void;
  onNext?: () => void;
}

const TIMELINE_MILESTONES = [
  {
    era: 'EARLY CHAPTERS • ROOTS OF GRACE',
    year: 'Foundations',
    title: 'Where Our Little Universe Began',
    marathi: 'जिथून आपल्या या गोड जगाची सुरुवात झाली ❤️',
    note: 'Early family portraits radiating the warmth, simplicity, and love that built our home.',
    photoIds: ['photo-005', 'photo-040'],
    badgeBg: 'bg-blush',
  },
  {
    era: 'AUGUST 2016 • CHILDHOOD WARMTH',
    year: '2016',
    title: 'Tiny Arms & Endless Security',
    marathi: 'तुझ्या मिठीतलं ते सुरक्षित जग!',
    note: 'From childhood hugs to quiet everyday lessons — you were always my safest place.',
    photoIds: ['photo-003', 'photo-011'],
    badgeBg: 'bg-sunshine',
  },
  {
    era: '2018 – 2022 • ADVENTURES, WEDDINGS & WINTER SMILES',
    year: '2018 – 2022',
    title: 'Royal Phetas, Winter Beanies & Road Trips',
    marathi: 'सण-समारंभ, हिवाळ्यातली ऊब आणि प्रवासातली मज्जा! 🚗🎊',
    note: 'Theme park adventures, grand family wedding stages, cozy winter beanies, and sunny highway drives together.',
    photoIds: ['photo-048', 'photo-049', 'photo-050', 'photo-051'],
    badgeBg: 'bg-peach',
  },
  {
    era: 'SCHOLAR & RIDER • UNSTOPPABLE SPIRIT',
    year: '2023 – 2024',
    title: 'Commanding the Classroom & the Road',
    marathi: 'शिकवण्याची आवड आणि रॉयल एनफिल्डची स्वारी! 🏍️🎓',
    note: 'Balancing lectures, terrace PhD research, and hopping onto a Royal Enfield Hunter with effortless confidence.',
    photoIds: ['photo-025', 'photo-017'],
    badgeBg: 'bg-skyblue',
  },
  {
    era: '45TH BIRTHDAY WITH AAI & BABA • 2025',
    year: '2025',
    title: '45th Birthday in Her Parents’ Loving Embrace',
    marathi: 'वय ४५ असलं तरी आई-बाबांसाठी ती आजही त्यांची लाडकी लेकच! 🎂🙏❤️',
    note: 'Celebrating her 45th birthday (9 November 2025) sitting proudly between her beloved parents, plus seaside mornings with Papa and joyful moments at home.',
    photoIds: ['photo-054', 'photo-042', 'photo-028', 'photo-053'],
    badgeBg: 'bg-blush',
  },
  {
    era: '2026 • THE QUEEN TODAY',
    year: '2026',
    title: 'Radiant, Proud & Forever Our Mumma',
    marathi: 'आजही तितकीच तेजस्वी आणि प्रेमळ — आमची मम्मा! 👑',
    note: 'Standing side by side before college in Vellore — carrying your values everywhere life goes.',
    photoIds: ['photo-029', 'photo-002'],
    badgeBg: 'bg-sunshine',
  },
];

export const MemoryMuseum: React.FC<MemoryMuseumProps> = ({ onPrev, onNext }) => {
  const [activeView, setActiveView] = useState<'stream' | 'timeline' | 'then-vs-now'>('stream');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nisha_fav_photos');
      return saved ? JSON.parse(saved) : ['photo-002', 'photo-005', 'photo-029', 'photo-030', 'photo-048', 'photo-054'];
    } catch {
      return ['photo-002', 'photo-005', 'photo-029', 'photo-030', 'photo-048', 'photo-054'];
    }
  });
  const reducedMotion = useReducedMotion();

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavoriteIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('nisha_fav_photos', JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  const filteredPhotos: PhotoItem[] = useMemo(() => {
    const list =
      selectedCategory === 'all'
        ? galleryPhotos
        : selectedCategory === 'favorites'
        ? galleryPhotos.filter((p) => favoriteIds.includes(p.id))
        : galleryPhotos.filter((p) => p.museumCategory === selectedCategory);

    return [...list].sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return b.priority - a.priority;
    });
  }, [selectedCategory, favoriteIds]);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleOpenPhotoById = (photoId: string) => {
    const idx = filteredPhotos.findIndex((p) => p.id === photoId);
    if (idx !== -1) {
      setLightboxIndex(idx);
    } else {
      setSelectedCategory('all');
      const allIdx = galleryPhotos.findIndex((p) => p.id === photoId);
      if (allIdx !== -1) setLightboxIndex(allIdx);
    }
  };

  const handleLightboxPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const handleLightboxNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
  };

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
          Explore all {galleryPhotos.length} curated family photographs in the Memory Album, walk through our
          chronological Family Timeline, or slide between Then vs Now time capsules.
        </p>

        <p className="font-marathi text-sm sm:text-base font-bold text-cocoa mt-2">
          &ldquo;प्रत्येक फोटोमागे एक गोड आठवण आणि आपल्या कुटुंबाचं प्रेम दडलेलं आहे ❤️&rdquo;
        </p>
      </div>

      {/* Top Controls: Mode Switcher & Category Filters */}
      <div className="sticky top-14 sm:top-16 z-30 bg-cream/95 backdrop-blur-md py-3 mb-8 border-y-2 border-cocoa/15 flex flex-col lg:flex-row items-center justify-between gap-3 px-2 rounded-2xl">
        {/* Left: View Mode Toggle (Album / Timeline / Then vs Now) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 bg-cream-warm p-1 rounded-2xl border-2 border-cocoa shadow-xs shrink-0">
          <button
            type="button"
            onClick={() => setActiveView('stream')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeView === 'stream'
                ? 'bg-sunshine text-cocoa shadow-sticker font-black'
                : 'text-cocoa-light hover:text-cocoa'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Memory Album ({galleryPhotos.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('timeline')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeView === 'timeline'
                ? 'bg-skyblue text-cocoa shadow-sticker font-black'
                : 'text-cocoa-light hover:text-cocoa'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Family Timeline</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('then-vs-now')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
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
                  <span className="text-[10px] font-black opacity-65">({count})</span>
                </button>
              );
            })}

            {/* Favorites Pill */}
            <button
              type="button"
              onClick={() => setSelectedCategory('favorites')}
              className={`inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-xs font-extrabold border-2 border-cocoa transition-all cursor-pointer ${
                selectedCategory === 'favorites'
                  ? 'bg-blush text-cocoa shadow-sticker -translate-y-0.5'
                  : 'bg-cream-paper text-cocoa-light hover:bg-blush-soft hover:text-cocoa'
              }`}
            >
              <span>❤️</span>
              <span>Loved</span>
              <span className="text-[10px] font-black opacity-75">({favoriteIds.length})</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {activeView === 'then-vs-now' ? (
        <div className="py-2">
          <ThenVsNow />
        </div>
      ) : activeView === 'timeline' ? (
        /* =========================================================================
           INTERACTIVE CHRONOLOGICAL FAMILY TIMELINE VIEW
           ========================================================================= */
        <div className="max-w-4xl mx-auto py-2">
          <div className="relative border-l-3 border-dashed border-cocoa/35 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
            {TIMELINE_MILESTONES.map((item, idx) => {
              const photos = item.photoIds
                .map((id) => getPhotoById(id))
                .filter((p): p is PhotoItem => p !== undefined);

              return (
                <motion.div
                  key={item.era}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: idx * 0.06 }}
                  className="relative paper-card rounded-3xl p-5 sm:p-6 bg-cream-paper"
                >
                  {/* Timeline Node Dot */}
                  <div
                    className={`absolute -left-[37px] sm:-left-[45px] top-6 w-6 h-6 rounded-full ${item.badgeBg} border-2 border-cocoa shadow-xs flex items-center justify-center text-[10px] font-black text-cocoa`}
                  >
                    {idx + 1}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span
                      className={`px-3 py-0.5 rounded-full ${item.badgeBg} border border-cocoa text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-cocoa`}
                    >
                      {item.era}
                    </span>
                    <span className="text-xs font-black text-cocoa-light">{item.year}</span>
                  </div>

                  <h3 className="font-heading text-lg sm:text-2xl font-bold text-cocoa">
                    {item.title}
                  </h3>
                  <p className="font-marathi text-sm sm:text-base font-bold text-cocoa mt-0.5">
                    &ldquo;{item.marathi}&rdquo;
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-cocoa-light mt-1.5 mb-4">
                    {item.note}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {photos.map((photo) => (
                      <button
                        key={photo.id}
                        type="button"
                        onClick={() => handleOpenPhotoById(photo.id)}
                        className="group p-2.5 rounded-2xl bg-cream border-2 border-cocoa/25 hover:border-cocoa transition-all text-left cursor-pointer"
                      >
                        <div className="w-full h-48 sm:h-52 rounded-xl overflow-hidden bg-cream-warm flex items-center justify-center relative">
                          <img
                            src={photo.src}
                            alt={photo.description}
                            loading="lazy"
                            className="w-full h-full object-contain group-hover:scale-103 transition-transform"
                          />
                        </div>
                        <p className="font-handwritten text-base sm:text-lg font-bold text-cocoa mt-2 line-clamp-1">
                          {photo.caption}
                        </p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        /* =========================================================================
           SCROLL-DRIVEN MEMORY FLASHBACK STREAM (TWO LARGE IMAGES PER VIEW)
           ========================================================================= */
        <div>
          {/* Active Category Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 px-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-cocoa-light flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sunshine-deep" />
              Showing {filteredPhotos.length} Curated Memories • Tap any photo to inspect full screen
            </span>
            <span className="text-xs font-bold text-cocoa-light hidden sm:inline">
              Tap ❤️ on any card to save to your Loved collection
            </span>
          </div>

          {/* 2-Images-Per-View Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo, index) => {
                const isFav = favoriteIds.includes(photo.id);
                return (
                  <motion.div
                    key={photo.id}
                    layout
                    initial={
                      reducedMotion
                        ? { opacity: 1 }
                        : {
                            opacity: 0,
                            y: 32,
                            scale: 0.96,
                          }
                    }
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: reducedMotion ? 0.05 : 0.5,
                      delay: (index % 2) * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group relative bg-cream-paper rounded-3xl p-4 sm:p-5 pb-5 border-3 border-cocoa shadow-scrapbook hover:shadow-polaroid hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                    style={{ borderWidth: '3px' }}
                  >
                    {/* Washi Tape Accent */}
                    <div
                      className={`washi-tape ${getWashiTapeClass(
                        index
                      )} -top-2.5 left-1/2 -translate-x-1/2 scale-90`}
                    />

                    {/* Big Photo Container */}
                    <div
                      onClick={() => handleOpenLightbox(index)}
                      className="w-full h-80 sm:h-96 md:h-[460px] lg:h-[500px] xl:h-[520px] rounded-2xl overflow-hidden border-2 border-cocoa/20 bg-cream-warm flex items-center justify-center cursor-pointer relative group-hover:border-cocoa transition-colors shadow-inner"
                    >
                      <span className="photo-corner-tl" />
                      <span className="photo-corner-br" />
                      <img
                        src={photo.src}
                        alt={photo.caption || photo.description}
                        loading="lazy"
                        decoding="async"
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
                      <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-cream-paper/90 border border-cocoa/30 text-xs font-black text-cocoa/70 shadow-xs">
                        #{photo.id.replace('photo-', '')}
                      </span>

                      {/* Category Tag Badge */}
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-sunshine/95 border border-cocoa/40 text-[10px] font-black uppercase tracking-wider text-cocoa shadow-xs">
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
                          <span>Inspect Full Screen</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => toggleFavorite(photo.id, e)}
                          aria-pressed={isFav}
                          aria-label={isFav ? 'Remove from loved memories' : 'Save to loved memories'}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-extrabold transition-all cursor-pointer ${
                            isFav
                              ? 'bg-blush-light border-cocoa text-cocoa shadow-2xs'
                              : 'bg-cream border-cocoa/25 text-cocoa-light hover:border-cocoa'
                          }`}
                        >
                          <Heart
                            className={`w-3.5 h-3.5 transition-transform active:scale-125 ${
                              isFav ? 'text-blush-deep fill-blush-deep' : 'text-cocoa/45'
                            }`}
                          />
                          <span>{isFav ? 'Loved' : 'Love'}</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* End of Gallery Loving Note & Chapter Navigation */}
      <div className="mt-12 p-5 sm:p-6 rounded-3xl bg-sunshine-soft/75 border-2 border-cocoa max-w-2xl mx-auto text-center shadow-scrapbook">
        <p className="font-marathi text-base sm:text-lg font-bold text-cocoa">
          &ldquo;सर्व ५२ आठवणी येथे सुरक्षित आहेत. प्रत्येक फोटोमध्ये आपल्या कुटुंबाचं प्रेम आहे! ❤️&rdquo;
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          {onPrev && (
            <button
              type="button"
              onClick={onPrev}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-cream hover:bg-sunshine-soft text-cocoa font-heading font-bold text-xs sm:text-sm border-2 border-cocoa cursor-pointer transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>PREV: HER WORLD</span>
            </button>
          )}
          {onNext && (
            <button
              type="button"
              onClick={onNext}
              className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-blush hover:bg-blush-deep active:scale-95 text-cocoa font-heading font-bold text-xs sm:text-sm border-2 border-cocoa shadow-sticker hover:shadow-stickerHover hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <span>NEXT: FIVE LETTERS FROM THE HEART</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>

      {/* Full-screen Lightbox Modal */}
      <PhotoLightbox
        photos={filteredPhotos}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={handleLightboxPrev}
        onNext={handleLightboxNext}
        onSelectIndex={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
};

export default MemoryMuseum;
