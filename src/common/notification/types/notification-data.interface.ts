export interface NotificationContentData {
  content: {
    en: string
    ar: string
  }
}

export interface NotificationPayload {
  userId: number
  type: string
  content: NotificationContentData
  link: string
  createdAt: Date
}
