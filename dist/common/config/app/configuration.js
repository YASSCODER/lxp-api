"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('app', () => ({
    env: process.env.APP_ENV ?? 'dev',
    name: process.env.APP_NAME ?? 'LXP',
    url: process.env.APP_URL ?? 'http://localhost:3000',
    port: parseInt(process.env.APP_PORT ?? '3000', 10),
}));
//# sourceMappingURL=configuration.js.map