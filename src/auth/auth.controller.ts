import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthCredentialsDto,
  createUserSchema,
} from './dto/authCredentials.dto';
import { Response } from 'express';
import { CreateUserValidatorPipe } from 'src/utils/validation.pipe';

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
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ result });
    }
    return res.status(HttpStatus.CREATED).json({ result });
  }
}
