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

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filteredDto: Get_task_by_filterDto): Promise<Task[]> {
    return this.taskService.getAllTasks(filteredDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTasks(@Body() createTaskDto: Create_taskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
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
