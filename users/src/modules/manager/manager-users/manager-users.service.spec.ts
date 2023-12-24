import { Test, TestingModule } from '@nestjs/testing';
import { ManagerUsersService } from './manager-users.service';

describe('ManagerUsersService', () => {
  let service: ManagerUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagerUsersService],
    }).compile();

    service = module.get<ManagerUsersService>(ManagerUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
