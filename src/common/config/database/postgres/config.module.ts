import { Module } from '@nestjs/common'
import { PostgresConfigService } from './config.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostgresConfigServiceModule } from './postgres-config.module'

@Module({
  imports: [
    PostgresConfigServiceModule,
    TypeOrmModule.forRootAsync({
      imports: [PostgresConfigServiceModule],
      inject: [PostgresConfigService],
      useFactory: (postgresConfigService: PostgresConfigService) => ({
        type: 'postgres',
        host: postgresConfigService.host,
        port: postgresConfigService.port,
        username: postgresConfigService.username,
        password: postgresConfigService.password,
        database: postgresConfigService.database,
        entities: postgresConfigService.entities,
        synchronize: postgresConfigService.synchronize,
        ssl: postgresConfigService.ssl,
      }),
    }),
  ],
  exports: [PostgresConfigServiceModule],
})
export class PostgresConfigModule {}
