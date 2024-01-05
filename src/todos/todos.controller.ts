import { Controller, Get, Post, Body, Patch, Param, Delete, Req, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { GetTodoResponseDto } from './dto/get-todo-response.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse, ApiForbiddenResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Public } from 'src/auth/public.decorator';
import { idIsUUIDParam } from './dto/id-is-uuid-param.dto';
import { ListsService } from './lists.service';

@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
    private readonly listsService: ListsService,
  ) { }

  @ApiBearerAuth()
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.'})
  @Post()
  async create(@Req() request: Request, @Body() createTodoDto: CreateTodoDto): Promise<GetTodoResponseDto> {
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

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Public()
  @ApiNotFoundResponse({ description: 'Not found.' })
  @Get(':id')
  async findOne(@Param() { id }: idIsUUIDParam): Promise<GetTodoResponseDto> {
    const todo = await this.todosService.findOne(id);
    if (!todo) {
      throw new NotFoundException();
    }
    return todo;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
