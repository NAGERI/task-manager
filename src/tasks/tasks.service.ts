import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/task.dto';
import { PrismaService } from '../prisma.service';

import { Prisma, task as TaskPrismaModel } from '@prisma/client';
import { TasksModule } from './tasks.module';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  getTaskById(id: string): Promise<TaskPrismaModel> {
    const found = this.prisma.task.findUnique({ where: { id: Number(id) } });
    if (!found) {
      throw new NotFoundException('Task of that ID not found!');
    }
    return found;
  }

  async getTasks(): Promise<TaskPrismaModel[]> {
    return this.prisma.task.findMany();
  }

  async getAllTasks(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.taskWhereUniqueInput;
    where?: Prisma.taskWhereInput;
    orderBy?: Prisma.taskOrderByWithRelationInput;
  }): Promise<TaskPrismaModel[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.task.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTask(data: CreateTaskDto): Promise<TaskPrismaModel> {
    return this.prisma.task.create({
      data,
    });
  }

  async updateTask(params: {
    where: Prisma.taskWhereUniqueInput;
    data: Prisma.taskUpdateInput;
  }): Promise<TaskPrismaModel> {
    const { where, data } = params;
    return this.prisma.task.update({
      data,
      where,
    });
  }

  async deleteTask(
    where: Prisma.taskWhereUniqueInput,
  ): Promise<TaskPrismaModel> {
    return this.prisma.task.delete({
      where,
    });
  }
}
