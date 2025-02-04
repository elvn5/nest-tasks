import {
  DeleteResult,
  EntityRepository,
  Repository,
  UpdateResult,
} from 'typeorm';
import { ETaskStatus, Task } from './task.entity';
import { CreateTaskDto } from './dto';

@EntityRepository()
export class TasksRepository extends Repository<Task> {
  async createTask(dto: CreateTaskDto): Promise<Task> {
    const { title, description } = dto;

    const task = this.create({
      title,
      description,
      status: ETaskStatus.OPEN,
    });

    await this.save(task);

    return task;
  }

  async deleteTask(id: string): Promise<DeleteResult> {
    return this.delete(id);
  }

  async editTask(id: string, dto: CreateTaskDto): Promise<UpdateResult> {
    return this.update(id, dto);
  }
}
