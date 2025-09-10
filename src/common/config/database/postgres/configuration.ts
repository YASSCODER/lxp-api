import { registerAs } from '@nestjs/config';

export default registerAs('postgres', () => ({
  database: process.env.DB_NAME,
  entities: [
    __dirname + '/../../../models/entities/*.entity{.ts,.js}',
    __dirname + '/../../../models/embeded/*.entity{.ts,.js}',
  ],
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  type: 'postgres',
  username: process.env.DB_USERNAME,
  synchronize: true,
  ssl:
    process.env.DB_HOST === 'localhost' ? false : { rejectUnauthorized: false },
}));
