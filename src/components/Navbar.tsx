import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Compass, ChevronDown, Heart, Sparkles, Check } from 'lucide-react';
import { CHAPTERS, ChapterId, getChapterById } from '../data/chapters';

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const activeChapter = getChapterById(currentChapterId);
  const progressPercent = ((activeChapter.index + 1) / CHAPTERS.length) * 100;

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

  // Gentle music-box Web Audio synthesizer (100% royalty-free, OFF by default, user-controlled)
  const stopMusicBox = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.suspend();
    }
    setIsPlaying(false);
  };

  const startMusicBox = async () => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      const melody = [
        523.25, 659.25, 783.99, 659.25, 880.0, 783.99, 659.25, 587.33,
        523.25, 587.33, 659.25, 783.99, 659.25, 523.25, 587.33, 523.25,
      ];
      let step = 0;

      const playNote = (freq: number) => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
        const now = audioCtxRef.current.currentTime;
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.035, now + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0008, now + 1.1);

        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start(now);
        osc.stop(now + 1.15);
      };

      playNote(melody[0]);
      step = 1;
      timerRef.current = window.setInterval(() => {
        playNote(melody[step % melody.length]);
        step++;
      }, 650);

      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusicBox();
    } else {
      startMusicBox();
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <header className="shrink-0 z-40 bg-cream-paper/95 backdrop-blur-md border-b-2 border-cocoa/15 relative">
      {/* Subtle Chapter Progress Bar */}
      <div
        className="w-full h-1.5 bg-cream-warm overflow-hidden"
        role="progressbar"
        aria-valuenow={activeChapter.index + 1}
        aria-valuemin={1}
        aria-valuemax={CHAPTERS.length}
        aria-label={`Story chapter ${activeChapter.number} of 08`}
      >
        <div
          className="h-full bg-gradient-to-r from-sunshine via-blush to-skyblue transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Left: Brand Pill */}
        <button
          type="button"
          onClick={() => onSelectChapter('welcome')}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sunshine border-2 border-cocoa shadow-sticker hover:-translate-y-0.5 transition-transform cursor-pointer"
        >
          <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cocoa fill-blush-deep shrink-0" />
          <span className="font-heading font-bold text-xs sm:text-sm tracking-wide text-cocoa truncate">
            THE NISHA UNIVERSE
          </span>
        </button>

        {/* Center: Compact Chapter Indicator + Optional Compact Chapter Menu */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label={`Current chapter: ${activeChapter.number} of 08, ${activeChapter.shortTitle}. Click to open chapter index`}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream border-2 border-cocoa shadow-sticker hover:bg-sunshine-soft transition-colors cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-cocoa-light hidden xs:inline" />
            <span className="font-heading text-xs sm:text-sm font-bold text-cocoa">
              {activeChapter.number} / 08
            </span>
            <span className="text-cocoa/30 font-bold">•</span>
            <span className="font-heading text-xs sm:text-sm font-bold text-cocoa tracking-wide">
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
            <div className="absolute left-1/2 -translate-x-1/2 mt-2.5 w-72 sm:w-80 rounded-3xl bg-cream-paper border-3 border-cocoa shadow-polaroid p-3 z-50" style={{ borderWidth: '3px' }}>
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
                      onClick={() => {
                        onSelectChapter(chap.id);
                        setMenuOpen(false);
                      }}
                      className={`w-full px-3 py-2 rounded-2xl text-left flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-sunshine border-2 border-cocoa font-extrabold text-cocoa shadow-sm'
                          : 'hover:bg-cream border-2 border-transparent font-bold text-cocoa'
                      }`}
                    >
                      <div>
                        <div className="font-heading text-xs sm:text-sm text-cocoa">
                          {chap.fullTitle}
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

        {/* Right: Appreciation Jar Quick Button & Audio Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={onOpenJarModal}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-blush-light hover:bg-blush text-cocoa border-2 border-cocoa shadow-sticker text-xs font-extrabold transition-colors cursor-pointer"
            title="Open the Appreciation Jar (24 notes)"
          >
            <Sparkles className="w-3.5 h-3.5 text-cocoa shrink-0" />
            <span className="hidden md:inline">Appreciation Jar</span>
            <span className="md:hidden">Jar</span>
          </button>

          <button
            type="button"
            onClick={toggleMusic}
            className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs font-extrabold border-2 border-cocoa shadow-sticker transition-all cursor-pointer ${
              isPlaying
                ? 'bg-blush text-cocoa'
                : 'bg-cream-paper text-cocoa hover:bg-sunshine/40'
            }`}
            aria-pressed={isPlaying}
            aria-label={isPlaying ? 'Pause background music box' : 'Play gentle music box melody'}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse shrink-0" />
                <span className="hidden sm:inline">Music: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="hidden sm:inline">Music: OFF</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
