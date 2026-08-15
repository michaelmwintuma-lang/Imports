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
        brand: {
          blue: '#143D59', // Deep Maritime Blue
          navy: '#0B1E2D', // Midnight Marine Base
          coral: '#B85D36', // Rich Terracotta / Burnt Sienna
          peach: '#E5A93C', // Amber Ochre Golden Harvest
          sky: '#F0F4F8',   // Cool Sea Mist
        },
        forest: {
          dark: '#0B1E2D', // Midnight Marine
          main: '#143D59', // Deep Maritime
          light: '#F0F4F8',
          hover: '#0E2A3E',
        },
        earth: {
          green: '#143D59',
          brown: '#B85D36', // Terracotta
          sand: '#F3EFEA',  // Pearl Sand
        },
        gold: {
          accent: '#E5A93C', // Amber Ochre
          light: '#F5C86C',
          dark: '#B85D36',  // Terracotta
        },
        cream: {
          bg: '#FAF7F4',   // Warm Pearl Sand Linen
          card: '#FFFFFF',
          muted: '#E6DFD7',
        },
        dark: {
          bg: '#07131D',    // Deep Marine Obsidian
          card: '#0E2233',  // Dark Marine Card
          muted: '#142F45', // Deep Ocean Muted
          border: '#1E4260',// Border Accent
          text: '#F8FAFC',
          subtext: '#94A3B8',
        },
        charcoal: '#0F172A',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Outfit', 'Inter', 'sans-serif'],
        heading: ['Montserrat', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'editorial': '0 10px 30px -10px rgba(11, 30, 45, 0.08)',
        'editorial-hover': '0 20px 40px -15px rgba(11, 30, 45, 0.16)',
        'dark-card': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
