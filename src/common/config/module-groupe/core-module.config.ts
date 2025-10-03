import { ConfigModule } from '@nestjs/config'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { AppConfigModule } from '../app/config.module'
import { PostgresConfigModule } from '../database/postgres/config.module'
import { HealthModule } from '@/modules/health/health.module'
import { AppFileModule } from '@/common/modules/files/file.module'
import { PaginationModule } from '@/common/pagination/pagination.module'
import { UserLogModule } from '@/modules/user-log/user-log.module'

export const CoreModule = [
  ConfigModule.forRoot({ isGlobal: true }),
  EventEmitterModule.forRoot(),
  AppConfigModule,
  PostgresConfigModule,
  HealthModule,
  AppFileModule,
  PaginationModule,
  UserLogModule,
]
