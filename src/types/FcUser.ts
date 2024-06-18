// *Partly* imported from neynar, we don't need whole library on frontend

export declare const UserObjectEnum: {
  readonly User: 'user'
}

export type UserObjectEnum =
  (typeof UserObjectEnum)[keyof typeof UserObjectEnum]

export interface FcUser {
  object: UserObjectEnum
  fid: number
  username: string
  display_name?: string
  custody_address: string
  pfp_url?: string
  verifications: Array<string>
  power_badge: boolean
}
