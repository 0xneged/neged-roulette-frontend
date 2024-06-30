// *Partly* imported from neynar, we don't need whole library on frontend

export declare const UserObjectEnum: {
  readonly User: 'user'
}

export type UserObjectEnum =
  (typeof UserObjectEnum)[keyof typeof UserObjectEnum]

export interface FcUser {
  fcPfpLink: string
  fcUsername: string
  address: string
}
