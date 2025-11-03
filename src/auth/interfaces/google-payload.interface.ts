export interface GooglePayloadInterface {
  token: string
  user: {
    googleId: string
    email: string
    fullName: string
  }
}
