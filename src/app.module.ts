import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './common/config/module-groupe/core-module.config';
const Modules = [...CoreModule];
@Module({
  imports: [...Modules],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
