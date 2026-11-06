import React from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { CHAPTERS, ChapterId, getChapterById } from '../data/chapters';

interface ChapterFooterNavProps {
  currentChapterId: ChapterId;
  currentSlideIndex?: number;
  totalSlides?: number;
  onPrev: () => void;
  onNext: () => void;
  onReplay: () => void;
  customNextLabel?: string;
  hideNextButton?: boolean;
}

export const ChapterFooterNav: React.FC<ChapterFooterNavProps> = ({
  currentChapterId,
  currentSlideIndex = 0,
  totalSlides = 1,
  onPrev,
  onNext,
  onReplay,
  customNextLabel,
  hideNextButton = false,
}) => {
  const current = getChapterById(currentChapterId);
  const isFirst = current.index === 0 && currentSlideIndex === 0;
  const isLast = current.index === CHAPTERS.length - 1;

  // Determine smart contextual Next button label if not explicitly overridden
  let nextLabel = customNextLabel;
  if (!nextLabel) {
    if (currentChapterId === 'birthday-queen') {
      if (currentSlideIndex === 0) nextLabel = 'NEXT: 4 PERSONALITY MODES →';
      else if (currentSlideIndex === 1) nextLabel = 'NEXT: FAMILY HALL OF FAME →';
      else nextLabel = 'NEXT: DISCOVER HER WORLD →';
    } else if (currentChapterId === 'academic-legend') {
      if (currentSlideIndex === 0) nextLabel = 'NEXT: REAL ACADEMIC MILESTONES →';
      else nextLabel = 'NEXT: ENTER THE MEMORY MUSEUM →';
    } else if (currentChapterId === 'letters') {
      if (currentSlideIndex === 0) nextLabel = 'NEXT: A MESSAGE FROM OUR FAMILY →';
      else if (currentSlideIndex < 5) nextLabel = `NEXT: LETTER 0${currentSlideIndex + 1} →`;
      else nextLabel = 'NEXT: A MESSAGE FROM OUR FAMILY →';
    } else if (currentChapterId === 'family') {
      if (currentSlideIndex === 0) nextLabel = "NEXT: PAPA'S BIRTHDAY MESSAGE →";
      else if (currentSlideIndex === 1) nextLabel = "NEXT: SON'S BIRTHDAY MESSAGE →";
      else if (currentSlideIndex === 2) nextLabel = 'NEXT: FAMILY SCRAPBOOK HIGHLIGHTS →';
      else nextLabel = "NEXT: IT'S CAKE TIME →";
    } else {
      nextLabel = current.nextCtaLabel || 'CONTINUE →';
    }
  }

  // On Chapter 1 (Welcome), the hero card button triggers begin
  if (isFirst) {
    return null;
  }

  return (
    <footer className="h-14 sm:h-16 shrink-0 z-30 bg-cream-paper/95 backdrop-blur-md border-t-2 border-cocoa/15 px-4 sm:px-6 flex items-center justify-between">
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between gap-3">
        {/* Back Button */}
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-cream hover:bg-sunshine-soft text-cocoa font-heading font-bold text-xs sm:text-sm border-2 border-cocoa shadow-sticker hover:-translate-y-0.5 transition-all cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK</span>
        </button>

        {/* Center Progress Caption */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-extrabold text-cocoa-light">
          <span>CHAPTER {current.number} OF 08</span>
          {totalSlides > 1 && (
            <>
              <span>•</span>
              <span className="text-cocoa font-bold">SLIDE {currentSlideIndex + 1} OF {totalSlides}</span>
            </>
          )}
          <span>•</span>
          <span className="font-marathi text-sm text-cocoa">{current.marathiSubtitle}</span>
        </div>

        {/* Right Action Button */}
        <div>
          {!isLast && !hideNextButton && (
            <button
              type="button"
              onClick={onNext}
              className="group inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-2xl bg-blush hover:bg-blush-deep text-cocoa font-heading font-bold text-xs sm:text-base border-2 border-cocoa shadow-sticker hover:shadow-stickerHover hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <span>{nextLabel}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
            </button>
          )}

          {isLast && (
            <button
              type="button"
              onClick={onReplay}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-sunshine hover:bg-sunshine-deep text-cocoa font-heading font-bold text-xs sm:text-sm border-2 border-cocoa shadow-sticker hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>REPLAY EXPERIENCE (01/08)</span>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

