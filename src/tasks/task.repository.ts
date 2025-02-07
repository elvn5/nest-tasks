import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksRepository extends Repository<Task> {
  async deleteTask(id: string): Promise<DeleteResult> {
    return this.delete(id);
  }

  async editTask(id: string, dto: CreateTaskDto): Promise<UpdateResult> {
    return this.update(id, dto);
  }
}
