import { Test, TestingModule } from '@nestjs/testing';
import { ManagerPermissionsController } from './manager-permissions.controller';
import { ManagerPermissionsService } from './manager-permissions.service';

describe('ManagerPermissionsController', () => {
  let controller: ManagerPermissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagerPermissionsController],
      providers: [ManagerPermissionsService],
    }).compile();

    controller = module.get<ManagerPermissionsController>(ManagerPermissionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
