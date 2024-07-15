import JSConfetti from 'js-confetti'

const jsConfetti = new JSConfetti()

export default () =>
  jsConfetti.addConfetti({ emojis: ['🎩', '🔄', '🎊', '🎉'] })
