import { Test, TestingModule } from '@nestjs/testing';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

describe('ListsController', () => {
  let controller: ListsController;
  const mockRepository = {};
  const mockJwt = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListsService, {
          provide: getRepositoryToken(List),
          useValue: mockRepository
        },
        UsersService, {
          provide: getRepositoryToken(User),
          useValue: mockRepository
        }
      ],
      controllers: [ListsController],
    }).compile();

    controller = module.get<ListsController>(ListsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
