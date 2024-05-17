import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/authCredentials.dto';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): AuthCredentialsDto => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
