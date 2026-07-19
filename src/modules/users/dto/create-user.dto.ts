import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '../../../../generated/prisma/client.js';

export class CreateUserDto {
  @IsEmail({}, { message: "L'email doit être une adresse email valide" })
  email!: string;

  @IsOptional()
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  name?: string;

  @IsOptional()
  @IsEnum(Role, { message: 'Le rôle doit être ADMIN ou USER' })
  role?: Role;
}
