export type ChapterId =
  | 'welcome'
  | 'birthday-queen'
  | 'academic-legend'
  | 'memory-museum'
  | 'letters'
  | 'family'
  | 'birthday-cake'
  | 'gift-reveal';

export interface ChapterMeta {
  id: ChapterId;
  number: string;
  index: number;
  shortTitle: string;
  fullTitle: string;
  marathiSubtitle: string;
  nextCtaLabel?: string;
}

export const CHAPTERS: ChapterMeta[] = [
  {
    id: 'welcome',
    number: '01',
    index: 0,
    shortTitle: 'WELCOME',
    fullTitle: '01 — WELCOME',
    marathiSubtitle: 'स्वागतम् • आजचा दिवस तुझा!',
    nextCtaLabel: "LET'S BEGIN ❤️",
  },
  {
    id: 'birthday-queen',
    number: '02',
    index: 1,
    shortTitle: 'THE QUEEN',
    fullTitle: '02 — THE QUEEN',
    marathiSubtitle: 'आपल्या घराची राणी 👑',
    nextCtaLabel: 'NEXT: DISCOVER HER WORLD →',
  },
  {
    id: 'academic-legend',
    number: '03',
    index: 2,
    shortTitle: 'HER WORLD',
    fullTitle: '03 — HER WORLD',
    marathiSubtitle: 'शिकण्याची अखंड जिद्द 🎓',
    nextCtaLabel: 'NEXT: ENTER THE MEMORY MUSEUM →',
  },
  {
    id: 'memory-museum',
    number: '04',
    index: 3,
    shortTitle: 'MEMORIES',
    fullTitle: '04 — MEMORIES',
    marathiSubtitle: 'हजारो आठवणींचा ठेवा 📸',
    nextCtaLabel: 'NEXT: SOMETHING FROM MY HEART →',
  },
  {
    id: 'letters',
    number: '05',
    index: 4,
    shortTitle: 'MY LETTERS',
    fullTitle: '05 — MY LETTERS',
    marathiSubtitle: 'मनातलं काही न बोललेलं 💌',
    nextCtaLabel: 'NEXT: A MESSAGE FROM OUR FAMILY →',
  },
  {
    id: 'family',
    number: '06',
    index: 5,
    shortTitle: 'OUR FAMILY',
    fullTitle: '06 — OUR FAMILY',
    marathiSubtitle: 'आपलं कुटुंब, आपलं प्रेम ❤️',
    nextCtaLabel: "NEXT: IT'S CAKE TIME →",
  },
  {
    id: 'birthday-cake',
    number: '07',
    index: 6,
    shortTitle: 'CAKE TIME',
    fullTitle: '07 — CAKE TIME',
    marathiSubtitle: 'वाढदिवसाचा केक! 🎂',
    nextCtaLabel: 'DISCOVER YOUR SURPRISE 🎁',
  },
  {
    id: 'gift-reveal',
    number: '08',
    index: 7,
    shortTitle: 'SURPRISE',
    fullTitle: '08 — SURPRISE',
    marathiSubtitle: 'खास तुझ्यासाठी सरप्राईज 🎁',
  },
];

export const getChapterById = (id: ChapterId): ChapterMeta =>
  CHAPTERS.find((c) => c.id === id) || CHAPTERS[0];
