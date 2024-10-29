/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'border-top': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'border-right': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        },
        'border-bottom': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        'border-left': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(-100%)' }
        }
      },
      animation: {
        'border-top': 'border-top 1s linear infinite',
        'border-right': 'border-right 1s linear infinite',
        'border-bottom': 'border-bottom 1s linear infinite',
        'border-left': 'border-left 1s linear infinite'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
} 