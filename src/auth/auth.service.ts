import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthCredentialsDto } from './dto/authCredentials.dto';
import { Prisma, User as AuthPrismaModel } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  private logger = new Logger('AuthService');

  async createUser(data: AuthCredentialsDto): Promise<any> {
    this.logger.verbose('User created');
    const { username } = data;
    try {
      const user = await this.prisma.user.findUnique({
        where: { username: username },
      });

      if (user != null && user.username === username)
        return 'User already exists.';

      const res = await this.prisma.user.create({
        data,
      });
      return res;
    } catch (error) {
      return error;
    }
  }
}
