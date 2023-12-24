import { Test, TestingModule } from '@nestjs/testing';
import { ManagerPermissionsService } from './manager-permissions.service';

describe('ManagerPermissionsService', () => {
  let service: ManagerPermissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagerPermissionsService],
    }).compile();

    service = module.get<ManagerPermissionsService>(ManagerPermissionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
