import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Notification } from '../models/entities/notification.entity'
import { NotificationContentEmbedded } from '../models/embedded/notification-content.embedded'
import { NotificationPayload } from './types/notification-data.interface'
import { NotificationsGateway } from './notification.gateway'
import { paginationParamsFormula } from '../utils/pagination-formula.utils'
import { User } from '../models/entities/user.entity'
import { PaginationDto } from '../dto/pagination.dto'
import {
  PaginationResult,
  PaginationService,
} from '../pagination/pagination.service'

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name)

  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    private readonly notificationsGateway: NotificationsGateway,
    private readonly paginationService: PaginationService,
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


  async getUserNotifications(
    user: User,
    query: PaginationDto,
  ): Promise<PaginationResult<Notification>> {
    const paginationFormula = paginationParamsFormula(query)
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    try {
      const qb = this.notificationRepository
        .createQueryBuilder('notification')
        .where('notification.userId = :userId', { userId: user.id })
        .andWhere('notification.createdAtTimestamp >= :threeDaysAgo', {
          threeDaysAgo,
        })
        .orderBy('notification.createdAtTimestamp', 'DESC')

      const { data, pagination } =
        await this.paginationService.paginateWithQueryBuilder(
          qb,
          paginationFormula,
        )
      return { data, pagination }
    } catch (error) {
      this.logger.error(
        `Failed to get notifications for user ${user.id}: ${error.message}`,
      )
      throw error
    }
  }

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
