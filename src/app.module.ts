import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { InMemoryUsersModule } from './modules/in-memory-users/in-memory-users.module.js';
import { UsersModule } from './modules/users/users.module.js';

@Module({
  imports: [InMemoryUsersModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
