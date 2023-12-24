import { Test, TestingModule } from '@nestjs/testing';
import { ManagerRolesController } from './manager-roles.controller';
import { ManagerRolesService } from './manager-roles.service';

describe('ManagerRolesController', () => {
  let controller: ManagerRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagerRolesController],
      providers: [ManagerRolesService],
    }).compile();

    controller = module.get<ManagerRolesController>(ManagerRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
