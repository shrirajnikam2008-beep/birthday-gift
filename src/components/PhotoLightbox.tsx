import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar, Sparkles, ZoomIn, ZoomOut } from 'lucide-react';
import { PhotoItem } from '../data/photos';

interface PhotoLightboxProps {
  photos: PhotoItem[];
  currentIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex?: (index: number) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photos,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  onSelectIndex,
}) => {
  const [zoomed, setZoomed] = useState(false);
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < photos.length;
  const currentPhoto = isOpen ? photos[currentIndex] : null;

  useEffect(() => {
    setZoomed(false);
  }, [currentIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {isOpen && currentPhoto && currentIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-cocoa/90 backdrop-blur-md flex flex-col items-center justify-center p-2.5 sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-label="Full screen photograph viewer"
          onClick={onClose}
        >
          {/* Top Bar */}
          <div className="w-full max-w-4xl flex items-center justify-between mb-2.5 z-20 pointer-events-none">
            <div className="px-3.5 py-1.5 rounded-full bg-cream-paper border-2 border-cocoa text-xs sm:text-sm font-extrabold text-cocoa pointer-events-auto shadow-sticker flex items-center gap-2">
              <span>
                {currentIndex + 1} / {photos.length}
              </span>
              <span className="text-cocoa/30">•</span>
              <span className="uppercase text-[11px]">{currentPhoto.museumCategory}</span>
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomed((z) => !z);
                }}
                className="p-2 rounded-full bg-cream-paper hover:bg-sunshine text-cocoa border-2 border-cocoa shadow-sticker transition-transform hover:scale-105 cursor-pointer"
                aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
                title={zoomed ? 'Reset zoom' : 'Zoom in'}
              >
                {zoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full bg-blush hover:bg-blush-deep text-cocoa border-2 border-cocoa shadow-sticker transition-transform hover:scale-105 cursor-pointer"
                aria-label="Close full-screen photo view (Escape)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Previous Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-cream-paper hover:bg-sunshine text-cocoa border-2 border-cocoa shadow-sticker transition-transform hover:scale-105 cursor-pointer"
            aria-label="Previous photograph"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-cream-paper hover:bg-sunshine text-cocoa border-2 border-cocoa shadow-sticker transition-transform hover:scale-105 cursor-pointer"
            aria-label="Next photograph"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Main Polaroid Modal Content */}
          <motion.div
            key={currentPhoto.id}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-cream-paper p-3 sm:p-5 rounded-3xl border-3 border-cocoa shadow-2xl max-w-4xl w-full max-h-[82vh] flex flex-col items-center overflow-hidden"
            style={{ borderWidth: '3px' }}
          >
            <div
              onClick={() => setZoomed((z) => !z)}
              className="w-full flex-1 min-h-0 flex items-center justify-center bg-cream-warm rounded-2xl overflow-auto p-2 border-2 border-cocoa/15 cursor-zoom-in"
            >
              <img
                src={currentPhoto.src}
                alt={currentPhoto.description}
                className={`max-h-[56vh] w-auto max-w-full object-contain rounded-xl transition-transform duration-300 ${
                  zoomed ? 'scale-125 cursor-zoom-out' : 'scale-100'
                }`}
              />
            </div>

            <div className="w-full pt-3 px-2 text-center">
              <p className="font-handwritten text-2xl sm:text-3xl font-bold text-cocoa leading-tight">
                {currentPhoto.caption}
              </p>

              {currentPhoto.description && currentPhoto.description !== currentPhoto.caption && (
                <p className="text-xs font-semibold text-cocoa-light mt-0.5 line-clamp-1">
                  {currentPhoto.description}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-center gap-2 mt-2 text-xs font-bold text-cocoa-light">
                {currentPhoto.familyCategory && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blush-soft border border-blush-deep/40 text-cocoa font-extrabold">
                    ❤️ {currentPhoto.familyCategory}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sunshine-soft border border-cocoa/20 text-cocoa">
                  <Sparkles className="w-3 h-3 text-sunshine-deep" />
                  {currentPhoto.museumCategory}
                </span>
                {currentPhoto.date && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-skyblue-soft border border-cocoa/20 text-cocoa">
                    <Calendar className="w-3 h-3 text-cocoa" />
                    {currentPhoto.date}
                  </span>
                )}
              </div>

              {/* Quick Filmstrip Dots / Thumbnails */}
              {onSelectIndex && photos.length > 1 && (
                <div className="mt-3 pt-2 border-t border-dashed border-cocoa/15 flex items-center justify-center gap-1.5 overflow-x-auto max-w-full py-1">
                  {photos.slice(Math.max(0, currentIndex - 4), Math.min(photos.length, currentIndex + 5)).map((item) => {
                    const idx = photos.findIndex((p) => p.id === item.id);
                    const isActive = idx === currentIndex;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => onSelectIndex(idx)}
                        className={`w-9 h-9 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                          isActive
                            ? 'border-cocoa ring-2 ring-sunshine scale-105'
                            : 'border-cocoa/25 opacity-60 hover:opacity-100'
                        }`}
                        title={item.caption}
                      >
                        <img src={item.src} alt="" className="w-full h-full object-cover" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
