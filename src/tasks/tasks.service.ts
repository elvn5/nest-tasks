import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TasksService {
  private tasksRepository: Repository<Task>;
  constructor(private dataSource: DataSource) {
    this.tasksRepository = this.dataSource.getRepository(Task);
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
}
