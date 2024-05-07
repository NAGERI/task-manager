import { PipeTransform, BadRequestException } from '@nestjs/common';

import {
  CreateUserSchema,
  AuthCredentialsDto,
} from '../src/auth/dto/authCredentials.dto';

export class CreateUserValidatorPipe
  implements PipeTransform<AuthCredentialsDto>
{
  public transform(value: AuthCredentialsDto): AuthCredentialsDto {
    const result = CreateUserSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
