import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { Todo } from './entities/todo.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TodosController } from './todos.controller';

describe('TodosService', () => {
  let service: TodosService;
  const mockRepository = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosService, {
        provide: getRepositoryToken(Todo),
        useValue: mockRepository
      }],
      exports: [TodosService]
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
