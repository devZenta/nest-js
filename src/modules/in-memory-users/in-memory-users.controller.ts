import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateInMemoryUserDto } from './dto/create-in-memory-user.dto.js';
import { UpdateInMemoryUserDto } from './dto/update-in-memory-user.dto.js';
import type { InMemoryUser } from './types/in-memory-user.type.js';
import { InMemoryUsersService } from './in-memory-users.service.js';

@Controller('in-memory-users')
export class InMemoryUsersController {
  constructor(private readonly inMemoryUsersService: InMemoryUsersService) {}

  @Get()
  @HttpCode(200)
  findAll(): InMemoryUser[] {
    return this.inMemoryUsersService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string): InMemoryUser {
    return this.inMemoryUsersService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() newUser: CreateInMemoryUserDto): InMemoryUser {
    return this.inMemoryUsersService.create(newUser);
  }

  @Patch(':id')
  @HttpCode(200)
  update(
    @Param('id') id: string,
    @Body() updateUser: UpdateInMemoryUserDto,
  ): InMemoryUser {
    return this.inMemoryUsersService.update(id, updateUser);
  }

  @Delete(':id')
  @HttpCode(200)
  delete(@Param('id') id: string): string {
    return this.inMemoryUsersService.delete(id);
  }
}
