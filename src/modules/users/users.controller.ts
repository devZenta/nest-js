import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  BadRequestException,
  Query,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { Prisma } from '../../../generated/prisma/client.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUser: Prisma.UserCreateInput) {
    const user = await this.usersService.create(createUser);
    if (!user) {
      throw new BadRequestException(
        "Erreur lors de la création de l'utilisateur",
      );
    }
    return user;
  }

  @Get()
  @HttpCode(200)
  async findAll(@Query('role') role?: string) {
    const users = await this.usersService.findAll(role);
    if (!users) {
      throw new BadRequestException(
        'Erreur lors de la récupération des utilisateurs',
      );
    }
    return users;
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(
        "Erreur lors de la récupération de l'utilisateur",
      );
    }
    return user;
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: Prisma.UserUpdateInput,
  ) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(
        "Erreur lors de la récupération de l'utilisateur",
      );
    }
    const updatedUser = await this.usersService.update(id, updateUser);
    if (!updatedUser) {
      throw new BadRequestException(
        "Erreur lors de la mise à jour de l'utilisateur",
      );
    }
    return updatedUser;
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(
        "Erreur lors de la récupération de l'utilisateur",
      );
    }
    const deletedUser = await this.usersService.remove(id);
    if (!deletedUser) {
      throw new BadRequestException(
        "Erreur lors de la suppression de l'utilisateur",
      );
    }
    return { message: 'Utilisateur supprimé avec succès' };
  }
}
