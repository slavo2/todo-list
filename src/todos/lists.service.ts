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

  create(createListDto: CreateListDto):Promise<List> {
    return this.listsRepository.save(createListDto);
  }

  findAll(): Promise<List[]> {
    return this.listsRepository.find();
  }

  findOne(id: string): Promise<List> {
    return this.listsRepository.findOneBy({ id });
  }

  update(id: string, updateListDto: UpdateListDto) {
    return `This action updates a #${id} list`;
  }

  remove(id: string) {
    return `This action removes a #${id} list`;
  }
}
