import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { NotificationEvent } from './event/notification.event'
import { NotificationService } from './notification.service'
import { NotificationPayload } from './types/notification-data.interface'

@Controller('notifications')
export class NotificationExampleController {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly notificationService: NotificationService,
  ) {}

  /**
   * Example: Send notification to all learners (saves to DB + WebSocket)
   */
  @Post('send-to-learners')
  async sendToLearners(
    @Body()
    body: NotificationPayload,
  ) {
    const notification = body

    this.eventEmitter.emit(
      'notification.learner.push',
      new NotificationEvent(notification),
    )

    return {
      success: true,
      message: 'Notification sent to all learners',
      notification,
    }
  }

  /**
   * Example: Broadcast notification to learners (WebSocket only)
   */
  @Post('broadcast-to-learners')
  async broadcastToLearners(@Body() body: NotificationPayload) {
    const notification = body

    // Emit event for learner broadcast subscriber
    this.eventEmitter.emit(
      'notification.learner.broadcast',
      new NotificationEvent(notification),
    )

    return {
      success: true,
      message: 'Notification broadcasted to all learners',
      notification,
    }
  }

  /**
   * Example: Create general notification event
   */
  @Post('create')
  async createNotification(@Body() body: NotificationPayload) {
    const notification = body

    this.eventEmitter.emit(
      'notification.created',
      new NotificationEvent(notification),
    )

    return {
      success: true,
      message: 'Notification event created',
      notification,
    }
  }

  /**
   * Get notifications for a specific user
   */
  @Get('user/:userId')
  async getUserNotifications(
    @Param('userId') userId: number,
    @Query('limit') limit = 20,
    @Query('offset') offset = 0,
  ) {
    const result = await this.notificationService.getUserNotifications(
      userId,
      limit,
      offset,
    )
    return {
      success: true,
      data: result,
    }
  }

  /**
   * Mark notification as viewed
   */
  @Post('mark-viewed/:notificationId')
  async markAsViewed(
    @Param('notificationId') notificationId: number,
    @Body() body: { userId: number },
  ) {
    const success = await this.notificationService.markAsViewed(
      notificationId,
      body.userId,
    )
    return {
      success,
      message: success
        ? 'Notification marked as viewed'
        : 'Failed to mark notification as viewed',
    }
  }
}
