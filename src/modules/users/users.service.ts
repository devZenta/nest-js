import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { Prisma, Role } from '../../../generated/prisma/client.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.databaseService.user.create({
        data: createUserDto,
      });
    } catch (error: unknown) {
      this.handlePrismaError(error);
    }
  }

  async findAll(role?: Role) {
    if (!role) {
      return await this.databaseService.user.findMany();
    }
    return await this.databaseService.user.findMany({
      where: {
        role,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.databaseService.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`Utilisateur non trouvé avec l'ID ${id}`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.databaseService.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error: unknown) {
      this.handlePrismaError(error, id);
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.user.delete({
        where: { id },
      });
    } catch (error: unknown) {
      this.handlePrismaError(error, id);
    }
  }

  private handlePrismaError(error: unknown, userId?: number): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new ConflictException('Cette adresse email est déjà utilisée');
      }

      if (error.code === 'P2025') {
        throw new NotFoundException(
          userId === undefined
            ? 'Utilisateur introuvable'
            : `Utilisateur ${userId} introuvable`,
        );
      }
    }

    throw error;
  }
}
