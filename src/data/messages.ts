export interface LetterEnvelopeItem {
  id: string;
  number: number;
  title: string;
  marathiTag: string;
  stampEmoji: string;
  envelopeColor: 'blush' | 'sunshine' | 'skyblue' | 'peach';
  paragraphs: string[];
  marathiClosing?: string;
  signOff?: string;
}

export const letterEnvelopes: LetterEnvelopeItem[] = [
  {
    id: 'envelope-1',
    number: 1,
    title: 'THANK YOU FOR EVERYTHING',
    marathiTag: 'मनापासून धन्यवाद ❤️',
    stampEmoji: '🌸',
    envelopeColor: 'blush',
    paragraphs: [
      "Aai, I don't think I tell you this enough, but I'm genuinely lucky to have you.",
      "I know how much you work, how much you care, and how much effort you put into everything you do.",
      "Thank you for always supporting me, believing in me and being there whenever I need you.",
      "I may not express it every day, but I notice and appreciate so much more than I say."
    ],
    signOff: "With all my gratitude, Shriraj"
  },
  {
    id: 'envelope-2',
    number: 2,
    title: 'WHAT I ADMIRE ABOUT YOU',
    marathiTag: 'तुझा अभिमान वाटतो 🌟',
    stampEmoji: '🎓',
    envelopeColor: 'sunshine',
    paragraphs: [
      "One thing I genuinely admire about you is that you never stop learning.",
      "You are a professor, a researcher, a mother and someone who keeps working towards her dreams.",
      "People come to you for guidance because they trust your intelligence and judgement.",
      "But what inspires me most is your determination to keep growing."
    ],
    signOff: "Your proudest fan, Shriraj"
  },
  {
    id: 'envelope-3',
    number: 3,
    title: 'THINGS I LEARNED FROM YOU',
    marathiTag: 'तुझ्याकडून शिकलेल्या गोष्टी ✨',
    stampEmoji: '📖',
    envelopeColor: 'skyblue',
    paragraphs: [
      "You've taught me that being intelligent is important, but being hardworking, responsible and kind matters just as much.",
      "You've taught me to keep learning, to stand up for myself and to never give up on my ambitions.",
      "I hope I carry these lessons with me wherever life takes me."
    ],
    signOff: "Always learning from you, Shriraj"
  },
  {
    id: 'envelope-4',
    number: 4,
    title: 'WHEN I MISS HOME',
    marathiTag: 'घरची आणि तुझी आठवण 🏡',
    stampEmoji: '🚂',
    envelopeColor: 'peach',
    paragraphs: [
      "College has given me a new world, new experiences and new responsibilities.",
      "But sometimes, no matter how busy I am, I miss home.",
      "I miss the little things, the familiar conversations, the food, your guidance and simply having you around.",
      "I may be away studying in Vellore, but that doesn't mean you're ever far from my heart."
    ],
    marathiClosing: "आणि हो, कधी कधी घरी यायची खूप आठवण येते. तुझ्या हातचं जेवणही खूप मिस करतो! ❤️",
    signOff: "Sending hugs from Vellore, Shriraj"
  },
  {
    id: 'envelope-5',
    number: 5,
    title: 'A LETTER FROM YOUR SON',
    marathiTag: 'तुझ्या मुलाचं मनोगत 💌',
    stampEmoji: '❤️',
    envelopeColor: 'blush',
    paragraphs: [
      "Dear Mumma,",
      "There are so many things I want to tell you, but somehow I don't always find the right words.",
      "I know I can sometimes be stubborn, irritating and difficult to convince. And yes, sometimes your strictness feels like a full-time government regulation!",
      "But I understand that behind it is your love and concern for me.",
      "I see how much you work, how much you dream and how much you do for the people around you.",
      "As I grow older and work towards my own dreams, I hope I can make you proud.",
      "I don't know whether I'll ever be able to give back everything you've given me, but I promise I'll always be grateful.",
      "Happy Birthday, Mumma."
    ],
    marathiClosing: "तुझ्यावर खूप प्रेम आहे. ❤️",
    signOff: "Forever your son."
  }
];

export interface FamilyMessageItem {
  id: string;
  senderTitle: string;
  senderSubtitle: string;
  marathiBadge: string;
  paragraphs: string[];
  photoId: string;
  editableNote?: string;
}

export const familyMessages: FamilyMessageItem[] = [
  {
    id: 'from-papa',
    senderTitle: 'FROM PAPA',
    senderSubtitle: 'Your partner in every journey',
    marathiBadge: 'आयुष्यभराची साथ ❤️',
    paragraphs: [
      "Happy Birthday, Nisha.",
      "Your dedication, intelligence and determination inspire me.",
      "I'm proud of everything you continue to achieve, and I'm grateful for the life and family we've built together.",
      "Wishing you happiness, good health and many more beautiful years ahead."
    ],
    photoId: 'photo-028',
    editableNote: 'Editable directly on screen or in src/data/messages.ts for Papa’s final review.'
  },
  {
    id: 'from-son',
    senderTitle: 'FROM YOUR SON',
    senderSubtitle: 'Shriraj',
    marathiBadge: 'तुझाच मुलगा 🤗',
    paragraphs: [
      "To the person who has been my biggest supporter, my guide and one of the most important parts of my life.",
      "Thank you for everything, Mumma.",
      "No matter how far life takes me, you'll always have a special place in my heart."
    ],
    photoId: 'photo-029'
  }
];

export const giftStars = [
  { id: 1, label: 'Star 1', message: 'Thank you for your love.', marathi: 'तुझ्या निस्वार्थ प्रेमासाठी' },
  { id: 2, label: 'Star 2', message: 'Thank you for your guidance.', marathi: 'तुझ्या योग्य मार्गदर्शनासाठी' },
  { id: 3, label: 'Star 3', message: 'Thank you for believing in us.', marathi: 'आमच्यावर विश्वास ठेवल्याबद्दल' },
  { id: 4, label: 'Star 4', message: 'Thank you for being you.', marathi: 'तू जशी आहेस तशीच राहिल्याबद्दल' },
  { id: 5, label: 'Star 5', message: 'This one is just for you.', marathi: 'हे खास फक्त तुझ्यासाठी!' },
];
