import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CHAPTERS, ChapterId, getChapterById } from './data/chapters';
import { Navbar } from './components/Navbar';
import { ChapterFooterNav } from './components/ChapterFooterNav';
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
import { useReducedMotion } from './hooks/useReducedMotion';

export function App() {
  const [currentChapterId, setCurrentChapterId] = useState<ChapterId>('welcome');
  const [replayKey, setReplayKey] = useState(0);
  const [jarModalOpen, setJarModalOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  // Navigate to a specific chapter and sync with browser History API
  const navigateToChapter = useCallback(
    (targetId: ChapterId, pushHistory = true) => {
      setCurrentChapterId(targetId);
      if (pushHistory) {
        try {
          window.history.pushState({ chapterId: targetId }, '', `#${targetId}`);
        } catch {
          // ignore history errors in sandboxed frames
        }
      }
    },
    []
  );

  // Initialize from URL hash or set initial state, and listen for Browser Back/Forward
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as ChapterId;
    const validChapter = CHAPTERS.find((c) => c.id === hash);
    if (validChapter) {
      setCurrentChapterId(validChapter.id);
    } else {
      try {
        window.history.replaceState({ chapterId: 'welcome' }, '', '#welcome');
      } catch {
        // ignore
      }
    }

    const handlePopState = (event: PopStateEvent) => {
      const stateChapter = event.state?.chapterId as ChapterId | undefined;
      if (stateChapter && CHAPTERS.some((c) => c.id === stateChapter)) {
        setCurrentChapterId(stateChapter);
      } else {
        const currentHash = window.location.hash.replace('#', '') as ChapterId;
        const found = CHAPTERS.find((c) => c.id === currentHash);
        if (found) setCurrentChapterId(found.id);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const currentChapter = getChapterById(currentChapterId);

  const handleNextChapter = useCallback(() => {
    const nextIdx = currentChapter.index + 1;
    if (nextIdx < CHAPTERS.length) {
      navigateToChapter(CHAPTERS[nextIdx].id);
    }
  }, [currentChapter.index, navigateToChapter]);

  const handlePrevChapter = useCallback(() => {
    const prevIdx = currentChapter.index - 1;
    if (prevIdx >= 0) {
      navigateToChapter(CHAPTERS[prevIdx].id);
    }
  }, [currentChapter.index, navigateToChapter]);

  const handleReplay = useCallback(() => {
    setReplayKey((prev) => prev + 1);
    navigateToChapter('welcome');
  }, [navigateToChapter]);

  return (
    <div className="h-[100svh] w-screen overflow-hidden flex flex-col relative selection:bg-sunshine selection:text-cocoa bg-cream">
      <FloatingDecorations />

      {/* Top Storybook Header & Subtle Progress Indicator */}
      <Navbar
        currentChapterId={currentChapterId}
        onSelectChapter={(id) => navigateToChapter(id)}
        onOpenJarModal={() => setJarModalOpen(true)}
      />

      {/* Single Active Chapter Viewport Stage — Inactive chapters are unmounted */}
      <main className="flex-1 min-h-0 relative overflow-hidden z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentChapterId}-${replayKey}`}
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -14 }}
            transition={{
              duration: reducedMotion ? 0.05 : 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-full w-full"
          >
            {currentChapterId === 'welcome' && (
              <WelcomeScreen onNext={handleNextChapter} />
            )}

            {currentChapterId === 'birthday-queen' && (
              <BirthdayQueen onNext={handleNextChapter} />
            )}

            {currentChapterId === 'academic-legend' && (
              <AcademicJourney onNext={handleNextChapter} />
            )}

            {currentChapterId === 'memory-museum' && (
              <MemoryMuseum onNext={handleNextChapter} />
            )}

            {currentChapterId === 'letters' && (
              <LetterEnvelopes onNext={handleNextChapter} />
            )}

            {currentChapterId === 'family' && (
              <FamilyMessages onNext={handleNextChapter} />
            )}

            {currentChapterId === 'birthday-cake' && (
              <BirthdayCake resetKey={replayKey} onNext={handleNextChapter} />
            )}

            {currentChapterId === 'gift-reveal' && (
              <GiftReveal
                resetKey={replayKey}
                onReplayAll={handleReplay}
                onOpenJarModal={() => setJarModalOpen(true)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Chapter Navigation Bar (Back + Deliberate Continue CTA) */}
      <ChapterFooterNav
        currentChapterId={currentChapterId}
        onPrev={handlePrevChapter}
        onNext={handleNextChapter}
        onReplay={handleReplay}
      />

      {/* Appreciation Jar Modal (Accessible anytime from Navbar or Final Chapter) */}
      <AppreciationJar
        isOpen={jarModalOpen}
        onClose={() => setJarModalOpen(false)}
      />
    </div>
  );
}

export default App;
