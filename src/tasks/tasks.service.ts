import { Injectable, NotFoundException } from '@nestjs/common';
import { Status, TaskModel } from './task.model';
import { v4 as uuid } from 'uuid';
import { Create_taskDto } from './dto/create_task.dto';
import { Get_task_by_filterDto } from './dto/get_task_by_filter.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class TasksService {
  private tasks: TaskModel[] = [];

  getAllTasks(): TaskModel[] {
    return this.tasks;
  }

  filteredTask(filteredDto: Get_task_by_filterDto): TaskModel[] {
    const { search, status } = filteredDto;
    console.log(search, status);
    let tasks = this.getAllTasks();
    if (status) {
      tasks = this.tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = this.tasks.filter((task) => {
        return task.title.includes(search) || task.description.includes(search);
      });
    }
    return tasks;
  }

  getTaskById(id: string): TaskModel {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) throw new NotFoundException(`Task ${id} is not found`);
    return task;
  }

  createTask(createTaskDto: Create_taskDto): TaskModel {
    const { title, description } = createTaskDto;
    const task: TaskModel = {
      id: uuid(),
      title,
      description,
      status: Status.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, status: Status): TaskModel {
    console.log(id, status);
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deleteTask(id: string): TaskModel[] {
    this.getTaskById(id);
    return this.tasks.filter((task) => task.id !== id);
  }
}
