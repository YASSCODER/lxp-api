import { ConfigModule } from '@nestjs/config'
import { AppConfigModule } from '../app/config.module'
import { PostgresConfigModule } from '../database/postgres/config.module'
import { HealthModule } from '@/modules/health/health.module'
import { AppFileModule } from '@/common/modules/files/file.module'

export const CoreModule = [
  ConfigModule.forRoot({ isGlobal: true }),
  AppConfigModule,
  PostgresConfigModule,
  HealthModule,
  AppFileModule,
]
