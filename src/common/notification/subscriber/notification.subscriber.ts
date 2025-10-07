import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { NotificationEvent } from '../event/notification.event'
import { NotificationService } from '../notification.service'
import { NotificationContentEmbedded } from '../../models/embedded/notification-content.embedded'

@Injectable()
export class NotificationSubscriber {
  private readonly logger = new Logger(NotificationSubscriber.name)

  constructor(private readonly notificationService: NotificationService) {}

  @OnEvent('notification.created')
  async handleNotificationCreated(event: NotificationEvent) {
    this.logger.log(
      `Handling notification.created event: ${event.notification.type}`,
    )

    try {
      const content: NotificationContentEmbedded = {
        en: event.notification.content.content.en,
        ar: event.notification.content.content.ar,
      }

      await this.notificationService.createNotification(
        event.notification.userId,
        content,
        event.notification.link,
        event.notification.type,
      )

      this.logger.log(
        `Notification created successfully: ${event.notification.type}`,
      )

      // You can add additional logic here like:
      // - Send emails
      // - Send SMS
      // - Update user preferences
      // - Log analytics
    } catch (error) {
      this.logger.error(
        `Failed to handle notification.created event: ${error.message}`,
      )
    }
  }
}
