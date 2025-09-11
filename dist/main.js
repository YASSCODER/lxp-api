/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.controller.ts":
/*!*******************************!*\
  !*** ./src/app.controller.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./src/app.service.ts");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),

/***/ "./src/app.module.ts":
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./src/app.controller.ts");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./src/app.service.ts");
const core_module_config_1 = __webpack_require__(/*! ./common/config/module-groupe/core-module.config */ "./src/common/config/module-groupe/core-module.config.ts");
const application_core_module_config_1 = __webpack_require__(/*! ./common/config/module-groupe/application-core-module.config */ "./src/common/config/module-groupe/application-core-module.config.ts");
const Modules = [...core_module_config_1.CoreModule, ...application_core_module_config_1.ApplicationCoreModule];
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [...Modules],
        providers: [app_service_1.AppService],
        controllers: [app_controller_1.AppController],
    })
], AppModule);


/***/ }),

/***/ "./src/app.service.ts":
/*!****************************!*\
  !*** ./src/app.service.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),

/***/ "./src/auth/api/auth.controller.ts":
/*!*****************************************!*\
  !*** ./src/auth/api/auth.controller.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./src/auth/api/auth.service.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! ../guards/jwt-auth.guard */ "./src/auth/guards/jwt-auth.guard.ts");
const local_auth_guard_1 = __webpack_require__(/*! ../guards/local-auth.guard */ "./src/auth/guards/local-auth.guard.ts");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    verify() {
        return true;
    }
    async login(request) {
        return this.authService.login(request.user);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('verify'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "verify", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),

/***/ "./src/auth/api/auth.service.ts":
/*!**************************************!*\
  !*** ./src/auth/api/auth.service.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const user_entity_1 = __webpack_require__(/*! @/common/models/entities/user.entity */ "./src/common/models/entities/user.entity.ts");
const errors_utils_1 = __webpack_require__(/*! @/common/utils/errors.utils */ "./src/common/utils/errors.utils.ts");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const bcrypt = __webpack_require__(/*! bcryptjs */ "bcryptjs");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async validateUser(credentials) {
        const user = await this.userRepository.findOne({
            where: {
                email: (0, typeorm_2.ILike)(credentials.email),
            },
            relations: {
                role: true,
            },
        });
        if (!user)
            (0, errors_utils_1.throwAuthorizationValidationError)({
                message: {
                    en: 'Account does not exist',
                    ar: 'الحساب غير موجود',
                },
            });
        const isCorrectPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isCorrectPassword) {
            (0, errors_utils_1.throwAuthorizationValidationError)({
                message: {
                    en: 'Invalid password',
                    ar: 'كلمة المرور غير صحيحة',
                },
            });
        }
        if (user && isCorrectPassword) {
            return user;
        }
        return null;
    }
    async login(user) {
        const title = user.role.title;
        const payload = { id: user.id, role: user.role };
        const userPayload = {
            id: user.id,
            role: user.role,
            fullname: user.fullName,
            email: user.email,
            learnerId: user.learnerId,
            instructorId: user.instructorId,
        };
        return {
            token: this.jwtService.sign(payload),
            title,
            ...userPayload,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);


/***/ }),

/***/ "./src/auth/auth.module.ts":
/*!*********************************!*\
  !*** ./src/auth/auth.module.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const user_entity_1 = __webpack_require__(/*! @/common/models/entities/user.entity */ "./src/common/models/entities/user.entity.ts");
const auth_controller_1 = __webpack_require__(/*! ./api/auth.controller */ "./src/auth/api/auth.controller.ts");
const auth_service_1 = __webpack_require__(/*! ./api/auth.service */ "./src/auth/api/auth.service.ts");
const local_strategy_1 = __webpack_require__(/*! ./strategies/local.strategy */ "./src/auth/strategies/local.strategy.ts");
const jwt_strategy_1 = __webpack_require__(/*! ./strategies/jwt.strategy */ "./src/auth/strategies/jwt.strategy.ts");
const local_auth_guard_1 = __webpack_require__(/*! ./guards/local-auth.guard */ "./src/auth/guards/local-auth.guard.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! ./guards/jwt-auth.guard */ "./src/auth/guards/jwt-auth.guard.ts");
const roles_guard_1 = __webpack_require__(/*! ./guards/roles.guard */ "./src/auth/guards/roles.guard.ts");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET') || 'your-secret-key',
                    signOptions: {
                        expiresIn: configService.get('JWT_EXPIRATION') || '24h',
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            local_auth_guard_1.LocalAuthGuard,
            jwt_auth_guard_1.JwtAuthGuard,
            roles_guard_1.RolesGuard,
        ],
        exports: [auth_service_1.AuthService, jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard],
    })
], AuthModule);


/***/ }),

/***/ "./src/auth/decorators/roles.decorator.ts":
/*!************************************************!*\
  !*** ./src/auth/decorators/roles.decorator.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ }),

/***/ "./src/auth/guards/jwt-auth.guard.ts":
/*!*******************************************!*\
  !*** ./src/auth/guards/jwt-auth.guard.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
exports.getUserFromContext = getUserFromContext;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const async_hooks_1 = __webpack_require__(/*! async_hooks */ "async_hooks");
const asyncLocalStorage = new async_hooks_1.AsyncLocalStorage();
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    async canActivate(context) {
        const activate = (await super.canActivate(context));
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (user) {
            asyncLocalStorage.run(new Map(), () => {
                const store = asyncLocalStorage.getStore();
                if (store) {
                    store.set('user', user);
                    if (user.isImpersonation) {
                        store.set('impersonatedBy', user.impersonatedBy);
                        store.set('impersonatorEmail', user.impersonatorEmail);
                    }
                }
            });
        }
        return activate;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);
function getUserFromContext() {
    const store = asyncLocalStorage.getStore();
    return store ? store.get('user') : null;
}


/***/ }),

/***/ "./src/auth/guards/local-auth.guard.ts":
/*!*********************************************!*\
  !*** ./src/auth/guards/local-auth.guard.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
let LocalAuthGuard = class LocalAuthGuard extends (0, passport_1.AuthGuard)('local') {
};
exports.LocalAuthGuard = LocalAuthGuard;
exports.LocalAuthGuard = LocalAuthGuard = __decorate([
    (0, common_1.Injectable)()
], LocalAuthGuard);


/***/ }),

/***/ "./src/auth/guards/roles.guard.ts":
/*!****************************************!*\
  !*** ./src/auth/guards/roles.guard.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const roles_decorator_1 = __webpack_require__(/*! ../decorators/roles.decorator */ "./src/auth/decorators/roles.decorator.ts");
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.includes(user.role.title);
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);


/***/ }),

/***/ "./src/auth/selector/find-one.selector.ts":
/*!************************************************!*\
  !*** ./src/auth/selector/find-one.selector.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.authSelector = void 0;
exports.authSelector = {
    id: true,
    email: true,
    password: true,
    createdAt: true,
    updatedAt: true,
    learnerId: true,
    instructorId: true,
    instructor: {
        id: true,
        rating: true,
        isVerified: true,
    },
    learner: {
        id: true,
        roi: true,
        score: true,
    },
    isActive: true,
    role: {
        id: true,
        title: true,
    },
};


/***/ }),

/***/ "./src/auth/strategies/jwt.strategy.ts":
/*!*********************************************!*\
  !*** ./src/auth/strategies/jwt.strategy.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const find_one_selector_1 = __webpack_require__(/*! ../selector/find-one.selector */ "./src/auth/selector/find-one.selector.ts");
const user_entity_1 = __webpack_require__(/*! @/common/models/entities/user.entity */ "./src/common/models/entities/user.entity.ts");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(config, repository) {
        super({
            ignoreExpiration: false,
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        });
        this.config = config;
        this.repository = repository;
    }
    async validate(payload) {
        const user = await this.repository.findOne({
            where: { id: payload.id },
            relations: { role: true, learner: true, instructor: true },
            select: find_one_selector_1.authSelector,
        });
        if (!user) {
            return null;
        }
        return {
            ...user,
        };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], JwtStrategy);


/***/ }),

/***/ "./src/auth/strategies/local.strategy.ts":
/*!***********************************************!*\
  !*** ./src/auth/strategies/local.strategy.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const errors_utils_1 = __webpack_require__(/*! @/common/utils/errors.utils */ "./src/common/utils/errors.utils.ts");
const passport_local_1 = __webpack_require__(/*! passport-local */ "passport-local");
const auth_service_1 = __webpack_require__(/*! ../api/auth.service */ "./src/auth/api/auth.service.ts");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authService) {
        super({ usernameField: 'email' });
        this.authService = authService;
    }
    async validate(email, password) {
        const user = await this.authService.validateUser({ email, password });
        if (!user) {
            (0, errors_utils_1.throwAuthorizationValidationError)({
                message: {
                    en: 'Credentials provided are not correct',
                    ar: 'البيانات المقدمة غير صحيحة',
                },
            });
        }
        return user;
    }
};
exports.LocalStrategy = LocalStrategy;
exports.LocalStrategy = LocalStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LocalStrategy);


/***/ }),

/***/ "./src/common/config/app/config.module.ts":
/*!************************************************!*\
  !*** ./src/common/config/app/config.module.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppConfigModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const config_service_1 = __webpack_require__(/*! ./config.service */ "./src/common/config/app/config.service.ts");
const configuration_1 = __webpack_require__(/*! ./configuration */ "./src/common/config/app/configuration.ts");
let AppConfigModule = class AppConfigModule {
};
exports.AppConfigModule = AppConfigModule;
exports.AppConfigModule = AppConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forFeature(configuration_1.default)],
        providers: [config_service_1.AppConfigService],
        exports: [config_service_1.AppConfigService],
    })
], AppConfigModule);


/***/ }),

/***/ "./src/common/config/app/config.service.ts":
/*!*************************************************!*\
  !*** ./src/common/config/app/config.service.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppConfigService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let AppConfigService = class AppConfigService {
    constructor(configService) {
        this.configService = configService;
    }
    get env() {
        return this.configService.get('app.env');
    }
    get name() {
        return this.configService.get('app.name');
    }
    get url() {
        return this.configService.get('app.url');
    }
    get port() {
        return this.configService.get('app.port');
    }
};
exports.AppConfigService = AppConfigService;
exports.AppConfigService = AppConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], AppConfigService);


/***/ }),

/***/ "./src/common/config/app/configuration.ts":
/*!************************************************!*\
  !*** ./src/common/config/app/configuration.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
exports["default"] = (0, config_1.registerAs)('app', () => ({
    env: process.env.APP_ENV ?? 'dev',
    name: process.env.APP_NAME ?? 'LXP',
    url: process.env.APP_URL ?? 'http://localhost:3000',
    port: parseInt(process.env.APP_PORT ?? '3000', 10),
}));


/***/ }),

/***/ "./src/common/config/database/postgres/config.module.ts":
/*!**************************************************************!*\
  !*** ./src/common/config/database/postgres/config.module.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostgresConfigModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_service_1 = __webpack_require__(/*! ./config.service */ "./src/common/config/database/postgres/config.service.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const postgres_config_module_1 = __webpack_require__(/*! ./postgres-config.module */ "./src/common/config/database/postgres/postgres-config.module.ts");
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


/***/ }),

/***/ "./src/common/config/database/postgres/config.service.ts":
/*!***************************************************************!*\
  !*** ./src/common/config/database/postgres/config.service.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostgresConfigService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let PostgresConfigService = class PostgresConfigService {
    constructor(configService) {
        this.configService = configService;
    }
    get database() {
        return this.configService.get('postgres.database');
    }
    get entities() {
        return this.configService.get('postgres.entities');
    }
    get host() {
        return this.configService.get('postgres.host');
    }
    get password() {
        return this.configService.get('postgres.password');
    }
    get port() {
        return Number(this.configService.get('postgres.port'));
    }
    get synchronize() {
        return this.configService.get('postgres.synchronize');
    }
    get type() {
        return this.configService.get('postgres.type');
    }
    get username() {
        return this.configService.get('postgres.username');
    }
    get ssl() {
        return this.configService.get('postgres.ssl');
    }
};
exports.PostgresConfigService = PostgresConfigService;
exports.PostgresConfigService = PostgresConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], PostgresConfigService);


/***/ }),

/***/ "./src/common/config/database/postgres/configuration.ts":
/*!**************************************************************!*\
  !*** ./src/common/config/database/postgres/configuration.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
exports["default"] = (0, config_1.registerAs)('postgres', () => ({
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


/***/ }),

/***/ "./src/common/config/database/postgres/postgres-config.module.ts":
/*!***********************************************************************!*\
  !*** ./src/common/config/database/postgres/postgres-config.module.ts ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostgresConfigServiceModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const config_service_1 = __webpack_require__(/*! ./config.service */ "./src/common/config/database/postgres/config.service.ts");
const configuration_1 = __webpack_require__(/*! ./configuration */ "./src/common/config/database/postgres/configuration.ts");
let PostgresConfigServiceModule = class PostgresConfigServiceModule {
};
exports.PostgresConfigServiceModule = PostgresConfigServiceModule;
exports.PostgresConfigServiceModule = PostgresConfigServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forFeature(configuration_1.default)],
        providers: [config_service_1.PostgresConfigService],
        exports: [config_service_1.PostgresConfigService],
    })
], PostgresConfigServiceModule);


/***/ }),

/***/ "./src/common/config/module-groupe/application-core-module.config.ts":
/*!***************************************************************************!*\
  !*** ./src/common/config/module-groupe/application-core-module.config.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApplicationCoreModule = void 0;
const auth_module_1 = __webpack_require__(/*! @/auth/auth.module */ "./src/auth/auth.module.ts");
exports.ApplicationCoreModule = [auth_module_1.AuthModule];


/***/ }),

/***/ "./src/common/config/module-groupe/core-module.config.ts":
/*!***************************************************************!*\
  !*** ./src/common/config/module-groupe/core-module.config.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CoreModule = void 0;
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const config_module_1 = __webpack_require__(/*! ../app/config.module */ "./src/common/config/app/config.module.ts");
const config_module_2 = __webpack_require__(/*! ../database/postgres/config.module */ "./src/common/config/database/postgres/config.module.ts");
exports.CoreModule = [
    config_1.ConfigModule.forRoot({ isGlobal: true }),
    config_module_1.AppConfigModule,
    config_module_2.PostgresConfigModule,
];


/***/ }),

/***/ "./src/common/models/embedded/file.entity.ts":
/*!***************************************************!*\
  !*** ./src/common/models/embedded/file.entity.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileEmbedded = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
class FileEmbedded {
}
exports.FileEmbedded = FileEmbedded;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], FileEmbedded.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], FileEmbedded.prototype, "key", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], FileEmbedded.prototype, "fileName", void 0);


/***/ }),

/***/ "./src/common/models/embedded/name.entity.ts":
/*!***************************************************!*\
  !*** ./src/common/models/embedded/name.entity.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NameEmbedded = void 0;
class NameEmbedded {
}
exports.NameEmbedded = NameEmbedded;


/***/ }),

/***/ "./src/common/models/entities/badge-learner-link.entity.ts":
/*!*****************************************************************!*\
  !*** ./src/common/models/entities/badge-learner-link.entity.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BadgeLearnerLink = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_model_entity_1 = __webpack_require__(/*! ../types/base-model.entity */ "./src/common/models/types/base-model.entity.ts");
const badge_entity_1 = __webpack_require__(/*! ./badge.entity */ "./src/common/models/entities/badge.entity.ts");
const learner_entity_1 = __webpack_require__(/*! ./learner.entity */ "./src/common/models/entities/learner.entity.ts");
let BadgeLearnerLink = class BadgeLearnerLink extends base_model_entity_1.BaseModel {
};
exports.BadgeLearnerLink = BadgeLearnerLink;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BadgeLearnerLink.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], BadgeLearnerLink.prototype, "badgeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], BadgeLearnerLink.prototype, "learnerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], BadgeLearnerLink.prototype, "isAssigned", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => badge_entity_1.Badge, (badge) => badge.learnerLinks),
    (0, typeorm_1.JoinColumn)({ name: 'badgeId' }),
    __metadata("design:type", typeof (_a = typeof badge_entity_1.Badge !== "undefined" && badge_entity_1.Badge) === "function" ? _a : Object)
], BadgeLearnerLink.prototype, "badge", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => learner_entity_1.Learner, (learner) => learner.badgeLinks),
    (0, typeorm_1.JoinColumn)({ name: 'learnerId' }),
    __metadata("design:type", typeof (_b = typeof learner_entity_1.Learner !== "undefined" && learner_entity_1.Learner) === "function" ? _b : Object)
], BadgeLearnerLink.prototype, "learner", void 0);
exports.BadgeLearnerLink = BadgeLearnerLink = __decorate([
    (0, typeorm_1.Entity)('badge_learner_link')
], BadgeLearnerLink);


/***/ }),

/***/ "./src/common/models/entities/badge.entity.ts":
/*!****************************************************!*\
  !*** ./src/common/models/entities/badge.entity.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Badge = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_model_entity_1 = __webpack_require__(/*! ../types/base-model.entity */ "./src/common/models/types/base-model.entity.ts");
const file_entity_1 = __webpack_require__(/*! ../embedded/file.entity */ "./src/common/models/embedded/file.entity.ts");
const badge_learner_link_entity_1 = __webpack_require__(/*! ./badge-learner-link.entity */ "./src/common/models/entities/badge-learner-link.entity.ts");
let Badge = class Badge extends base_model_entity_1.BaseModel {
};
exports.Badge = Badge;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Badge.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], Badge.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Badge.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", typeof (_a = typeof file_entity_1.FileEmbedded !== "undefined" && file_entity_1.FileEmbedded) === "function" ? _a : Object)
], Badge.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => badge_learner_link_entity_1.BadgeLearnerLink, (link) => link.badge),
    __metadata("design:type", Array)
], Badge.prototype, "learnerLinks", void 0);
exports.Badge = Badge = __decorate([
    (0, typeorm_1.Entity)('badge')
], Badge);


/***/ }),

/***/ "./src/common/models/entities/instructor-skill-linker.entity.ts":
/*!**********************************************************************!*\
  !*** ./src/common/models/entities/instructor-skill-linker.entity.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InstructorSkillLinker = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_model_entity_1 = __webpack_require__(/*! ../types/base-model.entity */ "./src/common/models/types/base-model.entity.ts");
const instructor_entity_1 = __webpack_require__(/*! ./instructor.entity */ "./src/common/models/entities/instructor.entity.ts");
const skills_entity_1 = __webpack_require__(/*! ./skills.entity */ "./src/common/models/entities/skills.entity.ts");
let InstructorSkillLinker = class InstructorSkillLinker extends base_model_entity_1.BaseModel {
};
exports.InstructorSkillLinker = InstructorSkillLinker;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], InstructorSkillLinker.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], InstructorSkillLinker.prototype, "instructorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], InstructorSkillLinker.prototype, "skillId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], InstructorSkillLinker.prototype, "proficiencyLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], InstructorSkillLinker.prototype, "yearsOfExperience", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => instructor_entity_1.Instructor, (instructor) => instructor.skillLink),
    (0, typeorm_1.JoinColumn)({ name: 'instructorId' }),
    __metadata("design:type", typeof (_a = typeof instructor_entity_1.Instructor !== "undefined" && instructor_entity_1.Instructor) === "function" ? _a : Object)
], InstructorSkillLinker.prototype, "instructor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => skills_entity_1.Skill, (skill) => skill.instructorLinks),
    (0, typeorm_1.JoinColumn)({ name: 'skillId' }),
    __metadata("design:type", typeof (_b = typeof skills_entity_1.Skill !== "undefined" && skills_entity_1.Skill) === "function" ? _b : Object)
], InstructorSkillLinker.prototype, "skill", void 0);
exports.InstructorSkillLinker = InstructorSkillLinker = __decorate([
    (0, typeorm_1.Entity)('instructor_skill'),
    (0, typeorm_1.Unique)(['instructorId', 'skillId'])
], InstructorSkillLinker);


/***/ }),

/***/ "./src/common/models/entities/instructor.entity.ts":
/*!*********************************************************!*\
  !*** ./src/common/models/entities/instructor.entity.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Instructor = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_model_entity_1 = __webpack_require__(/*! ../types/base-model.entity */ "./src/common/models/types/base-model.entity.ts");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./src/common/models/entities/user.entity.ts");
const instructor_skill_linker_entity_1 = __webpack_require__(/*! ./instructor-skill-linker.entity */ "./src/common/models/entities/instructor-skill-linker.entity.ts");
let Instructor = class Instructor extends base_model_entity_1.BaseModel {
};
exports.Instructor = Instructor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Instructor.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Instructor.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Instructor.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.instructor),
    __metadata("design:type", Array)
], Instructor.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => instructor_skill_linker_entity_1.InstructorSkillLinker, (isl) => isl.instructor),
    __metadata("design:type", Array)
], Instructor.prototype, "skillLink", void 0);
exports.Instructor = Instructor = __decorate([
    (0, typeorm_1.Entity)('instructor')
], Instructor);


/***/ }),

/***/ "./src/common/models/entities/learner-skill-linker.entity.ts":
/*!*******************************************************************!*\
  !*** ./src/common/models/entities/learner-skill-linker.entity.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LearnerSkillLinker = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_model_entity_1 = __webpack_require__(/*! ../types/base-model.entity */ "./src/common/models/types/base-model.entity.ts");
const learner_entity_1 = __webpack_require__(/*! ./learner.entity */ "./src/common/models/entities/learner.entity.ts");
const skills_entity_1 = __webpack_require__(/*! ./skills.entity */ "./src/common/models/entities/skills.entity.ts");
let LearnerSkillLinker = class LearnerSkillLinker extends base_model_entity_1.BaseModel {
};
exports.LearnerSkillLinker = LearnerSkillLinker;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LearnerSkillLinker.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], LearnerSkillLinker.prototype, "learnerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], LearnerSkillLinker.prototype, "skillId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], LearnerSkillLinker.prototype, "currentLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], LearnerSkillLinker.prototype, "targetLevel", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => learner_entity_1.Learner, (learner) => learner.skillLink),
    (0, typeorm_1.JoinColumn)({ name: 'learnerId' }),
    __metadata("design:type", typeof (_a = typeof learner_entity_1.Learner !== "undefined" && learner_entity_1.Learner) === "function" ? _a : Object)
], LearnerSkillLinker.prototype, "learner", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => skills_entity_1.Skill, (skill) => skill.learnerLinks),
    (0, typeorm_1.JoinColumn)({ name: 'skillId' }),
    __metadata("design:type", typeof (_b = typeof skills_entity_1.Skill !== "undefined" && skills_entity_1.Skill) === "function" ? _b : Object)
], LearnerSkillLinker.prototype, "skill", void 0);
exports.LearnerSkillLinker = LearnerSkillLinker = __decorate([
    (0, typeorm_1.Entity)('learner_skill'),
    (0, typeorm_1.Unique)(['learnerId', 'skillId'])
], LearnerSkillLinker);


/***/ }),

/***/ "./src/common/models/entities/learner.entity.ts":
/*!******************************************************!*\
  !*** ./src/common/models/entities/learner.entity.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Learner = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_model_entity_1 = __webpack_require__(/*! ../types/base-model.entity */ "./src/common/models/types/base-model.entity.ts");
const badge_learner_link_entity_1 = __webpack_require__(/*! ./badge-learner-link.entity */ "./src/common/models/entities/badge-learner-link.entity.ts");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./src/common/models/entities/user.entity.ts");
const presence_entity_1 = __webpack_require__(/*! ./presence.entity */ "./src/common/models/entities/presence.entity.ts");
const learner_skill_linker_entity_1 = __webpack_require__(/*! ./learner-skill-linker.entity */ "./src/common/models/entities/learner-skill-linker.entity.ts");
let Learner = class Learner extends base_model_entity_1.BaseModel {
};
exports.Learner = Learner;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Learner.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Learner.prototype, "roi", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Learner.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Learner.prototype, "isPresent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.learner),
    __metadata("design:type", Array)
], Learner.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => badge_learner_link_entity_1.BadgeLearnerLink, (link) => link.learner),
    __metadata("design:type", Array)
], Learner.prototype, "badgeLinks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => presence_entity_1.Presence, (p) => p.learner),
    __metadata("design:type", Array)
], Learner.prototype, "presences", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => learner_skill_linker_entity_1.LearnerSkillLinker, (lsl) => lsl.learner),
    __metadata("design:type", Array)
], Learner.prototype, "skillLink", void 0);
exports.Learner = Learner = __decorate([
    (0, typeorm_1.Entity)('learner')
], Learner);


/***/ }),

/***/ "./src/common/models/entities/module.entity.ts":
/*!*****************************************************!*\
  !*** ./src/common/models/entities/module.entity.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Module = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const file_entity_1 = __webpack_require__(/*! ../embedded/file.entity */ "./src/common/models/embedded/file.entity.ts");
const skills_entity_1 = __webpack_require__(/*! ./skills.entity */ "./src/common/models/entities/skills.entity.ts");
const base_model_entity_1 = __webpack_require__(/*! ../types/base-model.entity */ "./src/common/models/types/base-model.entity.ts");
let Module = class Module extends base_model_entity_1.BaseModel {
};
exports.Module = Module;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Module.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false, unique: true }),
    __metadata("design:type", String)
], Module.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Module.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", typeof (_a = typeof file_entity_1.FileEmbedded !== "undefined" && file_entity_1.FileEmbedded) === "function" ? _a : Object)
], Module.prototype, "file", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => skills_entity_1.Skill, (skill) => skill.modules),
    __metadata("design:type", typeof (_b = typeof skills_entity_1.Skill !== "undefined" && skills_entity_1.Skill) === "function" ? _b : Object)
], Module.prototype, "skill", void 0);
exports.Module = Module = __decorate([
    (0, typeorm_1.Entity)('module')
], Module);


/***/ }),

/***/ "./src/common/models/entities/presence.entity.ts":
/*!*******************************************************!*\
  !*** ./src/common/models/entities/presence.entity.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Presence = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const learner_entity_1 = __webpack_require__(/*! ./learner.entity */ "./src/common/models/entities/learner.entity.ts");
const base_model_entity_1 = __webpack_require__(/*! ../types/base-model.entity */ "./src/common/models/types/base-model.entity.ts");
const session_entity_1 = __webpack_require__(/*! ./session.entity */ "./src/common/models/entities/session.entity.ts");
let Presence = class Presence extends base_model_entity_1.BaseModel {
};
exports.Presence = Presence;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Presence.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], Presence.prototype, "learnerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Presence.prototype, "sessionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => learner_entity_1.Learner, (l) => l.presences),
    __metadata("design:type", typeof (_a = typeof learner_entity_1.Learner !== "undefined" && learner_entity_1.Learner) === "function" ? _a : Object)
], Presence.prototype, "learner", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => session_entity_1.Session, (s) => s.presences),
    (0, typeorm_1.JoinColumn)({ name: 'sessionId' }),
    __metadata("design:type", typeof (_b = typeof session_entity_1.Session !== "undefined" && session_entity_1.Session) === "function" ? _b : Object)
], Presence.prototype, "session", void 0);
exports.Presence = Presence = __decorate([
    (0, typeorm_1.Entity)('presence')
], Presence);


/***/ }),

/***/ "./src/common/models/entities/role.entity.ts":
/*!***************************************************!*\
  !*** ./src/common/models/entities/role.entity.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_model_entity_1 = __webpack_require__(/*! ../types/base-model.entity */ "./src/common/models/types/base-model.entity.ts");
const name_entity_1 = __webpack_require__(/*! ../embedded/name.entity */ "./src/common/models/embedded/name.entity.ts");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./src/common/models/entities/user.entity.ts");
let Role = class Role extends base_model_entity_1.BaseModel {
};
exports.Role = Role;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Role.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', unique: true, nullable: false }),
    __metadata("design:type", typeof (_a = typeof name_entity_1.NameEmbedded !== "undefined" && name_entity_1.NameEmbedded) === "function" ? _a : Object)
], Role.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.role),
    __metadata("design:type", Array)
], Role.prototype, "users", void 0);
exports.Role = Role = __decorate([
    (0, typeorm_1.Entity)('role')
], Role);


/***/ }),

/***/ "./src/common/models/entities/session.entity.ts":
/*!******************************************************!*\
  !*** ./src/common/models/entities/session.entity.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Session = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_model_entity_1 = __webpack_require__(/*! ../types/base-model.entity */ "./src/common/models/types/base-model.entity.ts");
const presence_entity_1 = __webpack_require__(/*! ./presence.entity */ "./src/common/models/entities/presence.entity.ts");
let Session = class Session extends base_model_entity_1.BaseModel {
};
exports.Session = Session;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Session.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", String)
], Session.prototype, "startAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", String)
], Session.prototype, "endAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Session.prototype, "scheduledAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => presence_entity_1.Presence, (p) => p.session),
    __metadata("design:type", Array)
], Session.prototype, "presences", void 0);
exports.Session = Session = __decorate([
    (0, typeorm_1.Entity)('session')
], Session);


/***/ }),

/***/ "./src/common/models/entities/skills.entity.ts":
/*!*****************************************************!*\
  !*** ./src/common/models/entities/skills.entity.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Skill = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const name_entity_1 = __webpack_require__(/*! ../embedded/name.entity */ "./src/common/models/embedded/name.entity.ts");
const instructor_skill_linker_entity_1 = __webpack_require__(/*! ./instructor-skill-linker.entity */ "./src/common/models/entities/instructor-skill-linker.entity.ts");
const learner_skill_linker_entity_1 = __webpack_require__(/*! ./learner-skill-linker.entity */ "./src/common/models/entities/learner-skill-linker.entity.ts");
const module_entity_1 = __webpack_require__(/*! ./module.entity */ "./src/common/models/entities/module.entity.ts");
const base_model_entity_1 = __webpack_require__(/*! ../types/base-model.entity */ "./src/common/models/types/base-model.entity.ts");
let Skill = class Skill extends base_model_entity_1.BaseModel {
};
exports.Skill = Skill;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Skill.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", typeof (_a = typeof name_entity_1.NameEmbedded !== "undefined" && name_entity_1.NameEmbedded) === "function" ? _a : Object)
], Skill.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => instructor_skill_linker_entity_1.InstructorSkillLinker, (isl) => isl.skill),
    __metadata("design:type", Array)
], Skill.prototype, "instructorLinks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => learner_skill_linker_entity_1.LearnerSkillLinker, (lsl) => lsl.skill),
    __metadata("design:type", Array)
], Skill.prototype, "learnerLinks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => module_entity_1.Module, (module) => module.skill),
    __metadata("design:type", typeof (_b = typeof module_entity_1.Module !== "undefined" && module_entity_1.Module) === "function" ? _b : Object)
], Skill.prototype, "modules", void 0);
exports.Skill = Skill = __decorate([
    (0, typeorm_1.Entity)('skill')
], Skill);


/***/ }),

/***/ "./src/common/models/entities/user.entity.ts":
/*!***************************************************!*\
  !*** ./src/common/models/entities/user.entity.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_model_entity_1 = __webpack_require__(/*! ../types/base-model.entity */ "./src/common/models/types/base-model.entity.ts");
const role_entity_1 = __webpack_require__(/*! ./role.entity */ "./src/common/models/entities/role.entity.ts");
const learner_entity_1 = __webpack_require__(/*! ./learner.entity */ "./src/common/models/entities/learner.entity.ts");
const instructor_entity_1 = __webpack_require__(/*! ./instructor.entity */ "./src/common/models/entities/instructor.entity.ts");
const file_entity_1 = __webpack_require__(/*! ../embedded/file.entity */ "./src/common/models/embedded/file.entity.ts");
let User = class User extends base_model_entity_1.BaseModel {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", typeof (_a = typeof file_entity_1.FileEmbedded !== "undefined" && file_entity_1.FileEmbedded) === "function" ? _a : Object)
], User.prototype, "file", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, unique: true, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: false }),
    __metadata("design:type", String)
], User.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "learnerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "instructorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_entity_1.Role, (role) => role.users),
    (0, typeorm_1.JoinColumn)({ name: 'roleId' }),
    __metadata("design:type", typeof (_b = typeof role_entity_1.Role !== "undefined" && role_entity_1.Role) === "function" ? _b : Object)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => learner_entity_1.Learner, (learner) => learner.users),
    (0, typeorm_1.JoinColumn)({ name: 'learnerId' }),
    __metadata("design:type", typeof (_c = typeof learner_entity_1.Learner !== "undefined" && learner_entity_1.Learner) === "function" ? _c : Object)
], User.prototype, "learner", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => instructor_entity_1.Instructor, (instructor) => instructor.users),
    (0, typeorm_1.JoinColumn)({ name: 'instructorId' }),
    __metadata("design:type", typeof (_d = typeof instructor_entity_1.Instructor !== "undefined" && instructor_entity_1.Instructor) === "function" ? _d : Object)
], User.prototype, "instructor", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('user')
], User);


/***/ }),

/***/ "./src/common/models/types/base-model.entity.ts":
/*!******************************************************!*\
  !*** ./src/common/models/types/base-model.entity.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseModel = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
class BaseModel {
}
exports.BaseModel = BaseModel;
__decorate([
    (0, typeorm_1.CreateDateColumn)({ nullable: true, type: 'date' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], BaseModel.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true, type: 'date' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], BaseModel.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.VersionColumn)({ nullable: true, type: 'number' }),
    __metadata("design:type", Number)
], BaseModel.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true, type: 'date' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], BaseModel.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ nullable: true, type: 'timestamp' }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], BaseModel.prototype, "createdAtTimestamp", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true, type: 'timestamp' }),
    __metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], BaseModel.prototype, "updatedAtTimestamp", void 0);


/***/ }),

/***/ "./src/common/utils/errors.utils.ts":
/*!******************************************!*\
  !*** ./src/common/utils/errors.utils.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.throwForbiddenError = exports.throwAuthorizationValidationError = exports.throwPopupValidationError = exports.throwFormValidationError = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const exceptions_1 = __webpack_require__(/*! @nestjs/common/exceptions */ "@nestjs/common/exceptions");
const throwFormValidationError = (errors) => {
    const errorResponse = {
        message: 'Form submission in invalid',
        errors: {
            ...errors,
        },
    };
    throw new common_1.HttpException(errorResponse, common_1.HttpStatus.BAD_REQUEST);
};
exports.throwFormValidationError = throwFormValidationError;
const throwPopupValidationError = (error) => {
    const errorResponse = {
        message: 'Form submission in invalid',
        error: error,
    };
    throw new common_1.HttpException(errorResponse, common_1.HttpStatus.BAD_REQUEST);
};
exports.throwPopupValidationError = throwPopupValidationError;
const throwAuthorizationValidationError = (error) => {
    const errorResponse = {
        message: 'Not Authorized',
        errors: error,
    };
    throw new exceptions_1.UnauthorizedException(errorResponse);
};
exports.throwAuthorizationValidationError = throwAuthorizationValidationError;
const throwForbiddenError = (errors) => {
    const errorResponse = {
        message: 'Form submission in invalid',
        errors: {
            ...errors,
        },
    };
    throw new common_1.HttpException(errorResponse, common_1.HttpStatus.FORBIDDEN);
};
exports.throwForbiddenError = throwForbiddenError;


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/common/exceptions":
/*!********************************************!*\
  !*** external "@nestjs/common/exceptions" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("@nestjs/common/exceptions");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/passport":
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),

/***/ "reflect-metadata":
/*!***********************************!*\
  !*** external "reflect-metadata" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("reflect-metadata");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),

/***/ "async_hooks":
/*!******************************!*\
  !*** external "async_hooks" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("async_hooks");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./src/app.module.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(3000);
}
bootstrap();

})();

/******/ })()
;