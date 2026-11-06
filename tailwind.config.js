/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sunshine: {
          DEFAULT: '#FFD95A',
          light: '#FFE896',
          soft: '#FFF4C8',
          deep: '#F0B823',
        },
        blush: {
          DEFAULT: '#F7B8C8',
          light: '#FCE0E8',
          soft: '#FFF0F4',
          deep: '#E2859E',
        },
        skyblue: {
          DEFAULT: '#9DDDF2',
          light: '#D3F1FB',
          soft: '#EBF8FD',
          deep: '#5AB9D9',
        },
        cream: {
          DEFAULT: '#FFF9EC',
          paper: '#FFFDF7',
          warm: '#FDF2D9',
        },
        peach: {
          DEFAULT: '#F6C9A8',
          light: '#FBE4D3',
          deep: '#E5A173',
        },
        cocoa: {
          DEFAULT: '#51463F',
          light: '#76675E',
          muted: '#96877E',
        },
      },
      fontFamily: {
        heading: ['"Fredoka"', '"Noto Sans Devanagari"', 'sans-serif'],
        body: ['"Nunito"', '"Noto Sans Devanagari"', 'sans-serif'],
        handwritten: ['"Caveat"', '"Kalam"', 'cursive'],
        marathi: ['"Kalam"', '"Noto Sans Devanagari"', 'sans-serif'],
      },
      boxShadow: {
        scrapbook: '0 8px 24px -4px rgba(81, 70, 63, 0.10), 0 4px 8px -2px rgba(81, 70, 63, 0.06)',
        polaroid: '0 10px 28px -6px rgba(81, 70, 63, 0.14), 0 4px 10px -3px rgba(81, 70, 63, 0.08)',
        sticker: '4px 4px 0px rgba(81, 70, 63, 0.18)',
        stickerHover: '6px 6px 0px rgba(81, 70, 63, 0.24)',
      },
    },
  },
  plugins: [],
}
