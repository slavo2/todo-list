import { Controller, Get, Post, Body, Patch, Param, Delete, Req, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetOneTodoResponseDto } from './dto/get-one-todo-response.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse, ApiForbiddenResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Public } from '../auth/public.decorator';
import { idIsUUIDParam } from './dto/id-is-uuid-param.dto';
import { ListsService } from './lists.service';
import { CreateTodoResponseDto } from './dto/create-todo-response.dto';
import { AddFlagDto } from './dto/add-flag.dto';
import { FlagsService } from './flags.service';
import { GetTodoResponseDto } from './dto/get-todo-response.dto';

@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
    private readonly listsService: ListsService,
    private readonly flagsService: FlagsService,
  ) { }

  @ApiBearerAuth()
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.'})
  @Post()
  async create(@Req() request: Request, @Body() createTodoDto: CreateTodoDto): Promise<CreateTodoResponseDto> {
    const userId = request["user"].id;
    const user = { username: request["user"].username, id: userId };
    const list = await this.listsService.findOne(createTodoDto.listId);
    if (!list) {
      throw new BadRequestException({listId: 'List not found.'});
    }
    if (!this.listsService.isOwner(list, userId)) {
      throw new ForbiddenException({ 'listId': 'You are not among owners of this list.' });
    }
    return this.todosService.create(createTodoDto, list, user);
  }


  @Public()
  @Get()
  findAll(): Promise<GetTodoResponseDto[]> {
    return this.todosService.findAll();
  }

  @Public()
  @ApiNotFoundResponse({ description: 'Not found.' })
  @Get(':id')
  async findOne(@Param() { id }: idIsUUIDParam): Promise<GetOneTodoResponseDto> {
    const todo = await this.todosService.findOne(id);
    if (!todo) {
      throw new NotFoundException();
    }
    return todo;
  }

  @ApiBearerAuth()
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiNotFoundResponse({ description: 'Not found.' })
  @Post(':id/flag')
  async flag(@Req() request: Request, @Param() { id }: idIsUUIDParam, @Body() addFlagDto: AddFlagDto): Promise<GetOneTodoResponseDto> {
    const todo = await this.todosService.findOneWithListOwners(id);
    if (!todo) {
      throw new NotFoundException();
    }
    if (!this.listsService.isOwner(todo.list, request['user'].id)) {
      throw new ForbiddenException('You can not add flag to this todo as you are not owner of the list.')
    }
    const flag = await this.flagsService.findOrCreate(addFlagDto.flagName);
    
    await this.flagsService.addFlag(flag, todo);

    return this.todosService.findOne(todo.id);
  }
}
