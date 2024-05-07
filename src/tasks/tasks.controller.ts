import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Prisma, task as TaskModel } from '@prisma/client';

@Controller('/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('/:searchString')
  getFilteredTasks(
    @Param('searchString') searchString: string,
  ): Promise<TaskModel[]> {
    return this.tasksService.getAllTasks({
      where: {
        OR: [
          {
            name: { contains: searchString },
          },
          {
            description: { contains: searchString },
          },
        ],
      },
    });
  }

  @Get()
  getTasks(): Promise<TaskModel[]> {
    return this.tasksService.getTasks();
  }

  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.tasksService.getTaskById(id);
  // }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskModel> {
    const { name, description } = createTaskDto;
    return this.tasksService.createTask({
      name,
      description,
    });
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: Number): Promise<TaskModel> {
    return this.tasksService.deleteTask({ id: Number(id) });
  }

  @Patch('/:id')
  updateTask(
    @Param('id') id: Number,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<TaskModel> {
    const { status } = updateTaskStatusDto;

    try {
      return this.tasksService.updateTask({
        where: { id: Number(id) },
        data: { status },
      });
    } catch (error) {
      console.error(error);
    }
  }
}
