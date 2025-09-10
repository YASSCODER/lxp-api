"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('postgres', () => ({
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
    ssl: process.env.DB_HOST === 'localhost' ? false : { rejectUnauthorized: false },
}));
//# sourceMappingURL=configuration.js.map