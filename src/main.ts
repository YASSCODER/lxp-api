import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { useContainer } from 'class-validator';
import * as bodyParser from 'body-parser';
import { MAX_PARSE_LIMIT } from './common/config/constant/application.constant';
import { GeneralExceptionFilter } from './common/validation/general-exception-filter';
import { AppConfigService } from './common/config/app/config.service';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const module: any;

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig: AppConfigService = app.get(AppConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(helmet());
  app.use(bodyParser.json({ limit: MAX_PARSE_LIMIT }));
  app.use(bodyParser.urlencoded({ limit: MAX_PARSE_LIMIT, extended: true }));
  app.useGlobalPipes(new ValidationPipe());

  /*_________EXCEPTION_FILTERS___________*/
  app.useGlobalFilters(
    new GeneralExceptionFilter(),
    //new AllExceptionsFilter()
  );

  /*_________Swagger_Config___________*/
  await app.listen(appConfig.port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  app.getHttpServer();

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  return app;
}
bootstrap();
