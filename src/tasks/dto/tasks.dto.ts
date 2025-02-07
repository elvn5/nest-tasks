import { IsNotEmpty, IsOptional } from 'class-validator';
import { ETaskStatus } from '../task.entity';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

export class UpdateTaskStatusDto {
  @IsNotEmpty()
  status: ETaskStatus;
}

export class TaskFilterDto {
  @IsOptional()
  status: ETaskStatus;

  @IsOptional()
  search: string;
}
