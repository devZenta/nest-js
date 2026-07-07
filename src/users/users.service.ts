import { Injectable } from '@nestjs/common';
import type { User } from '../types/users.type';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'user' },
    { id: '2', name: 'Jane Doe', email: 'jane.doe@example.com', role: 'admin' },
    { id: '3', name: 'Jill Doe', email: 'jill.doe@example.com', role: 'user' },
    { id: '4', name: 'Jim Doe', email: 'jim.doe@example.com', role: 'user' },
    { id: '5', name: 'Jack Doe', email: 'jack.doe@example.com', role: 'admin' },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    return this.users.find((user) => user.id === id) as User;
  }

  create(user: User): User {
    const newId = (this.users.length + 1).toString();
    const newUser: User = {
      ...user,
      id: newId,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, user: User): User {
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = user;
    return user;
  }

  delete(id: string): string {
    this.users = this.users.filter((user) => user.id !== id);
    return 'User deleted successfully';
  }
}
