export interface GooglePayloadInterface {
  token: string // ID token
  accessToken?: string // Access token
  refreshToken?: string // Refresh token
  expiryDate?: Date // Access token expiry date
  user: {
    googleId: string
    email: string
    fullName: string
  }
}
