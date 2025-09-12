import { registerAs } from '@nestjs/config';
import * as path from 'path';

export default registerAs('postgres', () => ({
  database: process.env.DB_NAME,
  entities: [
    path.join(__dirname, '../../../models/entities/*.entity{.ts,.js}'),
    path.join(__dirname, '../../../models/embedded/*.entity{.ts,.js}'),
  ],
  logging: ['query', 'error', 'schema'],
  synchronize: true,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: +process.env.DB_PORT,
  type: 'postgres',
  username: process.env.DB_USERNAME,
  ssl:
    process.env.DB_HOST === 'localhost' ? false : { rejectUnauthorized: false },
}));
