import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, createTaskSchema } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task-status.dto';
import { Response } from 'express';
import { task as TaskModel } from '@prisma/client';
import { CreateTaskValidatorPipe } from 'src/utils/validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthCredentialsDto } from 'src/auth/dto/authCredentials.dto';

@Controller('/tasks')
@UseGuards(AuthGuard())
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

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: AuthCredentialsDto,
    @Res() res: Response,
  ) {
    const result = await this.tasksService.createTask(createTaskDto, user);
    if (result instanceof Error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ result });
    }
    return res.status(HttpStatus.CREATED).json({ result }); // Return JSON response
  }

  @Delete('/:id')
  async deleteTask(
    @Param('id', ParseIntPipe) id: Number,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.tasksService.deleteTask(Number(id));
    if (result instanceof Error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: result });
    }
    return res.status(HttpStatus.NO_CONTENT);
  }

  @Patch('/:id')
  async updateTask(
    @Param('id') id: Number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Res() res: Response,
  ): Promise<any> {
    const { status } = updateTaskDto;

    const result = await this.tasksService.updateTask({
      where: { id: Number(id) },
      data: { status },
    });

    if (result instanceof Error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: result });
    }
    return res.status(HttpStatus.OK).json({ result });
  }
}
