import { IsEnum, IsOptional } from 'class-validator';
import { Role } from '../../../../generated/prisma/client.js';

export class FindUsersQueryDto {
  @IsOptional()
  @IsEnum(Role, { message: 'Le rôle doit être ADMIN ou USER' })
  role?: Role;
}
