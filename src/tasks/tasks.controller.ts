import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Create_taskDto } from './dto/create_task.dto';
import { Get_task_by_filterDto } from './dto/get_task_by_filter.dto';
import { Update_task_propertyDto } from './dto/update_task_property.dto';
import { Task } from '../TypeORM Entities/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../TypeORM Entities/user.entity';
import { GetUser } from '../custom decoretors/getUser.decoretor';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(
    @Query() filteredDto: Get_task_by_filterDto,
    @GetUser() user: UserEntity,
  ): Promise<Task[]> {
    return this.taskService.getAllTasks(filteredDto, user);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTasks(
    @Body() createTaskDto: Create_taskDto,
    @GetUser() user: UserEntity,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user);
  }
  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<string> {
    return this.taskService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() { status }: Update_task_propertyDto,
  ): Promise<Task> {
    return this.taskService.updateTask(id, status);
  }
}
