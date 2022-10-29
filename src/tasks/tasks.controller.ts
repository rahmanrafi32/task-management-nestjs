import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Status, TaskModel } from './task.model';
import { Create_taskDto } from './dto/create_task.dto';
import { Get_task_by_filterDto } from './dto/get_task_by_filter.dto';
import { Update_task_propertyDto } from './dto/update_task_property.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filteredDto: Get_task_by_filterDto): TaskModel[] {
    if (Object.keys(filteredDto).length) {
      return this.taskService.filteredTask(filteredDto);
    }
    return this.taskService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): TaskModel {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTasks(@Body() createTaskDto: Create_taskDto): TaskModel {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): TaskModel[] {
    return this.taskService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() { status }: Update_task_propertyDto,
  ): TaskModel {
    return this.taskService.updateTask(id, status);
  }
}
