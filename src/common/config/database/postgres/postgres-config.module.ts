import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresConfigService } from './config.service';
import postgresConfig from './configuration';

@Module({
  imports: [ConfigModule.forFeature(postgresConfig)],
  providers: [PostgresConfigService],
  exports: [PostgresConfigService],
})
export class PostgresConfigServiceModule {}
