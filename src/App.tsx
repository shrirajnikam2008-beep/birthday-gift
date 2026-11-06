import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CHAPTERS, ChapterId } from './data/chapters';
import { Navbar } from './components/Navbar';
import { FloatingDecorations } from './components/FloatingDecorations';
import { ChapterTransitionDivider } from './components/ChapterTransitionDivider';
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
import { WaveReveal } from './components/WaveReveal';

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

  // Smoothly scroll to a target chapter section and update URL hash
  const navigateToChapter = useCallback((targetId: ChapterId, pushHistory = true) => {
    setCurrentChapterId(targetId);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    if (pushHistory) {
      try {
        window.history.pushState({ chapterId: targetId }, '', `#${targetId}`);
      } catch {
        // ignore history errors in sandboxed frames
      }
    }
  }, []);

  // IntersectionObserver to sync active chapter in Navbar during vertical scrolling
  useEffect(() => {
    const chapterIds: ChapterId[] = CHAPTERS.map((c) => c.id);
    const sectionElements = chapterIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible sections sorted by intersection ratio
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort to prioritize the one occupying the most viewport space
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const topVisibleId = visibleEntries[0].target.id as ChapterId;
          if (CHAPTERS.some((c) => c.id === topVisibleId)) {
            setCurrentChapterId(topVisibleId);
            try {
              window.history.replaceState({ chapterId: topVisibleId }, '', `#${topVisibleId}`);
            } catch {
              // ignore
            }
          }
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -30% 0px',
        threshold: [0.1, 0.3, 0.6],
      }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Initialize from URL hash or popstate
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as ChapterId;
    const validChapter = CHAPTERS.find((c) => c.id === hash);
    if (validChapter) {
      setCurrentChapterId(validChapter.id);
      const el = document.getElementById(validChapter.id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }

    const handlePopState = (event: PopStateEvent) => {
      const stateChapter = event.state?.chapterId as ChapterId | undefined;
      if (stateChapter && CHAPTERS.some((c) => c.id === stateChapter)) {
        setCurrentChapterId(stateChapter);
        const el = document.getElementById(stateChapter);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleReplay = useCallback(() => {
    setReplayKey((prev) => prev + 1);
    setIsUniverseUnfolded(false);
    navigateToChapter('welcome');
  }, [navigateToChapter]);

  return (
    <AudioProvider>
      <div className="min-h-screen w-full relative flex flex-col bg-cream selection:bg-sunshine selection:text-cocoa snap-y snap-proximity overflow-x-hidden">
      <FloatingDecorations />

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
            onUnfold={() => setIsUniverseUnfolded(true)}
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
            {/* Transition 1: Welcome -> Birthday Queen */}
            <ChapterTransitionDivider type="welcome-to-queen" />

            {/* =========================================================================
                CHAPTER 02: THE QUEEN
                ========================================================================= */}
            <section id="birthday-queen" className="snap-start relative scroll-mt-16">
              <WaveReveal><BirthdayQueen /></WaveReveal>
            </section>

            {/* Transition 2: Birthday Queen -> Academic Legend */}
            <ChapterTransitionDivider type="queen-to-academic" />

            {/* =========================================================================
                CHAPTER 03: HER WORLD & ACADEMIC LEGEND
                ========================================================================= */}
            <section id="academic-legend" className="snap-start relative scroll-mt-16">
              <WaveReveal><AcademicJourney /></WaveReveal>
            </section>

            {/* Transition 3: Academic Legend -> Memory Museum */}
            <ChapterTransitionDivider type="academic-to-museum" />

            {/* =========================================================================
                CHAPTER 04: THE MEMORY MUSEUM (ALL 44 UNIQUE PHOTOGRAPHS)
                ========================================================================= */}
            <section id="memory-museum" className="snap-start relative scroll-mt-16">
              <WaveReveal><MemoryMuseum /></WaveReveal>
            </section>

            {/* Transition 4: Memory Museum -> Letters */}
            <ChapterTransitionDivider type="museum-to-letters" />

            {/* =========================================================================
                CHAPTER 05: FIVE LETTERS FROM THE HEART
                ========================================================================= */}
            <section id="letters" className="snap-start relative scroll-mt-16">
              <WaveReveal><LetterEnvelopes /></WaveReveal>
            </section>

            {/* Transition 5: Letters -> Our Family */}
            <ChapterTransitionDivider type="letters-to-family" />

            {/* =========================================================================
                CHAPTER 06: OUR FAMILY
                ========================================================================= */}
            <section id="family" className="snap-start relative scroll-mt-16">
              <WaveReveal><FamilyMessages /></WaveReveal>
            </section>

            {/* Transition 6: Our Family -> Birthday Cake */}
            <ChapterTransitionDivider type="family-to-cake" />

            {/* =========================================================================
                CHAPTER 07: THE BIRTHDAY CAKE
                ========================================================================= */}
            <section id="birthday-cake" className="snap-start relative scroll-mt-16">
              <WaveReveal><BirthdayCake
                resetKey={replayKey}
                onNext={() => navigateToChapter('gift-reveal')}
              /></WaveReveal>
            </section>

            {/* Transition 7: Birthday Cake -> Gift Reveal */}
            <ChapterTransitionDivider type="cake-to-gift" />

            {/* =========================================================================
                CHAPTER 08: THE FINAL SURPRISE & GRAND FINALE
                ========================================================================= */}
            <section id="gift-reveal" className="snap-start relative scroll-mt-16">
              <WaveReveal><GiftReveal
                resetKey={replayKey}
                onReplayAll={handleReplay}
                onOpenJarModal={() => setJarModalOpen(true)}
              /></WaveReveal>
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
