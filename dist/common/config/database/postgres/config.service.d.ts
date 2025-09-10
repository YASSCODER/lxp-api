import { ConfigService } from '@nestjs/config';
export declare class PostgresConfigService {
    private configService;
    constructor(configService: ConfigService);
    get database(): string | undefined;
    get entities(): string[] | undefined;
    get host(): string | undefined;
    get password(): string | undefined;
    get port(): number | undefined;
    get synchronize(): boolean | undefined;
    get type(): string | undefined;
    get username(): string | undefined;
    get ssl(): boolean | {
        rejectUnauthorized: boolean;
    } | undefined;
}
