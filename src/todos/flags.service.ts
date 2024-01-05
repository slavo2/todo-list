import { Injectable } from '@nestjs/common';
import { Flag } from './entities/flag.entity';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class FlagsService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
    @InjectRepository(Flag)
    private flagsRepository: Repository<Flag>,
  ) { }

  async findOrCreate(name: string) {
    const flag = await this.findOne(name);

    return flag ?? this.flagsRepository.save({ name: name });
  }

  findOne(name: string) {
    return this.flagsRepository.findOne({ where: { name: name } });
  }

  addFlag(flag: Flag, todo: Todo) {
    todo.flags = todo.flags ?? [];
    todo.flags.push(flag);

    return this.todosRepository.save(todo);
  }
}
