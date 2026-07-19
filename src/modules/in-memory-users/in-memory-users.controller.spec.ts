import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryUsersController } from './in-memory-users.controller.js';
import { InMemoryUsersService } from './in-memory-users.service.js';

describe('InMemoryUsersController', () => {
  let controller: InMemoryUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InMemoryUsersController],
      providers: [InMemoryUsersService],
    }).compile();

    controller = module.get<InMemoryUsersController>(InMemoryUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
