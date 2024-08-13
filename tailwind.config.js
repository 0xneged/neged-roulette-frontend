/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */

const flowbite = require('flowbite-react/tailwind')

module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    './index.html',
    './src/**/!(tailwind).{ts,tsx}',
    flowbite.content(),
  ],
  plugins: [require('@tailwindcss/typography'), flowbite.plugin()],
  theme: {
    extend: {
      keyframes: {
        rotate3d: {
          '0%, 100%': { transform: 'rotate3d(0, 1, 0, 0)' },
          '50%': { transform: 'rotate3d(0, 1, 0, 360deg)' },
        },
      },
      animation: {
        rotate3d: 'rotate3d 3s ease-in-out infinite',
      },
      rotate: {
        360: '360deg',
      },
      screens: {
        se: '375px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        script: ['"Nanum Pen Script"', 'cursive'],
      },
      boxShadow: {
        card: '0 0 0.75rem 0 var(--tw-shadow-color)',
      },
      colors: {
        primary: '#7f60f9',
        'primary-bright': '#B66DFF',
        'primary-dark': '#5b38e7',
        'primary-bg': '#180431',
        hat: '#8B5CF6',
        'hat-alt': '#4B3294',
        'pale-purple': '#3E2865',
        neged: '#1E293B',
        secondary: '#f4b862',
        'roulette-box': '#211741',
      },
    },
  },
}
