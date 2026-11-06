import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Music, Compass, ChevronDown, Heart, Sparkles, Check, SlidersHorizontal } from 'lucide-react';
import { CHAPTERS, ChapterId, getChapterById } from '../data/chapters';
import { useAudio } from '../context/AudioContext';

interface NavbarProps {
  currentChapterId: ChapterId;
  onSelectChapter: (id: ChapterId) => void;
  onOpenJarModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentChapterId,
  onSelectChapter,
  onOpenJarModal,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { isPlaying, activeTrack, togglePlay, toggleDrawer } = useAudio();
  const activeChapter = getChapterById(currentChapterId);

  // Track overall page scroll progress for the top indicator bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const current = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, current)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close compact chapter popover when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  const handleSelect = (id: ChapterId) => {
    onSelectChapter(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-cream/95 backdrop-blur-md border-b-2 border-cocoa/15 shadow-sm transition-all overflow-x-hidden">
      {/* Top Thin Storybook Progress Indicator */}
      <div className="w-full h-1 bg-cream-warm overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-sunshine via-blush to-mint transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-6 h-13 sm:h-16 flex items-center justify-between gap-1 sm:gap-2">
        {/* Left: Brand Pill (Scrolls to top) */}
        <button
          type="button"
          onClick={() => handleSelect('welcome')}
          className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-sunshine border-2 border-cocoa shadow-sticker hover:-translate-y-0.5 transition-transform cursor-pointer shrink-0"
        >
          <Heart className="w-3.5 h-3.5 text-cocoa fill-blush-deep shrink-0" />
          <span className="font-heading font-bold text-xs sm:text-sm tracking-wide text-cocoa">
            <span className="hidden sm:inline">THE NISHA UNIVERSE</span>
            <span className="sm:hidden">NISHA ❤️</span>
          </span>
        </button>

        {/* Center: Compact Active Chapter Indicator + Smooth Scroll Chapter Menu */}
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label={`Current chapter: ${activeChapter.number} of 08, ${activeChapter.shortTitle}. Click to open chapter index`}
            className="inline-flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-cream border-2 border-cocoa shadow-sticker hover:bg-sunshine-soft transition-colors cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-cocoa-light hidden xs:inline" />
            <span className="font-heading text-xs sm:text-sm font-bold text-cocoa">
              {activeChapter.number} / 08
            </span>
            <span className="text-cocoa/30 font-bold hidden sm:inline">•</span>
            <span className="font-heading text-xs sm:text-sm font-bold text-cocoa tracking-wide hidden sm:inline">
              {activeChapter.shortTitle}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-cocoa transition-transform duration-200 ${
                menuOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Compact Storybook Chapter Picker Popover */}
          {menuOpen && (
            <div
              className="absolute left-1/2 -translate-x-1/2 mt-2.5 w-72 sm:w-80 rounded-3xl bg-cream-paper border-3 border-cocoa shadow-polaroid p-3 z-50"
              style={{ borderWidth: '3px' }}
            >
              <div className="px-2 py-1.5 mb-2 border-b border-dashed border-cocoa/20 flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-cocoa-light">
                  Storybook Chapters (01–08)
                </span>
                <span className="text-[11px] font-marathi font-bold text-cocoa">
                  प्रकरण निवडा ✨
                </span>
              </div>

              <div className="space-y-1 max-h-[65vh] overflow-y-auto pr-1">
                {CHAPTERS.map((chap) => {
                  const isCurrent = chap.id === currentChapterId;
                  return (
                    <button
                      key={chap.id}
                      type="button"
                      onClick={() => handleSelect(chap.id)}
                      className={`w-full px-3 py-2 rounded-2xl text-left flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-sunshine border-2 border-cocoa font-extrabold text-cocoa shadow-sm'
                          : 'hover:bg-cream border-2 border-transparent font-bold text-cocoa'
                      }`}
                    >
                      <div>
                        <div className="font-heading text-xs sm:text-sm text-cocoa">
                          {chap.number} • {chap.fullTitle}
                        </div>
                        <div className="font-marathi text-[11px] text-cocoa-light">
                          {chap.marathiSubtitle}
                        </div>
                      </div>
                      {isCurrent && <Check className="w-4 h-4 text-cocoa shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right: Appreciation Jar & Marathi Birthday Song Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenJarModal}
            className="inline-flex items-center gap-1 p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-blush-light hover:bg-blush text-cocoa border-2 border-cocoa shadow-sticker text-xs font-extrabold transition-colors cursor-pointer"
            title="Open the Appreciation Jar (24 notes)"
          >
            <Sparkles className="w-3.5 h-3.5 text-cocoa shrink-0" />
            <span className="hidden sm:inline">Jar</span>
          </button>

          {/* Marathi Birthday Song Button with Clip Selector */}
          <div className="inline-flex items-center rounded-full border-2 border-cocoa bg-cream-paper shadow-sticker overflow-hidden">
            {/* Play/Pause Toggle */}
            <button
              type="button"
              onClick={togglePlay}
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-extrabold transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-sunshine text-cocoa'
                  : 'bg-cream-paper text-cocoa hover:bg-sunshine/40'
              }`}
              aria-pressed={isPlaying}
              aria-label={isPlaying ? 'Pause Marathi Birthday Song' : 'Play Marathi Birthday Song'}
              title="Play / Pause Marathi Birthday Song (रंगत संगत)"
            >
              {isPlaying ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-cocoa animate-pulse shrink-0" />
                  <div className="flex items-end gap-0.5 h-3 w-3 shrink-0">
                    <span className="w-0.5 h-full bg-cocoa animate-pulse" />
                    <span className="w-0.5 h-2/3 bg-cocoa animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <span className="w-0.5 h-full bg-cocoa animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                  <span className="hidden md:inline font-marathi">गाणं चालू</span>
                </>
              ) : (
                <>
                  <Music className="w-3.5 h-3.5 text-cocoa shrink-0" />
                  <span className="hidden md:inline font-marathi">वाढदिवस गाणं</span>
                </>
              )}
            </button>

            {/* Clips & Song Parts Drawer Trigger */}
            <button
              type="button"
              onClick={toggleDrawer}
              className="px-2 py-1.5 bg-cream-warm hover:bg-sunshine-soft border-l border-cocoa/25 text-[10px] font-black uppercase tracking-wider text-cocoa flex items-center gap-1 transition-colors cursor-pointer"
              title="Change song clip / view player settings"
            >
              <SlidersHorizontal className="w-3 h-3 text-cocoa/70" />
              <span className="hidden xs:inline">{activeTrack.badge}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
