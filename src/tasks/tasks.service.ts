import { Injectable, NotFoundException } from '@nestjs/common';
import { Status } from './task-status.enum';
import { Create_taskDto } from './dto/create_task.dto';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Get_task_by_filterDto } from './dto/get_task_by_filter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getAllTasks(filteredDto: Get_task_by_filterDto): Promise<Task[]> {
    const query = this.taskRepository.createQueryBuilder('task');
    const { search, status } = filteredDto;
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    } else return query.getMany();
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) throw new NotFoundException(`Task ${id} is not found`);
    return task;
  }

  async createTask(createTaskDto: Create_taskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.taskRepository.create({
      title,
      description,
      status: Status.OPEN,
    });
    await this.taskRepository.save(task);
    return task;
  }

  async updateTask(id: string, status: Status): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<string> {
    await this.taskRepository.delete(id);
    return JSON.stringify({ message: 'Task has been deleted' });
  }
}
