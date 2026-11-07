import React, { useState, useRef } from 'react';
import { ArrowLeftRight, Sparkles } from 'lucide-react';
import { thenNowPairs } from '../data/photos';

export const ThenVsNow: React.FC = () => {
  const [activePairIndex, setActivePairIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const currentPair = thenNowPairs[activePairIndex];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos(Math.round((x / rect.width) * 100));
  };

  return (
    <div className="paper-card rounded-3xl p-4 sm:p-6 bg-cream-paper relative max-w-5xl mx-auto">
      <div className="washi-tape washi-tape-pink -top-2.5 left-1/2 -translate-x-1/2" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3.5 border-b-2 border-dashed border-cocoa/15">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sunshine border border-cocoa text-[11px] font-extrabold text-cocoa mb-1">
            <ArrowLeftRight className="w-3 h-3" />
            <span>INTERACTIVE TIME CAPSULE • THEN VS NOW</span>
          </div>
          <h3 className="font-heading text-lg sm:text-2xl font-bold text-cocoa">
            {currentPair.title}
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-cocoa-light">
            {currentPair.subtitle}
          </p>
        </div>

        {/* Pair Selector Tabs */}
        <div className="flex flex-wrap gap-2">
          {thenNowPairs.map((pair, idx) => (
            <button
              key={pair.id}
              type="button"
              onClick={() => {
                setActivePairIndex(idx);
                setSliderPos(50);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold border-2 border-cocoa transition-all cursor-pointer ${
                activePairIndex === idx
                  ? 'bg-blush text-cocoa shadow-sticker -translate-y-0.5'
                  : 'bg-cream text-cocoa-light hover:bg-sunshine-soft hover:text-cocoa'
              }`}
            >
              Pair {idx + 1}:{' '}
              {pair.id === 'pair-mother-son'
                ? 'Mumma & Shriraj'
                : pair.id === 'pair-mumma-papa'
                ? 'Mumma & Papa'
                : 'Solo Portrait'}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Comparison Frame */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-7">
          <div
            ref={containerRef}
            onMouseMove={(e) => {
              if (e.buttons === 1) handleMove(e.clientX);
            }}
            onTouchMove={(e) => {
              if (e.touches[0]) handleMove(e.touches[0].clientX);
            }}
            onClick={(e) => handleMove(e.clientX)}
            className="relative aspect-[4/3] max-h-[280px] sm:max-h-[360px] md:max-h-[400px] w-full mx-auto rounded-2xl overflow-hidden border-3 border-cocoa shadow-polaroid select-none cursor-ew-resize bg-cream-warm"
            style={{ borderWidth: '3px' }}
          >
            {/* Base Layer: NOW Photo */}
            <img
              src={currentPair.nowPhoto.src}
              alt={`Now: ${currentPair.nowPhoto.description}`}
              className="absolute inset-0 w-full h-full object-contain bg-cream-warm p-1"
              draggable={false}
            />

            {/* Clipped Layer: THEN Photo */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <img
                src={currentPair.thenPhoto.src}
                alt={`Then: ${currentPair.thenPhoto.description}`}
                className="absolute inset-0 w-full h-full object-contain bg-cream-warm p-1"
                draggable={false}
              />
            </div>

            {/* Badges */}
            <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-cream-paper/95 border-2 border-cocoa text-[10px] sm:text-xs font-extrabold text-cocoa shadow-sm z-10">
              THEN • {currentPair.thenLabel}
            </span>
            <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-sunshine/95 border-2 border-cocoa text-[10px] sm:text-xs font-extrabold text-cocoa shadow-sm z-10">
              NOW • {currentPair.nowLabel}
            </span>

            {/* Vertical Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-cocoa shadow-md z-20 pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-sunshine border-2 border-cocoa shadow-sticker flex items-center justify-center">
                <ArrowLeftRight className="w-4 h-4 text-cocoa" />
              </div>
            </div>
          </div>

          {/* Accessible Range Input Control + Quick Preset Pills */}
          <div className="mt-3 space-y-2 px-1">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-extrabold text-cocoa">THEN</span>
              <input
                type="range"
                min={0}
                max={100}
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                aria-label={`Slide between Then (${currentPair.thenLabel}) and Now (${currentPair.nowLabel})`}
                className="w-full accent-blush-deep cursor-pointer h-2"
              />
              <span className="text-[11px] font-extrabold text-cocoa">NOW</span>
            </div>

            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setSliderPos(92)}
                className="px-2.5 py-1 rounded-lg bg-cream hover:bg-sunshine-soft border border-cocoa/30 text-[11px] font-bold text-cocoa cursor-pointer"
              >
                View Then
              </button>
              <button
                type="button"
                onClick={() => setSliderPos(50)}
                className="px-2.5 py-1 rounded-lg bg-sunshine-soft border border-cocoa/40 text-[11px] font-extrabold text-cocoa cursor-pointer"
              >
                50 / 50 Split
              </button>
              <button
                type="button"
                onClick={() => setSliderPos(8)}
                className="px-2.5 py-1 rounded-lg bg-cream hover:bg-sunshine-soft border border-cocoa/30 text-[11px] font-bold text-cocoa cursor-pointer"
              >
                View Now
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Side-by-Side Polaroid Cards & Marathi Note */}
        <div className="lg:col-span-5 space-y-3">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-sunshine-soft border-2 border-cocoa/20">
            <p className="font-marathi text-sm sm:text-base font-bold text-cocoa leading-relaxed">
              &ldquo;{currentPair.marathiNote}&rdquo;
            </p>
            <p className="text-[11px] sm:text-xs font-bold text-cocoa-light mt-1.5 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-sunshine-deep" />
              Drag the slider or tap the buttons to compare Then vs Now!
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-2.5 rounded-2xl bg-cream border-2 border-cocoa/25">
              <div className="aspect-[4/3] max-h-[120px] rounded-xl overflow-hidden mb-1.5 bg-cream-warm flex items-center justify-center">
                <img
                  src={currentPair.thenPhoto.src}
                  alt={currentPair.thenPhoto.description}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <p className="text-[11px] sm:text-xs font-extrabold text-center text-cocoa">
                {currentPair.thenLabel}
              </p>
            </div>

            <div className="p-2.5 rounded-2xl bg-cream border-2 border-cocoa/25">
              <div className="aspect-[4/3] max-h-[120px] rounded-xl overflow-hidden mb-1.5 bg-cream-warm flex items-center justify-center">
                <img
                  src={currentPair.nowPhoto.src}
                  alt={currentPair.nowPhoto.description}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <p className="text-[11px] sm:text-xs font-extrabold text-center text-cocoa">
                {currentPair.nowLabel}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
