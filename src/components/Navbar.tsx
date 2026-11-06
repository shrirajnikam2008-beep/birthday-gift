import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Menu, X, Heart, Sparkles } from 'lucide-react';

const navLinks = [
  { href: '#welcome', label: 'Start' },
  { href: '#queen', label: 'Birthday Queen' },
  { href: '#academic', label: 'The Scholar' },
  { href: '#museum', label: 'Memory Museum' },
  { href: '#letters', label: '5 Letters' },
  { href: '#jar', label: 'Appreciation Jar' },
  { href: '#family', label: 'Family Love' },
  { href: '#cake', label: 'Cake Time' },
  { href: '#gift', label: 'Surprise 🎁' },
];

export const Navbar: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      // Gentle warm pentatonic music-box notes (Hz)
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
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-cream-paper/95 backdrop-blur-md border-b-2 border-cocoa/15 shadow-sm py-2.5'
          : 'bg-cream/80 backdrop-blur-sm py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
        {/* Brand Pill */}
        <a
          href="#welcome"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sunshine border-2 border-cocoa shadow-sticker hover:translate-y-[-1px] transition-transform"
        >
          <Heart className="w-4 h-4 text-cocoa fill-blush-deep" />
          <span className="font-heading font-bold text-sm sm:text-base tracking-wide text-cocoa">
            THE NISHA UNIVERSE
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-cream-paper px-3 py-1.5 rounded-full border-2 border-cocoa/20">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-1 rounded-full text-xs font-bold text-cocoa hover:bg-sunshine/60 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Controls: Music Toggle & Mobile Menu */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleMusic}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold border-2 border-cocoa shadow-sticker transition-all ${
              isPlaying
                ? 'bg-blush text-cocoa'
                : 'bg-cream-paper text-cocoa hover:bg-sunshine/40'
            }`}
            aria-pressed={isPlaying}
            aria-label={isPlaying ? 'Pause background music box' : 'Play gentle music box melody'}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-4 h-4 animate-pulse" />
                <span>Music: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span>Music: OFF</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-full bg-cream-paper border-2 border-cocoa shadow-sticker text-cocoa"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cream-paper border-b-2 border-cocoa px-4 pt-3 pb-5 shadow-lg">
          <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-cocoa-light">
            <Sparkles className="w-4 h-4 text-sunshine-deep" />
            <span>तुझ्यासाठी... कारण तू खूप खास आहेस! ❤️</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-xs font-bold bg-cream border-2 border-cocoa/20 text-cocoa hover:bg-sunshine/50 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
