import { Injectable, Logger } from '@nestjs/common'
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { Socket } from 'socket.io'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../models/entities/user.entity'
import { authSelector } from '@/auth/selector/find-one.selector'
import { NotificationContentData } from './types/notification-data.interface'

interface NotificationPayload {
  type: string
  title: NotificationContentData
  content: NotificationContentData
  link: string
  createdAt: Date
}

@WebSocketGateway({
  cors: { origin: '*' },
})
@Injectable()
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server

  private logger = new Logger('NotificationsGateway')

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async afterInit(_server: Server) {
    const port = this.configService.get('PORT') || 8000
    const host = this.configService.get('HOST') || 'localhost'
    const wsUrl = `http://${host}:${port}`

    this.logger.log(`NotificationsGateway initialized`)
    this.logger.log(`🔌 WebSocket Server URL: ${wsUrl}`)
    this.logger.log(`📡 Clients can connect using Socket.IO at: ${wsUrl}`)
  }

  async handleConnection(client: Socket) {
    try {
      this.logger.log(`Client ${client.id} attempting connection`)
      this.logger.log(`Handshake auth:`, client.handshake.auth)
      this.logger.log(`Handshake headers:`, client.handshake.headers)

      const token =
        client.handshake.auth?.token ||
        client.handshake.headers?.authorization?.replace('Bearer ', '') ||
        client.handshake.query?.token

      this.logger.log(`Extracted token:`, token ? 'Present' : 'Missing')

      if (!token) {
        this.logger.warn(`Client ${client.id} connected without token`)
        client.disconnect()
        return
      }

      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      })

      const user = await this.userRepository.findOne({
        where: { id: payload.id },
        relations: { role: true, learner: true, instructor: true },
        select: authSelector,
      })
      this.logger.log(`User found:`, user)
      this.logger.log(`User ${user.email} connected: ${client.id}`)

      if (!user) {
        this.logger.warn(`Client ${client.id} connected with invalid user`)
        client.disconnect()
        return
      }

      client.data.user = user
      client.data.userId = user.id

      client.join(`user_${user.id}`)

      if (user.role?.title) {
        client.join(`role_${user.role.title.en.toLowerCase()}`)
      }

      client.emit('authenticated', {
        socketId: client.id,
        userId: user.id,
        userEmail: user.email,
        userRole: user.role.title,
      })

      this.logger.log(
        `Authenticated user ${user.id} (${user.email}) connected: ${client.id}`,
      )
    } catch (error) {
      this.logger.error(
        `Authentication failed for client ${client.id}:`,
        error.message,
      )
      client.disconnect()
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.data?.userId
    const userEmail = client.data?.user?.email
    this.logger.log(`User ${userId} (${userEmail}) disconnected: ${client.id}`)
  }

  sendToUser(userId: number | string, notification: NotificationPayload) {
    this.server.to(`user_${userId}`).emit('newNotification', notification)
    this.logger.log(`Notification sent to user ${userId}: ${notification.type}`)
  }

  sendToRole(role: string, notification: NotificationPayload) {
    this.server
      .to(`role_${role.toLowerCase()}`)
      .emit('newNotification', notification)
    this.logger.log(`Notification sent to role ${role}: ${notification.type}`)
  }

  sendToAdmins(notification: NotificationPayload) {
    this.sendToRole('admin', notification)
  }

  isUserConnected(userId: number | string): boolean {
    const room = this.server.sockets.adapter.rooms.get(`user_${userId}`)
    return room && room.size > 0
  }

  getConnectedUsersCount(userId: number | string): number {
    const room = this.server.sockets.adapter.rooms.get(`user_${userId}`)
    return room ? room.size : 0
  }

  sendToUserWithConfirmation(
    userId: number | string,
    notification: NotificationPayload,
  ) {
    const isConnected = this.isUserConnected(userId)

    if (isConnected) {
      this.server.to(`user_${userId}`).emit('newNotification', notification)
      this.logger.log(
        `Notification sent to user ${userId}: ${notification.type} (User is connected)`,
      )
    } else {
      this.logger.warn(
        `User ${userId} is not connected. Notification not delivered: ${notification.type}`,
      )
    }

    return isConnected
  }
}
