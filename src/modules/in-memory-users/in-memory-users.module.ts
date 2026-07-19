import { Module } from '@nestjs/common';
import { InMemoryUsersController } from './in-memory-users.controller.js';
import { InMemoryUsersService } from './in-memory-users.service.js';

@Module({
  imports: [],
  controllers: [InMemoryUsersController],
  providers: [InMemoryUsersService],
})
export class InMemoryUsersModule {}
