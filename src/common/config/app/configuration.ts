// app/configuration.ts
import { registerAs } from '@nestjs/config'

export default registerAs('app', () => ({
  env: process.env.APP_ENV ?? 'dev',
  name: process.env.APP_NAME ?? 'LXP',
  url: process.env.APP_URL ?? 'http://localhost:3000',
  port: parseInt(process.env.APP_PORT ?? '3000', 10),
}))
