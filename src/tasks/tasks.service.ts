import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

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

  createTask(dto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(dto);
  }

  deleteTask(id: string) {
    return this.tasksRepository.deleteTask(id);
  }

  editTask(id: string, dto: CreateTaskDto) {
    return this.tasksRepository.editTask(id, dto);
  }
}
