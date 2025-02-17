import { IsNotEmpty, IsOptional } from 'class-validator';
import { ETaskStatus } from '../task.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;
}

export class UpdateTaskStatusDto {
  @IsNotEmpty()
  @ApiProperty({ enum: ['OPEN', 'IN_PROGRESS', 'DONE'] })
  status: ETaskStatus;
}

export class TaskFilterDto {
  @IsOptional()
  @ApiPropertyOptional({ enum: ['OPEN', 'IN_PROGRESS', 'DONE'] })
  status: ETaskStatus;

  @IsOptional()
  @ApiPropertyOptional()
  search: string;
}
