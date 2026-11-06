import React, { useState } from 'react';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { FloatingDecorations } from './components/FloatingDecorations';
import { WelcomeScreen } from './components/WelcomeScreen';
import { BirthdayQueen } from './components/BirthdayQueen';
import { AcademicJourney } from './components/AcademicJourney';
import { MemoryMuseum } from './components/MemoryMuseum';
import { LetterEnvelopes } from './components/LetterEnvelopes';
import { AppreciationJar } from './components/AppreciationJar';
import { FamilyMessages } from './components/FamilyMessages';
import { BirthdayCake } from './components/BirthdayCake';
import { GiftReveal } from './components/GiftReveal';
import { Footer } from './components/Footer';
import { useReducedMotion } from './hooks/useReducedMotion';

export function App() {
  const [replayKey, setReplayKey] = useState(0);
  const reducedMotion = useReducedMotion();

  const handleReplay = () => {
    setReplayKey((prev) => prev + 1);
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-sunshine selection:text-cocoa">
      <ScrollProgress />
      <FloatingDecorations />
      <Navbar />

      <main className="flex-1">
        {/* SECTION 1 — THE SECRET BIRTHDAY INVITATION */}
        <WelcomeScreen />

        {/* SECTION 2 — MEET THE BIRTHDAY QUEEN */}
        <BirthdayQueen />

        {/* SECTION 3 — THE ACADEMIC LEGEND */}
        <AcademicJourney />

        {/* SECTION 4 — THE NISHA MEMORY MUSEUM (includes Then vs Now comparison) */}
        <MemoryMuseum />

        {/* SECTION 5 — THINGS I DON'T SAY ENOUGH (5 Interactive Envelopes) */}
        <LetterEnvelopes />

        {/* PART 5.1 — APPRECIATION JAR (24 Genuine Notes) */}
        <AppreciationJar />

        {/* SECTION 6 — MADE WITH LOVE, FROM OUR FAMILY */}
        <FamilyMessages />

        {/* SECTION 7 — THE BIRTHDAY CAKE */}
        <BirthdayCake resetKey={replayKey} />

        {/* SECTION 8 — THE PHYSICAL GIFT REVEAL */}
        <GiftReveal resetKey={replayKey} onReplayAll={handleReplay} />
      </main>

      <Footer onReplay={handleReplay} />
    </div>
  );
}

export default App;
