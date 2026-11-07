import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
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
  const programmaticRef = useRef(false);

  const jumpTo = (id: ChapterId) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top: Math.max(0, top), behavior: 'instant' as ScrollBehavior });
  };

  // Every programmatic route (menu, CTA, hash, back/forward) goes through the water splash:
  // the page jumps while the viewport is fully covered, then the water drains away.
  const navigateToChapter = useCallback((targetId: ChapterId, pushHistory = true) => {
    if (!document.getElementById(targetId)) return;
    if (pushHistory) {
      try {
        window.history.pushState({ chapterId: targetId }, '', `#${targetId}`);
      } catch {
        // ignore history errors in sandboxed frames
      }
    }
    if (targetId === currentRef.current) {
      jumpTo(targetId);
      return;
    }
    programmaticRef.current = true;
    currentRef.current = targetId;
    setCurrentChapterId(targetId);
    void waterController
      .play({ onPeak: () => jumpTo(targetId) })
      .finally(() => {
        // allow scroll-driven splashes again once the page has settled
        window.setTimeout(() => {
          if (!waterController.isBusy()) programmaticRef.current = false;
        }, 400);
      });
  }, []);

  // Natural scrolling across a chapter boundary also triggers the splash (cosmetic, never blocks scroll).
  useEffect(() => {
    const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
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
        if (!programmaticRef.current && !waterController.isBusy()) {
          void waterController.play();
        }
      },
      { root: null, rootMargin: '-20% 0px -30% 0px', threshold: [0.1, 0.3, 0.6] }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isUniverseUnfolded]);

  // Initialize from URL hash and handle browser back/forward
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as ChapterId;
    if (CHAPTERS.some((c) => c.id === hash) && hash !== 'welcome') {
      window.setTimeout(() => navigateToChapter(hash, false), 150);
    }
    const handlePopState = (event: PopStateEvent) => {
      const stateChapter = event.state?.chapterId as ChapterId | undefined;
      if (stateChapter && CHAPTERS.some((c) => c.id === stateChapter)) {
        navigateToChapter(stateChapter, false);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigateToChapter]);

  const handleReplay = useCallback(() => {
    setReplayKey((prev) => prev + 1);
    setIsUniverseUnfolded(false);
    navigateToChapter('welcome');
  }, [navigateToChapter]);

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
            onUnfold={() => void waterController.play({ onPeak: () => setIsUniverseUnfolded(true) })}
            onNext={() => navigateToChapter('birthday-queen')}
            onReplay={() => setIsUniverseUnfolded(false)}
          />
        </section>

        {!isUniverseUnfolded ? (
          <div className="py-12 sm:py-16 px-4 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-cream-paper border-2 border-dashed border-cocoa/30 shadow-sm text-xs sm:text-sm font-extrabold text-cocoa">
              <span>🎂 Cut the cake above to unfold all chapters of Mumma&apos;s Little Universe!</span>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >

            {/* =========================================================================
                CHAPTER 02: THE QUEEN
                ========================================================================= */}
            <section id="birthday-queen" className="snap-start relative scroll-mt-16">
              <BirthdayQueen />
            </section>

            {/* =========================================================================
                CHAPTER 03: HER WORLD & ACADEMIC LEGEND
                ========================================================================= */}
            <section id="academic-legend" className="snap-start relative scroll-mt-16">
              <AcademicJourney />
            </section>

            {/* =========================================================================
                CHAPTER 04: THE MEMORY MUSEUM (ALL 44 UNIQUE PHOTOGRAPHS)
                ========================================================================= */}
            <section id="memory-museum" className="snap-start relative scroll-mt-16">
              <MemoryMuseum />
            </section>

            {/* =========================================================================
                CHAPTER 05: FIVE LETTERS FROM THE HEART
                ========================================================================= */}
            <section id="letters" className="snap-start relative scroll-mt-16">
              <LetterEnvelopes />
            </section>

            {/* =========================================================================
                CHAPTER 06: OUR FAMILY
                ========================================================================= */}
            <section id="family" className="snap-start relative scroll-mt-16">
              <FamilyMessages />
            </section>

            {/* =========================================================================
                CHAPTER 07: THE BIRTHDAY CAKE
                ========================================================================= */}
            <section id="birthday-cake" className="snap-start relative scroll-mt-16">
              <BirthdayCake
                resetKey={replayKey}
                onNext={() => navigateToChapter('gift-reveal')}
              />
            </section>

            {/* =========================================================================
                CHAPTER 08: THE FINAL SURPRISE & GRAND FINALE
                ========================================================================= */}
            <section id="gift-reveal" className="snap-start relative scroll-mt-16">
              <GiftReveal
                resetKey={replayKey}
                onReplayAll={handleReplay}
                onOpenJarModal={() => setJarModalOpen(true)}
              />
            </section>

            {/* Global Storybook Footer Note */}
            <footer className="py-12 px-4 text-center border-t border-cocoa/15 bg-cream-paper/70 backdrop-blur-xs">
              <div className="max-w-md mx-auto space-y-2">
                <p className="font-heading text-sm sm:text-base font-bold text-cocoa">
                  THE NISHA UNIVERSE • HAPPY BIRTHDAY MUMMA ❤️
                </p>
                <p className="font-marathi text-xs sm:text-sm font-bold text-cocoa-light">
                  &ldquo;तू आहेस म्हणून आमचं जग सुंदर आहे!&rdquo;
                </p>
                <p className="text-[11px] font-bold text-cocoa/60 pt-2">
                  Designed &amp; coded with boundless love by Shriraj • 9 November 2026
                </p>
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
