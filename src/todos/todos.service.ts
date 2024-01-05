import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { List } from './entities/list.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) { }

  create(createTodoDto: CreateTodoDto, list: List, user: User) {
    createTodoDto["author"] = user;
    createTodoDto["list"] = list;
    createTodoDto["deadline"] = createTodoDto["deadline"] ? new Date(createTodoDto["deadline"]) : null;

    return this.todosRepository.save(createTodoDto);
  }

  findAll() {
    return this.todosRepository.find({
      relations: {
        author: true,
        list: true,
      },
    });
  }

  findOne(id: string) {
    return this.todosRepository.findOne({
      where: { id },
      relations: {
        author: true,
        list: true,
        flags: true,
      },
    });
  }

  findOneWithListOwners(id: string) {
    return this.todosRepository.findOne({
      where: { id },
      relations: {
        author: true,
        flags: true,
        list: {
          owners: true,
        }
      },
    });
  }
}
