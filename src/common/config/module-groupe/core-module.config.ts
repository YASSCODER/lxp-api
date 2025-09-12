import { ConfigModule } from '@nestjs/config'
import { AppConfigModule } from '../app/config.module'
import { PostgresConfigModule } from '../database/postgres/config.module'

export const CoreModule = [
  ConfigModule.forRoot({ isGlobal: true }),
  AppConfigModule,
  PostgresConfigModule,
]
