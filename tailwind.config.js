/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '380px',
      },
      colors: {
        canvas: {
          DEFAULT: '#fbf9f5',
          pure: '#ffffff',
        },
        sand: {
          DEFAULT: '#f3ede2',
          dark: '#e6dcce',
        },
        dark: {
          DEFAULT: '#0d0e11',
          surface: '#15171b',
        },
        ink: {
          DEFAULT: '#101114',
          soft: '#272a31',
          muted: '#595d67',
          faint: '#8e939e',
        },
        champagne: {
          DEFAULT: '#c3a67d',
          light: '#f7f3ec',
          dark: '#9e825a',
        },
        forest: '#1c382b',
        ocean: '#0f2734',
        status: {
          emerald: '#1e6b52',
          'emerald-bg': '#eaf3ef',
          amber: '#996515',
          'amber-bg': '#f8f2e7',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        editorial: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        '2xs': '0.6875rem',
        hero: 'clamp(3.2rem, 9.5vw, 7.25rem)',
      },
      boxShadow: {
        subtle: '0 4px 24px -2px rgba(13, 14, 17, 0.05)',
        float: '0 24px 60px -12px rgba(13, 14, 17, 0.18)',
        deep: '0 32px 80px -16px rgba(13, 14, 17, 0.35)',
      },
      maxWidth: {
        editorial: '1320px',
        narrative: '760px',
      },
      borderRadius: {
        pill: '9999px',
      },
      spacing: {
        'touch-min': '44px',
        'header-mobile': '64px',
        'header-desktop': '80px',
        'bottom-nav': '64px',
      },
    },
  },
  plugins: [],
}
