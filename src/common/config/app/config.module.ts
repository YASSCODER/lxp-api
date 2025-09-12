import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppConfigService } from './config.service'
import appConfig from './configuration'

@Module({
  imports: [ConfigModule.forFeature(appConfig)],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
