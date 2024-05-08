import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthCredentialsDto } from './dto/authCredentials.dto';
import { Prisma, User as AuthPrismaModel } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  private logger = new Logger('AuthService');

  async createUser(data: AuthCredentialsDto): Promise<AuthPrismaModel> {
    this.logger.verbose('User created');
    return await this.prisma.user.create({
      data,
    });
  }
}
