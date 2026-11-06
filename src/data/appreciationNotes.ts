export interface AppreciationNote {
  id: number;
  text: string;
  marathi?: string;
  tag: string;
  color: 'sunshine' | 'blush' | 'skyblue' | 'peach';
}

export const appreciationNotes: AppreciationNote[] = [
  {
    id: 1,
    text: "For the way you balance being a dedicated professor, a focused researcher, and the heart of our home without ever complaining.",
    marathi: "सगळं काही अगदी सहज सावरणारी आमची सुपरवुमन!",
    tag: "Unstoppable You",
    color: "sunshine"
  },
  {
    id: 2,
    text: "For your famous 'one look' that can silence an entire room faster than any university notice!",
    marathi: "फक्त एका नजरेत शिस्त लावणारी मम्मा! 😅",
    tag: "Strict Mode",
    color: "blush"
  },
  {
    id: 3,
    text: "For the warmth of your handmade food that I miss every single week when I'm away in Vellore.",
    marathi: "तुझ्या हातच्या जेवणाची चव जगात कुठेही नाही! 🍱❤️",
    tag: "Taste of Home",
    color: "peach"
  },
  {
    id: 4,
    text: "For never stopping your own learning and showing me that ambition has no age limit.",
    marathi: "तुझी शिकण्याची जिद्द मला रोज प्रेरणा देते.",
    tag: "Lifelong Learner",
    color: "skyblue"
  },
  {
    id: 5,
    text: "For giving advice that I sometimes resist at first—only to realise two days later that you were 100% right all along.",
    marathi: "तुझा सल्ला नेहमीच बरोबर असतो (कबूल करतो!) 🙈",
    tag: "Always Right",
    color: "sunshine"
  },
  {
    id: 6,
    text: "For how patiently you guide students and family members alike whenever someone needs clarity.",
    tag: "24/7 Mentor",
    color: "blush"
  },
  {
    id: 7,
    text: "For your contagious smile that makes even the most stressful days feel manageable.",
    marathi: "तुझं हसू घराची खरी ऊर्जा आहे! ✨",
    tag: "Pure Sunshine",
    color: "sunshine"
  },
  {
    id: 8,
    text: "For remembering every small detail about everyone in the family before we even remember it ourselves.",
    tag: "CEO of the House",
    color: "peach"
  },
  {
    id: 9,
    text: "For checking in on me when I'm at college just to make sure I've eaten properly and slept on time.",
    marathi: "'जेवलास का?' हा तुझा प्रश्न दिवसभराचा थकवा घालवतो ❤️",
    tag: "Mumma's Care",
    color: "blush"
  },
  {
    id: 10,
    text: "For being the person who can hop on a Royal Enfield motorcycle with glasses on and look like the coolest professor ever!",
    marathi: "रॉयल एनफिल्डवर बसणारी सर्वात कूल प्रोफेसर! 🏍️🔥",
    tag: "Legend Vibes",
    color: "skyblue"
  },
  {
    id: 11,
    text: "For standing by Papa through every season and building such a loving, grounded family for us.",
    tag: "Family Pillar",
    color: "peach"
  },
  {
    id: 12,
    text: "For teaching me that real intelligence is always paired with humility, kindness, and hard work.",
    tag: "Life Lessons",
    color: "sunshine"
  },
  {
    id: 13,
    text: "For all the quiet sacrifices you've made behind the scenes so I could focus on my studies and dreams.",
    marathi: "तू केलेल्या प्रत्येक त्यागाची मला जाणीव आहे 🙏",
    tag: "Gratitude",
    color: "blush"
  },
  {
    id: 14,
    text: "For knowing when I need a strict pep talk and when I just need a calm, reassuring conversation.",
    tag: "Best Advisor",
    color: "skyblue"
  },
  {
    id: 15,
    text: "For pursuing your PhD and research goals with the same dedication you bring to everything in life.",
    marathi: "तुझ्या संशोधनाचा आणि मेहनतीचा खूप अभिमान वाटतो! 🎓",
    tag: "The Scholar",
    color: "sunshine"
  },
  {
    id: 16,
    text: "For turning ordinary evenings—whether over a cup of chai or a family walk—into happy memories.",
    tag: "Everyday Magic",
    color: "peach"
  },
  {
    id: 17,
    text: "For tolerating my stubbornness and mood swings with patience (and occasional well-deserved scolding!).",
    marathi: "माझा हट्टीपणा सहन केल्याबद्दल विशेष पुरस्कार! 🏆😄",
    tag: "Patience Pro",
    color: "blush"
  },
  {
    id: 18,
    text: "For the pride in your eyes whenever I share a small achievement—it motivates me more than anything.",
    tag: "My Motivation",
    color: "skyblue"
  },
  {
    id: 19,
    text: "For keeping our family traditions alive with so much grace, warmth, and positivity.",
    tag: "Grace & Roots",
    color: "sunshine"
  },
  {
    id: 20,
    text: "For always believing I can do better, even in moments when I doubt myself.",
    marathi: "माझ्यावर माझ्यापेक्षा जास्त विश्वास ठेवल्याबद्दल थँक्यू!",
    tag: "My Strength",
    color: "peach"
  },
  {
    id: 21,
    text: "For being not just my mother, but my role model for what a determined, caring human being looks like.",
    tag: "Role Model",
    color: "blush"
  },
  {
    id: 22,
    text: "For every early morning and late night you've spent making sure our family has everything it needs.",
    tag: "Endless Effort",
    color: "skyblue"
  },
  {
    id: 23,
    text: "For the way you celebrate other people's happiness so wholeheartedly—today it's our turn to celebrate YOU!",
    marathi: "आजचा संपूर्ण दिवस फक्त आणि फक्त तुझाच आहे! 🥳❤️",
    tag: "Birthday Queen",
    color: "sunshine"
  },
  {
    id: 24,
    text: "Simply for being my Aai. I wouldn't trade our little universe for anything in the world.",
    marathi: "तू आहेस म्हणून माझं जग इतकं सुंदर आहे! ❤️",
    tag: "Forever Grateful",
    color: "blush"
  }
];
