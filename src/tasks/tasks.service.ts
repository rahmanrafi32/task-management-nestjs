import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Status } from './task-status.enum';
import { Create_taskDto } from './dto/create_task.dto';
import { Task } from '../TypeORM Entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Get_task_by_filterDto } from './dto/get_task_by_filter.dto';
import { UserEntity } from '../TypeORM Entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getAllTasks(
    filteredDto: Get_task_by_filterDto,
    user: UserEntity,
  ): Promise<Task[]> {
    const query = this.taskRepository.createQueryBuilder('task');
    query.where({ user });
    const { search, status } = filteredDto;
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    } else return query.getMany();
  }

  async getTaskById(id: string, user: UserEntity): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id, user });
    if (!task) throw new NotFoundException(`Task ${id} is not found`);
    return task;
  }

  async createTask(
    createTaskDto: Create_taskDto,
    user: UserEntity,
  ): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.taskRepository.create({
      title,
      description,
      status: Status.OPEN,
      user,
    });
    await this.taskRepository.save(task);
    return task;
  }

  async updateTask(
    id: string,
    status: Status,
    user: UserEntity,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }

  async deleteTask(id: string, user: UserEntity): Promise<string> {
    const deleteTs = await this.taskRepository.delete({ id, user });
    if (deleteTs.affected) {
      return JSON.stringify({ message: 'Task has been deleted' });
    } else throw new UnauthorizedException();
  }
}
