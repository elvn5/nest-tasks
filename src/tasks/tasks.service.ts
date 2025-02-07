import { Injectable, NotFoundException } from '@nestjs/common';
import { ETaskStatus, Task } from './task.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateTaskDto, TaskFilterDto } from './dto';

@Injectable()
export class TasksService {
  private tasksRepository: Repository<Task>;
  constructor(private dataSource: DataSource) {
    this.tasksRepository = this.dataSource.getRepository(Task);
  }

  async getAllTasks(dto: TaskFilterDto) {
    const { search, status } = dto;

    const query = this.tasksRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) or LOWER(task.description) LIKE :search',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }

  async updateTask(id: string, status: ETaskStatus) {
    const task = await this.getTaskById(id);

    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async createTask(dto: CreateTaskDto): Promise<Task> {
    const { title, description } = dto;

    const task = this.tasksRepository.create({
      title,
      description,
      status: ETaskStatus.OPEN,
    });

    await this.tasksRepository.save(task);

    return task;
  }

  async deleteTask(id: string) {
    const task = await this.tasksRepository.delete(id);

    return task;
  }
}
