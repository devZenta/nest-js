import { PartialType } from '@nestjs/mapped-types';
import { CreateInMemoryUserDto } from './create-in-memory-user.dto.js';

export class UpdateInMemoryUserDto extends PartialType(CreateInMemoryUserDto) {}
