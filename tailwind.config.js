/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          dark: '#112316',
          main: '#1D4428',
          light: '#EAEFEB',
          hover: '#16351F',
        },
        earth: {
          green: '#334735',
          brown: '#5C4431',
          sand: '#EAE1D2',
        },
        gold: {
          accent: '#C59325',
          light: '#DFB14A',
          dark: '#9F7517',
        },
        cream: {
          bg: '#F4EFE6',
          card: '#FCFBF8',
          muted: '#DED8CC',
        },
        dark: {
          bg: '#0B130E',
          card: '#121F17',
          muted: '#1B2E22',
          border: '#253E2E',
          text: '#F3F4F6',
          subtext: '#9CA3AF',
        },
        charcoal: '#0F172A',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Outfit', 'Inter', 'sans-serif'],
        heading: ['Montserrat', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'editorial': '0 10px 30px -10px rgba(29, 68, 40, 0.08)',
        'editorial-hover': '0 20px 40px -15px rgba(29, 68, 40, 0.15)',
        'dark-card': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
