/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./index.html', './src/**/!(tailwind).{ts,tsx}'],
  plugins: [require('@tailwindcss/typography')],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        script: ['"Nanum Pen Script"', 'cursive'],
      },
      colors: {
        primary: '#7F60F9',
        'primary-bright': '#B66DFF',
        'primary-dark': '#5B38E7',
        'primary-bg': '#180431',
        neged: '#8B5CF6',
        'roulette-box': '#211741',
        participant1: '#60F0F94D',
        participant2: '#F9BC604D',
        participant3: '#AC60F94D',
      },
    },
  },
}
