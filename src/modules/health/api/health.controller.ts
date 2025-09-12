import { Controller, Get } from '@nestjs/common'
import { HealthService } from './health.service'

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('')
  async checkHealth(): Promise<{ status: string }> {
    return this.healthService.checkHealth()
  }
}
