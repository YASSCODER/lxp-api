"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresConfigModule = void 0;
const common_1 = require("@nestjs/common");
const config_service_1 = require("./config.service");
const typeorm_1 = require("@nestjs/typeorm");
const postgres_config_module_1 = require("./postgres-config.module");
let PostgresConfigModule = class PostgresConfigModule {
};
exports.PostgresConfigModule = PostgresConfigModule;
exports.PostgresConfigModule = PostgresConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            postgres_config_module_1.PostgresConfigServiceModule,
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [postgres_config_module_1.PostgresConfigServiceModule],
                inject: [config_service_1.PostgresConfigService],
                useFactory: (postgresConfigService) => ({
                    type: 'postgres',
                    host: postgresConfigService.host,
                    port: postgresConfigService.port,
                    username: postgresConfigService.username,
                    password: postgresConfigService.password,
                    database: postgresConfigService.database,
                    entities: postgresConfigService.entities,
                    synchronize: postgresConfigService.synchronize,
                    ssl: postgresConfigService.ssl,
                }),
            }),
        ],
        exports: [postgres_config_module_1.PostgresConfigServiceModule],
    })
], PostgresConfigModule);
//# sourceMappingURL=config.module.js.map