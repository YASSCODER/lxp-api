import { Module } from '@nestjs/common'
import { HealthController } from './api/health.controller'
import { HealthService } from './api/health.service'

@Module({
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
