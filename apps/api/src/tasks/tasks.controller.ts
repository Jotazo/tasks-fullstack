import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CustomErrorHandler } from 'src/custom-error-handler/custom-error-handler';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly errorHandler: CustomErrorHandler,
  ) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const task = await this.tasksService.findOne(id);
      if (!task) this.errorHandler.handleNotFound();
      return task;
    } catch (error) {
      this.errorHandler.handleCatchErrors(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.tasksService.update(id, updateTaskDto);
      if (!task) this.errorHandler.handleNotFound();
      return task;
    } catch (error) {
      this.errorHandler.handleCatchErrors(error);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    try {
      const task = await this.tasksService.remove(id);
      if (!task) this.errorHandler.handleNotFound();
      return task;
    } catch (error) {
      this.errorHandler.handleCatchErrors(error);
    }
  }
}
