import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar, Sparkles } from 'lucide-react';
import { PhotoItem } from '../data/photos';

interface PhotoLightboxProps {
  photos: PhotoItem[];
  currentIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photos,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}) => {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < photos.length;
  const currentPhoto = isOpen ? photos[currentIndex] : null;

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
      {isOpen && currentPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-cocoa/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Full screen photograph viewer"
          onClick={onClose}
        >
          {/* Top Bar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
            <div className="px-3.5 py-1.5 rounded-full bg-cream-paper border-2 border-cocoa text-xs sm:text-sm font-extrabold text-cocoa pointer-events-auto shadow-sticker">
              {currentIndex + 1} / {photos.length} • {currentPhoto.museumCategory}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-full bg-blush hover:bg-blush-deep text-cocoa border-2 border-cocoa shadow-sticker pointer-events-auto transition-transform hover:scale-105 cursor-pointer"
              aria-label="Close full-screen photo view (Escape)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Previous Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-cream-paper hover:bg-sunshine text-cocoa border-2 border-cocoa shadow-sticker transition-transform hover:scale-105 cursor-pointer"
            aria-label="Previous photograph"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-cream-paper hover:bg-sunshine text-cocoa border-2 border-cocoa shadow-sticker transition-transform hover:scale-105 cursor-pointer"
            aria-label="Next photograph"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Polaroid Modal Content */}
          <motion.div
            key={currentPhoto.id}
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-cream-paper p-3 sm:p-5 rounded-3xl border-3 border-cocoa shadow-2xl max-w-4xl w-full max-h-[88vh] flex flex-col items-center overflow-hidden"
            style={{ borderWidth: '3px' }}
          >
            <div className="w-full flex-1 min-h-0 flex items-center justify-center bg-cocoa/5 rounded-2xl overflow-hidden p-2">
              <img
                src={currentPhoto.src}
                alt={currentPhoto.description}
                className="max-h-[64vh] w-auto max-w-full object-contain rounded-xl"
              />
            </div>

            <div className="w-full pt-4 px-2 text-center">
              <p className="font-handwritten text-2xl sm:text-3xl font-bold text-cocoa">
                {currentPhoto.caption}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 mt-2 text-xs font-bold text-cocoa-light">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sunshine-soft border border-cocoa/20">
                  <Sparkles className="w-3 h-3 text-sunshine-deep" />
                  {currentPhoto.museumCategory}
                </span>
                {currentPhoto.date && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-skyblue-soft border border-cocoa/20">
                    <Calendar className="w-3 h-3 text-cocoa" />
                    {currentPhoto.date}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
