import { ConfigService } from '@nestjs/config';
export declare class AppConfigService {
    private configService;
    constructor(configService: ConfigService);
    get env(): string;
    get name(): string;
    get url(): string;
    get port(): number;
}
