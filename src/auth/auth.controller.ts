import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthCredentialsDto,
  createUserSchema,
} from './dto/authCredentials.dto';
import { Response } from 'express';
import { CreateUserValidatorPipe } from 'src/utils/validation.pipe';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @UsePipes(new CreateUserValidatorPipe(createUserSchema))
  async signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res() res: Response,
  ) {
    const { username, password } = authCredentialsDto;
    const result = await this.authService.createUser({
      username,
      password,
    });
    if (result instanceof Error) {
      throw new ConflictException('User already exists!');
    }
    return res.status(HttpStatus.CREATED).json(result);
  }

  @Post('/signin')
  @UsePipes(new CreateUserValidatorPipe(createUserSchema))
  async signin(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res() res: Response,
  ) {
    const { username, password } = authCredentialsDto;
    const result = await this.authService.signInUser({
      username,
      password,
    });
    if (result instanceof Error) {
      throw new UnauthorizedException('Username or Password is wrong!');
    }
    return res.status(HttpStatus.OK).json(result);
  }

  @Get('/test')
  @UseGuards(AuthGuard())
  async getUsers(@Req() req: Request) {
    console.log(req);
  }
}
