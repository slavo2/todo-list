import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Req, BadRequestException, ForbiddenException } from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { Public } from 'src/auth/public.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { idIsUUIDParam } from './dto/id-is-uuid-param.dto';
import { Request } from 'express';
import { GetListResponseDto } from './dto/get-list-response.dto';
import { ShareListDto } from './dto/share-list.dto';
import { UsersService } from 'src/users/users.service';

@Controller('lists')
export class ListsController {
  constructor(
    private readonly listsService: ListsService,
    private readonly usersService: UsersService,
  ) { }

  @ApiBearerAuth()
  @Post()
  create(@Req() request: Request, @Body() createListDto: CreateListDto): Promise<GetListResponseDto> {
    const user = { username: request["user"].username, id: request["user"].id };
    return this.listsService.create(createListDto, user);
  }

  @Public()
  @Get()
  findAll(): Promise<GetListResponseDto[]> {
    return this.listsService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param() { id }: idIsUUIDParam): Promise<GetListResponseDto> {
    const list = await this.listsService.findOne(id);
    if (!list) {
      throw new NotFoundException();
    }
    return list;
  }

  @ApiBearerAuth()
  @Post(':id/share')
  async share(@Req() request: Request, @Param() { id }: idIsUUIDParam, @Body() shareListDto: ShareListDto): Promise<GetListResponseDto> {
    const list = await this.listsService.findOne(id);
    if (!list) {
      throw new NotFoundException();
    }
    if (!this.listsService.isOwner(list, request['user'].id)) {
      throw new ForbiddenException('You can not share this list as you are not its owner.')
    }
    const newOwner = await this.usersService.findOneById(shareListDto.userId);
    if (!newOwner) {
      throw new BadRequestException('User with provided id does not exist.')
    }
    if (this.listsService.isOwner(list, newOwner.id)) {
      throw new BadRequestException('Given user is already an owner of this list.')
    }
    return this.listsService.addOwner(list, newOwner);
  }

  @ApiBearerAuth()
  @Patch(':id')
  async update(@Param() { id }: idIsUUIDParam, @Body() updateListDto: UpdateListDto) {
    const list = await this.listsService.findOne(id);
    if (!list) {
      throw new NotFoundException();
    }
    return this.listsService.update(id, updateListDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param() { id }: idIsUUIDParam) {
    const list = await this.listsService.findOne(id);
    if (!list) {
      throw new NotFoundException();
    }
    return this.listsService.remove(id);
  }
}
