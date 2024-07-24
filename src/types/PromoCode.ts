export default interface PromoCode {
  secret: string
  userLimit: number
  activations: number
  rewardAmount: number
}
