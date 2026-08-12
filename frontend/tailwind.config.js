/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1768',
          dark: '#111B5E',
          light: '#1a2690',
        },
        orange: {
          DEFAULT: '#F59A23',
          dark: '#d4820d',
          light: '#fbb040',
        },
        blue: {
          brand: '#13A9E8',
          dark: '#0d8ec5',
          light: '#40bef0',
        },
        bg: '#F7F8FC',
        border: '#DDE2EC',
        'text-dark': '#20243A',
        'text-muted': '#6B7280',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 4px 0 rgba(11, 23, 104, 0.07)',
        'card-md': '0 4px 16px 0 rgba(11, 23, 104, 0.10)',
        'card-lg': '0 8px 32px 0 rgba(11, 23, 104, 0.12)',
      },
    },
  },
  plugins: [],
}
