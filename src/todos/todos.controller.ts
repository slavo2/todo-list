import { Controller, Get, Post, Body, Patch, Param, Delete, Req, BadRequestException, ForbiddenException } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { GetTodoResponseDto } from './dto/get-todo-response.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
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
