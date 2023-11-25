import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Req } from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { Public } from 'src/auth/public.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { idIsUUIDParam } from './dto/id-is-uuid-param.dto';
import { Request } from 'express';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) { }

  @ApiBearerAuth()
  @Post()
  create(@Req() request: Request, @Body() createListDto: CreateListDto) {
    return this.listsService.create(createListDto, request["user"].id);
  }

  @Public()
  @Get()
  findAll() {
    return this.listsService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param() { id }: idIsUUIDParam) {
    const list = await this.listsService.findOne(id);
    if (!list) {
      throw new NotFoundException()
    }
    return list;
  }

  @ApiBearerAuth()
  @Patch(':id')
  async update(@Param() { id }: idIsUUIDParam, @Body() updateListDto: UpdateListDto) {
    const list = await this.listsService.findOne(id);
    if (!list) {
      throw new NotFoundException()
    }
    return this.listsService.update(id, updateListDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param() { id }: idIsUUIDParam) {
    const list = await this.listsService.findOne(id);
    if (!list) {
      throw new NotFoundException()
    }
    return this.listsService.remove(id);
  }
}
