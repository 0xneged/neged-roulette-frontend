export default async function (seconds = 30) {
  await new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}
