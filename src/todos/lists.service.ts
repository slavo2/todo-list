import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './entities/list.entity';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List)
    private listsRepository: Repository<List>,
  ) { }

  create(createListDto: CreateListDto, userId: string): Promise<List> {
    createListDto["owners"] = [{ id: userId }];
    return this.listsRepository.save(createListDto);
  }

  findAll(): Promise<List[]> {
    return this.listsRepository.find({
      relations: {
        owners: true,
      }
    });
  }

  findOne(id: string): Promise<List> {
    return this.listsRepository.findOne({
      where: { id },
      relations: {
        owners: true,
      },
    });
  }

  update(id: string, updateListDto: UpdateListDto) {
    return `This action updates a #${id} list`;
  }

  remove(id: string) {
    return `This action removes a #${id} list`;
  }
}
