import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthCredentialsDto } from './dto/authCredentials.dto';
import { Prisma, User as AuthPrismaModel } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  private logger = new Logger('AuthService');

  async createUser(data: AuthCredentialsDto): Promise<any> {
    const { username, password } = data;
    try {
      this.logger.verbose('User creation');

      const user = await this.prisma.user.findUnique({
        where: { username: username },
      });

      if (user != null && user.username === username)
        return Error('User already exists.');

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const data = {
        username,
        password: hashedPassword,
      };

      const res = await this.prisma.user.create({
        data,
      });
      this.logger.verbose('User created');
      return res;
    } catch (error) {
      return Error(error);
    }
  }

  async signInUser(data: AuthCredentialsDto): Promise<any> {
    const { username, password } = data;
    try {
      const user = await this.prisma.user.findUnique({
        where: { username },
      });

      if (user && bcrypt.compare(password, user.password)) {
        // the payload type is an interface of { username: string }
        const payload: IJwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
      } else {
        this.logger.log(user);
        return Error('Please check your credentials');
      }
    } catch (error) {
      return error;
    }
  }
}
