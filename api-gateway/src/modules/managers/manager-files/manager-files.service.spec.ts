import { Test, TestingModule } from '@nestjs/testing';
import { ManagerFilesService } from './manager-files.service';

describe('ManagerFilesService', () => {
  let service: ManagerFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagerFilesService],
    }).compile();

    service = module.get<ManagerFilesService>(ManagerFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
