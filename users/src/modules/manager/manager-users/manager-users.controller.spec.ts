import { Test, TestingModule } from '@nestjs/testing';
import { ManagerUsersController } from './manager-users.controller';
import { ManagerUsersService } from './manager-users.service';

describe('ManagerUsersController', () => {
  let controller: ManagerUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagerUsersController],
      providers: [ManagerUsersService],
    }).compile();

    controller = module.get<ManagerUsersController>(ManagerUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
