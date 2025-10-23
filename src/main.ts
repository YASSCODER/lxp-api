// src/main.ts
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import helmet from 'helmet'
import { useContainer } from 'class-validator'
import * as bodyParser from 'body-parser'
import { MAX_PARSE_LIMIT } from './common/config/constant/application.constant'
import { GeneralExceptionFilter } from './common/validation/general-exception-filter'
import { AppConfigService } from './common/config/app/config.service'
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe'
import { IoAdapter } from '@nestjs/platform-socket.io'
import { Logger } from '@nestjs/common'

declare const module: any

export async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const appConfig: AppConfigService = app.get(AppConfigService)
  const logger = new Logger('Bootstrap')
  app.useWebSocketAdapter(new IoAdapter(app))

  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('api')
  app.enableCors()
  app.use(helmet())
  app.use(bodyParser.json({ limit: MAX_PARSE_LIMIT }))
  app.use(bodyParser.urlencoded({ limit: MAX_PARSE_LIMIT, extended: true }))
  app.enableCors()

  app.useGlobalPipes(new ValidationPipe())

  app.useGlobalFilters(new GeneralExceptionFilter())

  app.setGlobalPrefix('api')

  const port = Number(process.env.PORT ?? appConfig.port ?? 3000)
  const host = (appConfig as any).host ?? '0.0.0.0'

  await app.listen(port, host)
  const appUrl = process.env.APP_URL || 'http://localhost:8000'
  const wsUrl = appUrl.replace('http://', 'ws://').replace('https://', 'wss://')

  logger.log(`🚀 Application is running on: ${appUrl}`)
  logger.log(`📡 WebSocket server available at: ${wsUrl}`)

  if (module?.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }

  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  return app
}
bootstrap()
