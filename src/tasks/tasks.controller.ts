import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto, TaskFilterDto, UpdateTaskStatusDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { ApiResponse } from '@nestjs/swagger';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query() query: TaskFilterDto) {
    return this.tasksService.getAllTasks(query);
  }

  @Get('/:id')
  @ApiResponse({
    type: Task,
  })
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() dto: CreateTaskDto, @GetUser() user: User) {
    return this.tasksService.createTask(dto, user);
  }

  @Delete()
  deleteTask(@Query('id') id: string) {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTask(@Param('id') id: string, @Body() dto: UpdateTaskStatusDto) {
    return this.tasksService.updateTask(id, dto.status);
  }
}
