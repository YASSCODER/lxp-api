import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { NotificationsGateway } from './notification.gateway'
import { NotificationService } from './notification.service'
import { User } from '../models/entities/user.entity'
import { Notification } from '../models/entities/notification.entity'
import { Learner } from '../models/entities/learner.entity'
import { NotificationSubscriber } from './subscriber/notification.subscriber'
import { LearnerNotificationSubscriber } from './subscriber/learner-notification.subscriber'
import { JwtModule } from '@nestjs/jwt'
import { PaginationModule } from '../pagination/pagination.module'
import { NotificationController } from './notification.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Notification, Learner]),
    ConfigModule,
    JwtModule,
    PaginationModule,
  ],
  controllers: [NotificationController],
  providers: [
    NotificationsGateway,
    NotificationService,
    NotificationSubscriber,
    LearnerNotificationSubscriber,
  ],
  exports: [NotificationsGateway, NotificationService],
})
export class NotificationModule {}
