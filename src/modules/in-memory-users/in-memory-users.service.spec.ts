import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryUsersService } from './in-memory-users.service.js';

describe('InMemoryUsersService', () => {
  let service: InMemoryUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InMemoryUsersService],
    }).compile();

    service = module.get<InMemoryUsersService>(InMemoryUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
