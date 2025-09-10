"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreModule = void 0;
const config_1 = require("@nestjs/config");
const config_module_1 = require("../app/config.module");
const config_module_2 = require("../database/postgres/config.module");
exports.CoreModule = [
    config_1.ConfigModule.forRoot({ isGlobal: true }),
    config_module_1.AppConfigModule,
    config_module_2.PostgresConfigModule,
];
//# sourceMappingURL=core-module.config.js.map