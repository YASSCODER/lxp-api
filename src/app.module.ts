import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './common/config/module-groupe/core-module.config';
import { ApplicationCoreModule } from './common/config/module-groupe/application-core-module.config';
const Modules = [...CoreModule, ...ApplicationCoreModule];
@Module({
  imports: [...Modules],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
