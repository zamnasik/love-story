/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#10152F',
        deepblue: '#202B54',
        ivory: '#FFF7EB',
        rose: '#F4B9C8',
        blush: '#FBE3E8',
        gold: '#E9C77B',
        sage: '#A6B69B',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        script: ['"Great Vibes"', '"Brush Script MT"', 'cursive'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(233, 199, 123, 0.35)',
        soft: '0 10px 40px rgba(8, 10, 30, 0.45)',
      },
    },
  },
  plugins: [],
};
