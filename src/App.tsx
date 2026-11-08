import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUp } from 'lucide-react';
import { CHAPTERS, ChapterId } from './data/chapters';
import { Navbar } from './components/Navbar';
import { FloatingDecorations } from './components/FloatingDecorations';
import { WelcomeScreen } from './components/WelcomeScreen';
import { BirthdayQueen } from './components/BirthdayQueen';
import { AcademicJourney } from './components/AcademicJourney';
import { MemoryMuseum } from './components/MemoryMuseum';
import { LetterEnvelopes } from './components/LetterEnvelopes';
import { FamilyMessages } from './components/FamilyMessages';
import { BirthdayCake } from './components/BirthdayCake';
import { GiftReveal } from './components/GiftReveal';
import { AppreciationJar } from './components/AppreciationJar';
import { AudioProvider } from './context/AudioContext';
import { AudioPlayerDrawer } from './components/AudioPlayerDrawer';
import { WaterTransition } from './water/WaterTransition';
import { waterController } from './water/waterController';

export function App() {
  const [currentChapterId, setCurrentChapterId] = useState<ChapterId>('welcome');
  const [replayKey, setReplayKey] = useState(0);
  const [jarModalOpen, setJarModalOpen] = useState(false);
  const [isUniverseUnfolded, setIsUniverseUnfolded] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.location.hash && window.location.hash !== '#welcome') {
      return true;
    }
    return false;
  });

  const currentRef = useRef<ChapterId>('welcome');

  const jumpTo = (id: ChapterId) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top: Math.max(0, top), behavior: 'instant' as ScrollBehavior });
  };

  // Deliberate chapter navigation (menu, Next/Prev buttons, hash, back/forward)
  // triggers the full-screen water splash and swaps position at the crest.
  const navigateToChapter = useCallback((targetId: ChapterId, pushHistory = true) => {
    if (pushHistory) {
      try {
        window.history.pushState({ chapterId: targetId }, '', `#${targetId}`);
      } catch {
        // ignore history errors in sandboxed frames
      }
    }
    if (targetId === currentRef.current && document.getElementById(targetId)) {
      jumpTo(targetId);
      return;
    }
    currentRef.current = targetId;
    setCurrentChapterId(targetId);
    void waterController.play({
      onPeak: () => {
        if (targetId !== 'welcome') {
          setIsUniverseUnfolded(true);
        }
        window.requestAnimationFrame(() => {
          jumpTo(targetId);
        });
      },
    });
  }, []);

  // Natural scrolling updates the active chapter indicator and URL hash smoothly
  // WITHOUT triggering disruptive full-screen water animations while reading.
  useEffect(() => {
    const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (waterController.isBusy()) return;
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0].target.id as ChapterId;
        if (id === currentRef.current) return;
        currentRef.current = id;
        setCurrentChapterId(id);
        try {
          window.history.replaceState({ chapterId: id }, '', `#${id}`);
        } catch {
          // ignore
        }
      },
      { root: null, rootMargin: '-20% 0px -30% 0px', threshold: [0.1, 0.3, 0.6] }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isUniverseUnfolded]);

  // Initialize from URL hash and handle browser Back/Forward
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as ChapterId;
    if (CHAPTERS.some((c) => c.id === hash) && hash !== 'welcome') {
      window.setTimeout(() => navigateToChapter(hash, false), 120);
    }
    const handlePopState = (event: PopStateEvent) => {
      const fromState = event.state?.chapterId as ChapterId | undefined;
      const fromHash = window.location.hash.replace('#', '') as ChapterId;
      const target = fromState || (CHAPTERS.some((c) => c.id === fromHash) ? fromHash : 'welcome');
      navigateToChapter(target, false);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigateToChapter]);

  // Complete experience replay/reset
  const handleReplay = useCallback(() => {
    void waterController.play({
      onPeak: () => {
        setReplayKey((prev) => prev + 1);
        setIsUniverseUnfolded(false);
        currentRef.current = 'welcome';
        setCurrentChapterId('welcome');
        try {
          window.history.pushState({ chapterId: 'welcome' }, '', '#welcome');
        } catch {
          // ignore
        }
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      },
    });
  }, []);

  return (
    <AudioProvider>
      <div className="min-h-screen w-full relative flex flex-col bg-cream selection:bg-sunshine selection:text-cocoa overflow-x-hidden">
        <FloatingDecorations />
        <WaterTransition />

        {/* Top Storybook Sticky Header & Dynamic Scroll Progress */}
        <Navbar
          currentChapterId={currentChapterId}
          onSelectChapter={(id) => navigateToChapter(id)}
          onOpenJarModal={() => setJarModalOpen(true)}
        />

        {/* Main Continuous Scrollable Story Stream */}
        <main className="flex-1 w-full relative z-10">
          {/* =========================================================================
              CHAPTER 01: WELCOME (OPENING CAKE CEREMONY & STORY INTRODUCTION)
              ========================================================================= */}
          <section id="welcome" className="snap-start relative scroll-mt-16">
            <WelcomeScreen
              isUnfolded={isUniverseUnfolded}
              resetKey={replayKey}
              onUnfold={() => void waterController.play({ onPeak: () => setIsUniverseUnfolded(true) })}
              onNext={() => navigateToChapter('birthday-queen')}
              onReplay={handleReplay}
            />
          </section>

          {!isUniverseUnfolded ? (
            <div className="py-12 sm:py-16 px-4 text-center">
              <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-cream-paper border-2 border-dashed border-cocoa/35 shadow-sm text-xs sm:text-sm font-extrabold text-cocoa">
                <span>🎂 Cut the cake above to unfold all 8 chapters of Mumma&apos;s Little Universe!</span>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* =========================================================================
                  CHAPTER 02: THE QUEEN
                  ========================================================================= */}
              <section id="birthday-queen" className="snap-start relative scroll-mt-16">
                <BirthdayQueen
                  onPrev={() => navigateToChapter('welcome')}
                  onNext={() => navigateToChapter('academic-legend')}
                />
              </section>

              {/* =========================================================================
                  CHAPTER 03: HER WORLD & ACADEMIC LEGEND
                  ========================================================================= */}
              <section id="academic-legend" className="snap-start relative scroll-mt-16">
                <AcademicJourney
                  onPrev={() => navigateToChapter('birthday-queen')}
                  onNext={() => navigateToChapter('memory-museum')}
                />
              </section>

              {/* =========================================================================
                  CHAPTER 04: THE MEMORY MUSEUM (ALL 44 UNIQUE PHOTOGRAPHS)
                  ========================================================================= */}
              <section id="memory-museum" className="snap-start relative scroll-mt-16">
                <MemoryMuseum
                  onPrev={() => navigateToChapter('academic-legend')}
                  onNext={() => navigateToChapter('letters')}
                />
              </section>

              {/* =========================================================================
                  CHAPTER 05: FIVE LETTERS FROM THE HEART
                  ========================================================================= */}
              <section id="letters" className="snap-start relative scroll-mt-16">
                <LetterEnvelopes
                  onPrev={() => navigateToChapter('memory-museum')}
                  onNext={() => navigateToChapter('family')}
                />
              </section>

              {/* =========================================================================
                  CHAPTER 06: OUR FAMILY
                  ========================================================================= */}
              <section id="family" className="snap-start relative scroll-mt-16">
                <FamilyMessages
                  onPrev={() => navigateToChapter('letters')}
                  onNext={() => navigateToChapter('birthday-cake')}
                />
              </section>

              {/* =========================================================================
                  CHAPTER 07: THE BIRTHDAY CAKE
                  ========================================================================= */}
              <section id="birthday-cake" className="snap-start relative scroll-mt-16">
                <BirthdayCake
                  resetKey={replayKey}
                  onPrev={() => navigateToChapter('family')}
                  onNext={() => navigateToChapter('gift-reveal')}
                />
              </section>

              {/* =========================================================================
                  CHAPTER 08: THE FINAL SURPRISE & GRAND FINALE
                  ========================================================================= */}
              <section id="gift-reveal" className="snap-start relative scroll-mt-16">
                <GiftReveal
                  resetKey={replayKey}
                  onPrev={() => navigateToChapter('birthday-cake')}
                  onReplayAll={handleReplay}
                  onOpenJarModal={() => setJarModalOpen(true)}
                />
              </section>

              {/* Global Storybook Colophon & Quick Chapter Index Footer */}
              <footer className="py-12 px-4 text-center border-t-2 border-cocoa/15 bg-cream-paper/85 backdrop-blur-xs">
                <div className="max-w-3xl mx-auto space-y-4">
                  <div className="flex flex-wrap items-center justify-center gap-1.5">
                    {CHAPTERS.map((chap) => (
                      <button
                        key={chap.id}
                        type="button"
                        onClick={() => navigateToChapter(chap.id)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold border transition-all cursor-pointer ${
                          currentChapterId === chap.id
                            ? 'bg-sunshine border-cocoa text-cocoa shadow-2xs'
                            : 'bg-cream border-cocoa/25 text-cocoa-light hover:border-cocoa hover:text-cocoa'
                        }`}
                      >
                        {chap.number} • {chap.shortTitle}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <p className="font-heading text-sm sm:text-base font-bold text-cocoa">
                      THE NISHA UNIVERSE • HAPPY BIRTHDAY MUMMA ❤️
                    </p>
                    <p className="font-marathi text-xs sm:text-sm font-bold text-cocoa-light">
                      &ldquo;तू आहेस म्हणून आमचं जग सुंदर आहे!&rdquo;
                    </p>
                    <p className="text-[11px] font-bold text-cocoa/65 pt-1">
                      Designed &amp; coded with boundless love by Shriraj • 9 November 2026
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setJarModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blush-light hover:bg-blush border border-cocoa text-xs font-extrabold text-cocoa cursor-pointer transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>24 Appreciation Notes</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateToChapter('welcome')}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-cream hover:bg-sunshine-soft border border-cocoa text-xs font-extrabold text-cocoa cursor-pointer transition-colors"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                      <span>Back to Top</span>
                    </button>
                  </div>
                </div>
              </footer>
            </motion.div>
          )}
        </main>

        {/* Appreciation Jar Modal (Accessible anytime from Navbar or Final Chapter) */}
        <AppreciationJar
          isOpen={jarModalOpen}
          onClose={() => setJarModalOpen(false)}
        />

        {/* Marathi Birthday Song Player Modal Drawer */}
        <AudioPlayerDrawer />
      </div>
    </AudioProvider>
  );
}

export default App;
