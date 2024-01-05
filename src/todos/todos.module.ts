import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { UsersModule } from '../users/users.module';
import { Todo } from './entities/todo.entity';
import { FlagsService } from './flags.service';
import { Flag } from './entities/flag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([List, Todo, Flag]), UsersModule],
  controllers: [TodosController, ListsController],
  providers: [TodosService, ListsService, FlagsService],
})
export class TodosModule {}
