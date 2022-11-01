import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './TypeORM Entities/task.entity';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './TypeORM Entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('HOST'),
        port: configService.get('PORT'),
        username: 'postgres',
        password: 'rafi325011',
        database: 'Task Management',
        autoLoadEntities: true,
        synchronize: true,
        entities: [Task, UserEntity],
      }),
      inject: [ConfigService],
    }),
    TasksModule,
    UserModule,
  ],
})
export class AppModule {}
