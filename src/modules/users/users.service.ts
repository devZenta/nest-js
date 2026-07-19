import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { Prisma, Role } from '../../../generated/prisma/client.js';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUser: Prisma.UserCreateInput) {
    return this.databaseService.user.create({
      data: createUser,
    });
  }

  async findAll(role?: string) {
    if (!role) {
      return this.databaseService.user.findMany();
    }
    return this.databaseService.user.findMany({
      where: {
        role: role as Role,
      },
    });
  }

  async findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateUser: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({
      where: { id },
      data: updateUser,
    });
  }

  async remove(id: number) {
    return this.databaseService.user.delete({
      where: { id },
    });
  }
}
