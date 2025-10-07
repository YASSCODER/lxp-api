import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { NotificationEvent } from '../event/notification.event'
import { NotificationService } from '../notification.service'
import { NotificationContentEmbedded } from '../../models/embedded/notification-content.embedded'
import { User } from '../../models/entities/user.entity'
import { Learner } from '../../models/entities/learner.entity'

@Injectable()
export class LearnerNotificationSubscriber {
  private readonly logger = new Logger(LearnerNotificationSubscriber.name)

  constructor(
    private readonly notificationService: NotificationService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Learner)
    private readonly learnerRepository: Repository<Learner>,
  ) {}

  @OnEvent('notification.learner.push')
  async handleLearnerNotificationPush(event: NotificationEvent) {
    this.logger.log(
      `Handling notification.learner.push event: ${event.notification.type}`,
    )

    try {
      const content: NotificationContentEmbedded = {
        en: event.notification.content.content.en,
        ar: event.notification.content.content.ar,
      }

      const learners = await this.learnerRepository.find({
        relations: ['user'],
      })

      this.logger.log(`Found ${learners.length} learners to notify`)

      for (const learner of learners) {
        if (learner.user) {
          try {
            await this.notificationService.createNotification(
              learner.user.id,
              content,
              event.notification.link,
              event.notification.type,
            )

            await this.notificationService.sendNotificationToUser(
              learner.user.id,
              event.notification,
            )

            this.logger.log(
              `Notification processed for learner ${learner.user.id}`,
            )
          } catch (error) {
            this.logger.error(
              `Failed to process notification for learner ${learner.user.id}: ${error.message}`,
            )
          }
        }
      }

      this.logger.log(
        `Successfully processed learner notifications for: ${event.notification.type}`,
      )
    } catch (error) {
      this.logger.error(
        `Failed to handle notification.learner.push event: ${error.message}`,
      )
    }
  }

  @OnEvent('notification.learner.broadcast')
  async handleLearnerBroadcast(event: NotificationEvent) {
    this.logger.log(
      `Handling notification.learner.broadcast event: ${event.notification.type}`,
    )

    try {
      await this.notificationService.sendNotificationToAllLearners(
        event.notification,
      )

      this.logger.log(
        `Broadcast notification sent to all learners: ${event.notification.type}`,
      )
    } catch (error) {
      this.logger.error(
        `Failed to handle notification.learner.broadcast event: ${error.message}`,
      )
    }
  }
}
