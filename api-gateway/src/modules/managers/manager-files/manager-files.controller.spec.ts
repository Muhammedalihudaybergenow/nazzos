import { Test, TestingModule } from '@nestjs/testing';
import { ManagerFilesController } from './manager-files.controller';
import { ManagerFilesService } from './manager-files.service';

describe('ManagerFilesController', () => {
  let controller: ManagerFilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagerFilesController],
      providers: [ManagerFilesService],
    }).compile();

    controller = module.get<ManagerFilesController>(ManagerFilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
