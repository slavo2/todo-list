import { Test, TestingModule } from '@nestjs/testing';
import { ListsService } from './lists.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { List } from './entities/list.entity';

describe('ListsService', () => {
  let service: ListsService;
  const mockRepository = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListsService, {
        provide: getRepositoryToken(List),
        useValue: mockRepository
      }],
      exports: [ListsService]
    }).compile();

    service = module.get<ListsService>(ListsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
