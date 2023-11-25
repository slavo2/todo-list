import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ListsModule } from './lists/lists.module';
import { TodosModule } from './todos/todos.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_HOST: Joi.string().hostname(),
        DB_PORT: Joi.number().port(),
      }).messages({
        'any.required': '{{#label}} is a required environment variable (you may set it up in .env file)',
        'string.base': 'Environment variable {{#label}} must be a string (you may set it up in .env file)',
        'string.hostname': 'Environment variable {{#label}} must be a valid hostname (you may set it up in .env file)',
        'number.base': 'Environment variable {{#label}} must be a number (you may set it up in .env file)',
        'number.port': 'Environment variable {{#label}} must be a valid port (you may set it up in .env file)',
      })
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST') || '127.0.0.1',
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: true,
        autoLoadEntities: true,
      }),     
    }),
    UsersModule,
    AuthModule,
    ListsModule,
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
