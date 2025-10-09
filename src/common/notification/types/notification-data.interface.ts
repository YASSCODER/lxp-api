export interface NotificationContentData {
  en: string
  ar: string
}

export interface NotificationPayload {
  userId?: number
  type: string
  title: NotificationContentData
  content: NotificationContentData
  link: string
  createdAt: Date
}
