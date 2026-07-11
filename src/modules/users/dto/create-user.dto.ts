import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
  IsEnum,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le nom est requis' })
  @MinLength(3, { message: 'Le nom doit contenir au moins 3 caractères' })
  @MaxLength(20, { message: 'Le nom ne doit pas dépasser 20 caractères' })
  name: string;

  @IsEmail({}, { message: "L'email doit être une adresse email valide" })
  @IsNotEmpty({ message: "L'email est requis" })
  email: string;

  @IsOptional({ message: 'Le rôle est facultatif' })
  @IsEnum(['admin', 'user'], { message: 'Le rôle doit être admin ou user' })
  role?: 'admin' | 'user';
}
