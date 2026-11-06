# THE NISHA UNIVERSE ❤️
> **"तुझ्यासाठी... कारण तू खूप खास आहेस! ❤️"**  
> A chapter-by-chapter interactive digital birthday storybook, family memory museum, and personal letter collection created for **Nisha (Mumma)** by her son, **Shriraj** (9 November 2026).

---

## 1. Interactive 8-Chapter Storybook Architecture

Instead of a conventional long-scrolling webpage, **The Nisha Universe** is architected as a **full-viewport (`100svh`) 8-chapter interactive presentation** (`OPEN → DISCOVER → INTERACT → REVEAL → CONTINUE`).

At any given moment, **only one main chapter is mounted and visible**. Inactive chapters are completely unmounted from the DOM so they cannot be scrolled into or accidentally clicked.

### The 8 Storybook Chapters (`src/data/chapters.ts`)
1. **`01 — WELCOME` (`welcome` / `WelcomeScreen.tsx`):**
   - Full-screen invitation scene with floating pastel balloons, original cartoon mascot (*Chotu*), Marathi greeting, and Hero Polaroids (`photo-002` & `photo-003`).
   - Clicking **`LET'S BEGIN ❤️`** launches confetti and transitions into Chapter 02.
2. **`02 — THE QUEEN` (`birthday-queen` / `BirthdayQueen.tsx`):**
   - Displays Mumma's iconic Royal Enfield motorcycle portrait (`photo-025`) and cool shades portrait (`photo-010`).
   - Interactive switcher between the **4 Personality Modes** (`PROFESSOR MODE`, `RESEARCH MODE`, `MUMMA MODE`, `STRICT MODE`) and **4 Playful Household Awards**.
   - Advances via **`NEXT: DISCOVER HER WORLD →`**.
3. **`03 — HER WORLD` (`academic-legend` / `AcademicJourney.tsx`):**
   - Celebrates Mumma as Professor, Researcher, PhD Scholar, and Lifelong Learner with an animated live dashboard and real photographs (`photo-017`, `photo-044`).
   - Advances via **`NEXT: ENTER THE MEMORY MUSEUM →`**.
4. **`04 — MEMORIES` (`memory-museum` / `MemoryMuseum.tsx`, `PhotoLightbox.tsx`, `ThenVsNow.tsx`):**
   - **Initial State:** Displays a hardcover scrapbook **Memory Album Cover** (*"A THOUSAND PICTURES. A MILLION FEELINGS."*) with a 2×2 Polaroid preview stack and **`OPEN OUR MEMORY ALBUM`** button.
   - **Open Album State:** Opens the contained full-screen album experience with 6 category filters, 44 curated photographs, full-screen Lightbox (`ArrowLeft`, `ArrowRight`, `Escape`), **3 interactive Then-vs-Now comparison sliders**, and a **`Back to Album Cover`** button.
   - Advances via **`NEXT: SOMETHING FROM MY HEART →`**.
5. **`05 — MY LETTERS` (`letters` / `LetterEnvelopes.tsx`):**
   - **Initial State:** Displays **5 sealed wax-stamped envelopes** (`0 of 5 opened`).
   - Clicking any envelope unfolds its lined letter paper overlay with a **`Close Letter & Return to Envelopes`** button and a shortcut to open the next envelope.
   - Visitors can advance at any time via **`NEXT: A MESSAGE FROM OUR FAMILY →`** without being forced to open every envelope first.
6. **`06 — OUR FAMILY` (`family` / `FamilyMessages.tsx`):**
   - Displays real family photographs alongside two dedicated message cards: **`FROM PAPA`** (with an on-screen **Edit / Save** button for Papa's review) and **`FROM YOUR SON`**.
   - Advances via **`NEXT: IT'S CAKE TIME →`**.
7. **`07 — CAKE TIME` (`birthday-cake` / `BirthdayCake.tsx`):**
   - Displays the two-tier pastel birthday cake with 5 individually tappable candles.
   - Once all 5 candles are extinguished, triggers confetti, reveals the birthday blessing banner (*"HAPPY BIRTHDAY MUMMA! 🎂"*), and unveils **`ONE LAST SURPRISE AWAITS YOU...`** with the **`DISCOVER YOUR SURPRISE 🎁`** button.
8. **`08 — SURPRISE` (`gift-reveal` / `GiftReveal.tsx`):**
   - Displays the wrapped gift box and 5 interactive golden stars.
   - Clicking all 5 stars reveals the 5 gratitude messages, unlocks the gift box, displays the final emotional message, and provides the **`Replay Birthday Experience From Start`** button.

### Compact Storybook Header & Appreciation Jar Modal
- **Top Header (`Navbar.tsx`):** Shows a subtle progress bar, the current chapter badge (`01 / 08 • WELCOME`), a compact popover menu to jump to any of the 8 chapters (`01 — WELCOME` through `08 — SURPRISE`), the **`Appreciation Jar`** modal button (24 notes), and the **`Music: OFF / ON`** toggle.
- **Bottom Navigation Bar (`ChapterFooterNav.tsx`):** Appears on Chapters 02–08 with a **`BACK`** button and the chapter's deliberate **`NEXT: ... →`** action button.

---

## 2. Running Locally

```bash
cd "C:\Users\shrir\.gemini\antigravity\scratch\mummas-little-universe"
npm install
npm run dev
```

To build for production:
```bash
npm run build
npm run preview
```
