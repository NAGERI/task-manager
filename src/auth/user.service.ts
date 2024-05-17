import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthCredentialsDto } from './dto/authCredentials.dto';
// import { User as UserPrismaModel } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  private logger = new Logger('UserService');

  async createUser(data: AuthCredentialsDto): Promise<any> {
    this.logger.verbose('User created');
    return await this.prisma.user.create({
      data,
    });
  }
}
