import { NotificationPayload } from '../types/notification-data.interface'

export class NotificationEvent {
  constructor(public readonly notification: NotificationPayload) {}
}
