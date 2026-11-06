import React from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { CHAPTERS, ChapterId, getChapterById } from '../data/chapters';

interface ChapterFooterNavProps {
  currentChapterId: ChapterId;
  onPrev: () => void;
  onNext: () => void;
  onReplay: () => void;
  customNextLabel?: string;
  hideNextButton?: boolean;
}

export const ChapterFooterNav: React.FC<ChapterFooterNavProps> = ({
  currentChapterId,
  onPrev,
  onNext,
  onReplay,
  customNextLabel,
  hideNextButton = false,
}) => {
  const current = getChapterById(currentChapterId);
  const isFirst = current.index === 0;
  const isLast = current.index === CHAPTERS.length - 1;
  const nextLabel = customNextLabel || current.nextCtaLabel || 'CONTINUE →';

  // On Chapter 1 (Welcome), the primary "LET'S BEGIN ❤️" button is featured in the hero card itself
  if (isFirst) {
    return null;
  }

  return (
    <footer className="shrink-0 z-30 bg-cream-paper/95 backdrop-blur-md border-t-2 border-cocoa/15 px-4 sm:px-6 py-2.5 sm:py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Back Button (Every chapter except the first) */}
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-2xl bg-cream hover:bg-sunshine-soft text-cocoa font-heading font-bold text-xs sm:text-sm border-2 border-cocoa shadow-sticker hover:-translate-y-0.5 transition-all cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK</span>
        </button>

        {/* Subtle Center Chapter Caption (Desktop) */}
        <div className="hidden md:flex items-center gap-2 text-xs font-extrabold text-cocoa-light">
          <span>CHAPTER {current.number} OF 08</span>
          <span>•</span>
          <span className="font-marathi text-sm text-cocoa">{current.marathiSubtitle}</span>
        </div>

        {/* Right: Deliberate Continue Button or Replay Button */}
        <div>
          {!isLast && !hideNextButton && (
            <button
              type="button"
              onClick={onNext}
              className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-2xl bg-blush hover:bg-blush-deep text-cocoa font-heading font-bold text-xs sm:text-base border-2 border-cocoa shadow-sticker hover:shadow-stickerHover hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <span>{nextLabel}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
            </button>
          )}

          {isLast && (
            <button
              type="button"
              onClick={onReplay}
              className="inline-flex items-center gap-2 px-5 py-2 sm:py-2.5 rounded-2xl bg-sunshine hover:bg-sunshine-deep text-cocoa font-heading font-bold text-xs sm:text-sm border-2 border-cocoa shadow-sticker hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>REPLAY STORY (01 / 08)</span>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
