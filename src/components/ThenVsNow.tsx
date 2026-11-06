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
    <div className="mt-16 paper-card rounded-3xl p-5 sm:p-8 lg:p-10 bg-cream-paper relative">
      <div className="washi-tape washi-tape-pink -top-3 left-1/2 -translate-x-1/2" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sunshine border border-cocoa text-xs font-extrabold text-cocoa mb-2">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>INTERACTIVE THEN VS NOW COMPARISON</span>
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-cocoa">
            {currentPair.title}
          </h3>
          <p className="text-sm sm:text-base font-semibold text-cocoa-light mt-1">
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
                  ? 'bg-blush text-cocoa shadow-sticker'
                  : 'bg-cream text-cocoa-light hover:bg-sunshine-soft'
              }`}
            >
              Pair {idx + 1}: {pair.id === 'pair-mother-son' ? 'Mumma & Shriraj' : pair.id === 'pair-mumma-papa' ? 'Mumma & Papa' : 'Solo Portrait'}
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
            className="relative aspect-[4/5] sm:aspect-[4/4] max-h-[520px] w-full mx-auto rounded-2xl overflow-hidden border-3 border-cocoa shadow-polaroid select-none cursor-ew-resize bg-cocoa/10"
            style={{ borderWidth: '3px' }}
          >
            {/* Base Layer: NOW Photo */}
            <img
              src={currentPair.nowPhoto.src}
              alt={`Now: ${currentPair.nowPhoto.description}`}
              className="absolute inset-0 w-full h-full object-cover object-top"
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
                className="absolute inset-0 w-full h-full object-cover object-top"
                draggable={false}
              />
            </div>

            {/* Badges */}
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-cream-paper/95 border-2 border-cocoa text-xs font-extrabold text-cocoa shadow-sm z-10">
              THEN • {currentPair.thenLabel}
            </span>
            <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-sunshine/95 border-2 border-cocoa text-xs font-extrabold text-cocoa shadow-sm z-10">
              NOW • {currentPair.nowLabel}
            </span>

            {/* Vertical Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-cream-paper shadow-md z-20 pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-sunshine border-2 border-cocoa shadow-sticker flex items-center justify-center">
                <ArrowLeftRight className="w-5 h-5 text-cocoa" />
              </div>
            </div>
          </div>

          {/* Accessible Range Input Control */}
          <div className="mt-4 flex items-center gap-3 px-2">
            <span className="text-xs font-extrabold text-cocoa">THEN</span>
            <input
              type="range"
              min={0}
              max={100}
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              aria-label={`Slide between Then (${currentPair.thenLabel}) and Now (${currentPair.nowLabel})`}
              className="w-full accent-blush-deep cursor-pointer"
            />
            <span className="text-xs font-extrabold text-cocoa">NOW</span>
          </div>
        </div>

        {/* Right Side: Side-by-Side Polaroid Cards & Marathi Note */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-sunshine-soft border-2 border-cocoa/20">
            <p className="font-marathi text-lg sm:text-xl font-bold text-cocoa">
              &ldquo;{currentPair.marathiNote}&rdquo;
            </p>
            <p className="text-xs font-bold text-cocoa-light mt-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-sunshine-deep" />
              Drag the slider or use the bar to compare Then vs Now!
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-2.5 rounded-2xl bg-cream border-2 border-cocoa/20">
              <div className="aspect-[3/4] rounded-xl overflow-hidden mb-2">
                <img
                  src={currentPair.thenPhoto.src}
                  alt={currentPair.thenPhoto.description}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <p className="text-xs font-extrabold text-center text-cocoa">
                {currentPair.thenLabel}
              </p>
            </div>

            <div className="p-2.5 rounded-2xl bg-cream border-2 border-cocoa/20">
              <div className="aspect-[3/4] rounded-xl overflow-hidden mb-2">
                <img
                  src={currentPair.nowPhoto.src}
                  alt={currentPair.nowPhoto.description}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <p className="text-xs font-extrabold text-center text-cocoa">
                {currentPair.nowLabel}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
