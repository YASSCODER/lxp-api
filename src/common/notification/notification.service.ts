import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Notification } from '../models/entities/notification.entity'
import { NotificationContentEmbedded } from '../models/embedded/notification-content.embedded'
import { NotificationPayload } from './types/notification-data.interface'
import { NotificationsGateway } from './notification.gateway'

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name)

  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  async createNotification(
    userId: number,
    content: NotificationContentEmbedded,
    link: string,
    type: string,
  ): Promise<Notification> {
    try {
      const notification = this.notificationRepository.create({
        userId,
        content,
        link,
        type,
        isViewed: false,
      })

      const savedNotification =
        await this.notificationRepository.save(notification)

      this.logger.log(
        `Notification saved to database: ID ${savedNotification.id}, Type: ${type}`,
      )
      return savedNotification
    } catch (error) {
      this.logger.error(`Failed to save notification: ${error.message}`)
      throw error
    }
  }

  /**
   * Send notification to a specific user via WebSocket
   */
  async sendNotificationToUser(
    userId: number,
    notification: NotificationPayload,
  ): Promise<boolean> {
    try {
      this.notificationsGateway.sendToUser(userId, notification)
      this.logger.log(`Notification sent to user ${userId} via WebSocket`)
      return true
    } catch (error) {
      this.logger.error(
        `Failed to send notification to user : ${error.message}`,
      )
      return false
    }
  }

  /**
   * Send notification to all learners via WebSocket
   */
  async sendNotificationToAllLearners(
    notification: NotificationPayload,
  ): Promise<void> {
    try {
      this.notificationsGateway.sendToRole('learner', notification)
      this.logger.log(`Notification sent to all learners: ${notification.type}`)
    } catch (error) {
      this.logger.error(
        `Failed to send notification to learners: ${error.message}`,
      )
    }
  }

  /**
   * Get notifications for a specific user
   */
  async getUserNotifications(userId: number, limit = 20, offset = 0) {
    try {
      const [notifications, total] =
        await this.notificationRepository.findAndCount({
          where: { userId },
          order: { createdAtTimestamp: 'DESC' },
          take: limit,
          skip: offset,
        })

      return { notifications, total }
    } catch (error) {
      this.logger.error(
        `Failed to get notifications for user ${userId}: ${error.message}`,
      )
      throw error
    }
  }

  /**
   * Mark notification as viewed
   */
  async markAsViewed(notificationId: number, userId: number): Promise<boolean> {
    try {
      const result = await this.notificationRepository.update(
        { id: notificationId, userId },
        { isViewed: true },
      )
      return result.affected > 0
    } catch (error) {
      this.logger.error(
        `Failed to mark notification ${notificationId} as viewed: ${error.message}`,
      )
      return false
    }
  }
}
