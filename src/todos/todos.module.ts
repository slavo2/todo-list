import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { UsersModule } from '../users/users.module';
import { Todo } from './entities/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([List, Todo]), UsersModule],
  controllers: [TodosController, ListsController],
  providers: [TodosService, ListsService],
})
export class TodosModule {}
