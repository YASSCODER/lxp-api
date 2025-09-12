import { ConfigModule } from '@nestjs/config'
import { AppConfigModule } from '../app/config.module'
import { PostgresConfigModule } from '../database/postgres/config.module'
import { HealthModule } from '@/modules/health/health.module'

export const CoreModule = [
  ConfigModule.forRoot({ isGlobal: true }),
  AppConfigModule,
  PostgresConfigModule,
  HealthModule,
]
