import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { userService } from './user.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, userService, PrismaService],
})
export class AuthModule {}
