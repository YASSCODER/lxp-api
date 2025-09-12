import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class PostgresConfigService {
  constructor(private configService: ConfigService) {}

  get database(): string | undefined {
    return this.configService.get<string>('postgres.database')
  }

  get entities(): string[] | undefined {
    return this.configService.get<string[]>('postgres.entities')
  }

  get host(): string | undefined {
    return this.configService.get<string>('postgres.host')
  }

  get password(): string | undefined {
    return this.configService.get<string>('postgres.password')
  }

  get port(): number | undefined {
    return Number(this.configService.get<number>('postgres.port'))
  }

  get synchronize(): boolean | undefined {
    return this.configService.get<boolean>('postgres.synchronize')
  }

  get type(): string | undefined {
    return this.configService.get<string>('postgres.type')
  }

  get username(): string | undefined {
    return this.configService.get<string>('postgres.username')
  }

  get ssl(): boolean | { rejectUnauthorized: boolean } | undefined {
    return this.configService.get<boolean | { rejectUnauthorized: boolean }>(
      'postgres.ssl',
    )
  }
}
