import { Injectable } from '@nestjs/common'

@Injectable()
export class HealthService {
  constructor() {}

  async checkHealth(): Promise<{ status: string }> {
    return { status: 'ok' }
  }
}
