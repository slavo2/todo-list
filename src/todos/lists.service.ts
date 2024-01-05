import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './entities/list.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List)
    private listsRepository: Repository<List>,
  ) { }

  create(createListDto: CreateListDto, user: User) {
    createListDto["owners"] = [user];
    return this.listsRepository.save(createListDto);
  }

  findAll() {
    return this.listsRepository.find({
      relations: {
        owners: true,
      }
    });
  }

  findOne(id: string) {
    return this.listsRepository.findOne({
      where: { id },
      relations: {
        owners: true,
      },
    });
  }

  findOneWithTodos(id: string) {
    return this.listsRepository.findOne({
      where: { id },
      relations: {
        owners: true,
        todos: true,
      },
    });
  }

  isOwner(list: List, userId: string) {
    for (const owner of list.owners) {
      if (owner.id === userId) {
        return true;
      }
    }
    return false;
  }

  addOwner(list: List, user: User) {
    list.owners.push(user);
    return this.listsRepository.save(list);
  }

  update(id: string, updateListDto: UpdateListDto) {
    return `This action updates a #${id} list`;
  }

  remove(id: string) {
    return `This action removes a #${id} list`;
  }
}
