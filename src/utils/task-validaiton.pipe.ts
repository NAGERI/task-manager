import { BadRequestException, PipeTransform } from '@nestjs/common';
import Joi from 'joi';
import { CreateTaskDto } from 'src/tasks/dto/task.dto';

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
