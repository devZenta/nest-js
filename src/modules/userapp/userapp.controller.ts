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
import { UserappService } from './userapp.service.js';
import { Prisma } from '../../../generated/prisma/client.js';

@Controller('userapp')
export class UserappController {
  constructor(private readonly userappService: UserappService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUser: Prisma.UserCreateInput) {
    const user = await this.userappService.create(createUser);
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
    const users = await this.userappService.findAll(role);
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
    const user = await this.userappService.findOne(id);
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
    const user = await this.userappService.findOne(id);
    if (!user) {
      throw new NotFoundException(
        "Erreur lors de la récupération de l'utilisateur",
      );
    }
    const updatedUser = await this.userappService.update(id, updateUser);
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
    const user = await this.userappService.findOne(id);
    if (!user) {
      throw new NotFoundException(
        "Erreur lors de la récupération de l'utilisateur",
      );
    }
    const deletedUser = await this.userappService.remove(id);
    if (!deletedUser) {
      throw new BadRequestException(
        "Erreur lors de la suppression de l'utilisateur",
      );
    }
    return { message: 'Utilisateur supprimé avec succès' };
  }
}
