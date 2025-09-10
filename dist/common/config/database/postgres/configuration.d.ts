declare const _default: (() => {
    database: string;
    entities: string[];
    host: string;
    password: string;
    port: number;
    type: string;
    username: string;
    synchronize: boolean;
    ssl: boolean | {
        rejectUnauthorized: boolean;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    database: string;
    entities: string[];
    host: string;
    password: string;
    port: number;
    type: string;
    username: string;
    synchronize: boolean;
    ssl: boolean | {
        rejectUnauthorized: boolean;
    };
}>;
export default _default;
