import { PipeTransform, BadRequestException } from '@nestjs/common';

import { AuthCredentialsDto } from '../auth/dto/authCredentials.dto';
import Joi from 'joi';
import { CreateTaskDto } from 'src/tasks/dto/task.dto';

export class CreateUserValidatorPipe implements PipeTransform {
  constructor(private readonly schema: Joi.ObjectSchema) {}
  public transform(value: AuthCredentialsDto): AuthCredentialsDto {
    const result = this.schema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}

export class CreateTaskValidatorPipe implements PipeTransform {
  constructor(private readonly schema: Joi.ObjectSchema) {}
  public transform(value: CreateTaskDto): CreateTaskDto {
    const result = this.schema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
