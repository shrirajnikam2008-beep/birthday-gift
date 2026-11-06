import rawPhotos from './photos.json';

export interface PhotoItem {
  id: string;
  originalFilename: string;
  src: string;
  category: string;
  secondaryCategories: string[];
  museumCategory: string;
  familyCategory?: string;
  peopleCount: number;
  subjects: string;
  description: string;
  caption: string;
  captionConfidence: string;
  date: string | null;
  orientation: 'portrait' | 'landscape' | 'square';
  width: number;
  height: number;
  originalDimensions: string;
  quality: string;
  blurry: boolean;
  exposure: string;
  isDuplicate: boolean;
  duplicateOf: string | null;
  type: string;
  priority: number;
  featured: boolean;
  heroSuitable: boolean;
  familySuitable: boolean;
  academicSuitable: boolean;
  thenNowPairId: string | null;
  thenNowRole: 'then' | 'now' | null;
  needsConfirmation: boolean;
  notes: string;
}

export const allPhotos: PhotoItem[] = rawPhotos as PhotoItem[];

// Active gallery photos exclude exact duplicates & icon-covered wallpaper duplicates
export const galleryPhotos: PhotoItem[] = allPhotos.filter(
  (p) => !p.isDuplicate && p.category !== 'unclassified'
);

export const getPhotoById = (id: string): PhotoItem | undefined =>
  allPhotos.find((p) => p.id === id);

export const getPhotosByCategory = (cat: string): PhotoItem[] =>
  galleryPhotos
    .filter((p) => p.category === cat || p.secondaryCategories.includes(cat))
    .sort((a, b) => b.priority - a.priority);

export const museumCategories = [
  { id: 'all', label: 'All Memories', marathi: 'सर्व आठवणी', emoji: '✨' },
  { id: 'My Favourite Person', label: 'My Favourite Person', marathi: 'माझी आवडती व्यक्ती', emoji: '💖' },
  { id: 'The Younger Mumma', label: 'The Younger Mumma', marathi: 'जुन्या गोड आठवणी', emoji: '🌸' },
  { id: 'Mumma and Papa', label: 'Mumma and Papa', marathi: 'मम्मा आणि पप्पा', emoji: '💑' },
  { id: 'Our Beautiful Family', label: 'Our Beautiful Family', marathi: 'आपलं सुंदर कुटुंब', emoji: '🏡' },
  { id: 'The Achiever', label: 'The Achiever', marathi: 'जिद्दी आणि हुशार', emoji: '🎓' },
  { id: 'The Woman Today', label: 'The Woman Today', marathi: 'आजची मम्मा', emoji: '👑' },
] as const;

export interface ThenNowPair {
  id: string;
  title: string;
  subtitle: string;
  marathiNote: string;
  thenPhoto: PhotoItem;
  nowPhoto: PhotoItem;
  thenLabel: string;
  nowLabel: string;
}

export const thenNowPairs: ThenNowPair[] = [
  {
    id: 'pair-mother-son',
    title: 'Always Your Little Boy',
    subtitle: 'From wrapping my tiny arms around your neck in 2016 to standing beside you in 2026 before heading to college.',
    marathiNote: 'कितीही मोठा झालो तरी तुझ्यासाठी नेहमी लहानच राहीन! ❤️',
    thenPhoto: getPhotoById('photo-003')!,
    nowPhoto: getPhotoById('photo-029')!,
    thenLabel: 'August 2016',
    nowLabel: 'July 2026',
  },
  {
    id: 'pair-mumma-papa',
    title: 'Side by Side Through Every Season',
    subtitle: 'From early travels together to peaceful seaside mornings in 2025 — the strongest team.',
    marathiNote: 'प्रत्येक प्रवासात एकमेकांची साथ! 🌊💑',
    thenPhoto: getPhotoById('photo-011')!,
    nowPhoto: getPhotoById('photo-028')!,
    thenLabel: 'Earlier Days',
    nowLabel: 'November 2025',
  },
  {
    id: 'pair-solo-portrait',
    title: 'Timeless Grace & Unstoppable Spirit',
    subtitle: 'The same warm eyes, the same quiet determination, and a smile that never fades.',
    marathiNote: 'तेच गोड हसू आणि तीच जिद्द! ✨',
    thenPhoto: getPhotoById('photo-001')!,
    nowPhoto: getPhotoById('photo-002')!,
    thenLabel: 'Classic Portrait',
    nowLabel: 'Radiant Smile',
  },
];
