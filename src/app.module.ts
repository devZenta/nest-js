import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './modules/users/users.module.js';
import { UserAppModule } from './modules/userapp/userapp.module.js';

@Module({
  imports: [UsersModule, UserAppModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
