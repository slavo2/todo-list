import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { ListsService } from './lists.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { List } from './entities/list.entity';

describe('TodosController', () => {
  let controller: TodosController;
  const mockRepository = {};
  const mockJwt = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosService, {
        provide: getRepositoryToken(Todo),
        useValue: mockRepository
      },
      ListsService, {
          provide: getRepositoryToken(List),
          useValue: mockRepository
      }],
      controllers: [TodosController],
    }).compile();

    controller = module.get<TodosController>(TodosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
