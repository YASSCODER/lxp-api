import { registerAs } from '@nestjs/config'
export default registerAs('app', () => ({
  env: process.env.APP_ENV ?? process.env.NODE_ENV ?? 'dev',
  name: process.env.APP_NAME ?? 'LXP',
  url: process.env.APP_URL ?? 'http://localhost:3000',
  port: Number(process.env.PORT ?? process.env.APP_PORT ?? 3000),
  host: process.env.APP_HOST ?? '0.0.0.0',

}))
