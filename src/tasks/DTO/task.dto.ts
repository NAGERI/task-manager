import { IsNotEmpty, IsString } from 'class-validator';
import * as Joi from 'joi';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export const createTaskSchema = Joi.object({
  name: Joi.string().min(5).max(20).required(),
  description: Joi.string().min(5).required(),
}).options({
  abortEarly: false,
});
