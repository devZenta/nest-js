import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInMemoryUserDto } from './dto/create-in-memory-user.dto.js';
import { UpdateInMemoryUserDto } from './dto/update-in-memory-user.dto.js';
import type { InMemoryUser } from './types/in-memory-user.type.js';

@Injectable()
export class InMemoryUsersService {
  private users: InMemoryUser[] = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'user' },
    { id: '2', name: 'Jane Doe', email: 'jane.doe@example.com', role: 'admin' },
    { id: '3', name: 'Jill Doe', email: 'jill.doe@example.com', role: 'user' },
    { id: '4', name: 'Jim Doe', email: 'jim.doe@example.com', role: 'user' },
    { id: '5', name: 'Jack Doe', email: 'jack.doe@example.com', role: 'admin' },
  ];

  findAll(): InMemoryUser[] {
    return this.users;
  }

  findOne(id: string): InMemoryUser {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'id ${id} non trouvé`);
    }
    return user;
  }

  create(userCreate: CreateInMemoryUserDto): InMemoryUser {
    const newId = (this.users.length + 1).toString();
    const newUser: InMemoryUser = {
      ...userCreate,
      id: newId,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, userUpdate: UpdateInMemoryUserDto): InMemoryUser {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`Utilisateur avec l'id ${id} non trouvé`);
    }
    this.users[index] = { ...userUpdate, id };
    return this.users[index];
  }

  delete(id: string): string {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`Utilisateur avec l'id ${id} non trouvé`);
    }
    this.users.splice(index, 1);
    return 'Utilisateur supprimé avec succès';
  }
}
