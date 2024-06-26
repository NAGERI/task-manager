import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/task.dto';
import { PrismaService } from '../prisma.service';

import { Prisma, task as TaskPrismaModel } from '@prisma/client';
import { AuthCredentialsDto } from 'src/auth/dto/authCredentials.dto';

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

  async getTasks(user: any): Promise<TaskPrismaModel[]> {
    return this.prisma.task.findMany({
      where: { userId: user.id },
    });
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

  async createTask(data: CreateTaskDto, user: any): Promise<any> {
    try {
      const { name, description } = data;
      const res = await this.prisma.task.create({
        data: { name, description, userId: user.id },
      });
      return res;
    } catch (error) {
      return error;
    }
  }

  async updateTask(params: {
    where: Prisma.taskWhereUniqueInput;
    data: Prisma.taskUpdateInput;
  }): Promise<any> {
    const { where, data } = params;

    try {
      const res = await this.prisma.task.update({
        data,
        where,
      });
      return res;
    } catch (error) {
      return error;
    }
  }

  async deleteTask(id: Number): Promise<any> {
    try {
      const res = await this.prisma.task.delete({
        where: { id: Number(id) },
      });
      return res;
    } catch (error) {
      return error;
    }
  }
}
