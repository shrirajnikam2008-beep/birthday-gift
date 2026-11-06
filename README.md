# THE NISHA UNIVERSE ❤️
> **"तुझ्यासाठी... कारण तू खूप खास आहेस! ❤️"**  
> A personal, interactive digital scrapbook, family memory museum, and birthday surprise created for **Nisha (Mumma)** by her son, **Shriraj** (9 November 2026).

---

## 1. Project Overview & Emotional Journey
Built from absolute zero using **React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Canvas Confetti, and Lucide Icons**, this project follows the emotional arc:

`FUN → ADMIRATION → NOSTALGIA → GRATITUDE → FAMILY LOVE → CELEBRATION → EMOTION`

### All 8 Major Sections + Interactive Features Included
1. **Section 1 — The Secret Birthday Invitation (`WelcomeScreen.tsx`):** Sunshine yellow opening invitation with floating balloons, original playful mascot (*Chotu*), Marathi greeting, Hero Polaroid (`photo-002` & `photo-003`), and confetti-triggering celebration button.
2. **Section 2 — Meet The Birthday Queen (`BirthdayQueen.tsx`):** Four animated personality mode cards (`PROFESSOR MODE`, `RESEARCH MODE`, `MUMMA MODE`, `STRICT MODE`), the iconic Royal Enfield motorcycle portrait (`photo-025`), and playful fictional household awards.
3. **Section 3 — The Academic Legend (`AcademicJourney.tsx`):** Celebrates Mumma as a Professor, Researcher, PhD Scholar, and Lifelong Learner with an interactive live command dashboard and real academic/get-together photographs (`photo-017`, `photo-044`, `photo-012`).
4. **Section 4 — The Nisha Memory Museum (`MemoryMuseum.tsx`, `PhotoLightbox.tsx`, `ThenVsNow.tsx`):**
   - Dynamically driven by `src/data/photos.json` (44 active curated photographs across 6 categories, excluding exact duplicates).
   - Full-screen Lightbox with keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`), captions, and confirmed dates.
   - **Interactive Then vs Now Slider (`ThenVsNow.tsx`):** Drag or slide between 3 curated historical vs. recent pairs (`Mumma & Shriraj 2016 vs 2026`, `Mumma & Papa Then vs 2025`, and `Solo Portrait Then vs Now`).
5. **Section 5 — Things I Don't Say Enough (`LetterEnvelopes.tsx`):** Five interactive wax-sealed envelopes (`Thank You for Everything`, `What I Admire About You`, `Things I Learned From You`, `When I Miss Home`, and `A Letter From Your Son`) that unfold onto lined letter paper.
6. **Appreciation Jar (`AppreciationJar.tsx`):** Interactive illustrated Mason jar containing **24 genuine, non-repetitive appreciation notes** in English and Marathi.
7. **Section 6 — Made With Love, From Our Family (`FamilyMessages.tsx`):** Two dedicated cards (`FROM PAPA` and `FROM YOUR SON`). Includes an on-screen **Edit / Save** button on Papa's card so Papa can easily review, customise, and approve his message directly in the browser or via `src/data/messages.ts`.
8. **Section 7 — The Birthday Cake (`BirthdayCake.tsx`):** Two-tier pastel illustrated birthday cake with 5 individually tappable candles (no microphone permission required), confetti celebration, and Marathi birthday blessing reveal.
9. **Section 8 — The Physical Gift Reveal (`GiftReveal.tsx`):** Five interactive golden stars that reveal individual gratitude messages and unlock the wrapped birthday gift box, concluding with the final Marathi message and a **Replay Experience** button.
10. **Gentle Music Box Audio (`Navbar.tsx`):** 100% royalty-free Web Audio music-box melody — **OFF by default**, user-controlled via the top navbar.

---

## 2. Running Locally

```bash
cd "C:\Users\shrir\.gemini\antigravity\scratch\mummas-little-universe"
npm install
npm run dev
```

To create a production build:
```bash
npm run build
npm run preview
```

---

## 3. How to Edit Captions, Letters, or Replace Photographs

### Editing Photo Captions, Categories, or Dates
1. Open `src/data/photos.json`.
2. Find the photo by its `id` (e.g. `"photo-002"`) or `originalFilename` (refer to `photo_inventory.csv` or `public/images/originals_manifest/contact_sheet.jpg`).
3. Edit the `"caption"`, `"museumCategory"`, or `"date"` field and save. The Memory Museum and Lightbox update automatically.

### Editing Letters or Papa's Message
- **On-screen (Quickest for Papa):** In Section 6 (*Made With Love, From Our Family*), click the **Edit** button on the top-right of the `FROM PAPA` card, modify the text, and click **Save**.
- **In Code (Permanent):** Open `src/data/messages.ts` and edit `familyMessages` or `letterEnvelopes`.

### Replacing or Adding a New Photograph
1. Place the new `.webp` or `.jpg` image inside the appropriate folder under `public/images/<category>/`.
2. Add or update its entry in `src/data/photos.json`.

---

## 4. Deployment Instructions (Unlisted Shareable URL on Vercel)

Per **Part 9 (Privacy & Permission Rules)**, **nothing has been deployed or published yet**. When you are ready to create an unlisted shareable link:

1. **Keep Search Engines Out:** `index.html` already includes `<meta name="robots" content="noindex, nofollow" />` and `public/robots.txt` disallows all crawlers so the URL stays unlisted.
2. **Deploy via Vercel CLI (No GitHub upload required):**
   ```bash
   cd "C:\Users\shrir\.gemini\antigravity\scratch\mummas-little-universe"
   npx vercel
   ```
   Follow the interactive prompt to deploy directly from your local machine to a private/unlisted `.vercel.app` URL that you can share on WhatsApp with Mumma and Papa.
