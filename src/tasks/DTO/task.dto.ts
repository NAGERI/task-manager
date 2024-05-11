import * as Joi from 'joi';

export class CreateTaskDto {
  name: string;
  description: string;
}

export const createTaskSchema = Joi.object({
  name: Joi.string().min(5).max(20).required(),
  description: Joi.string().min(5).max(20).required(),
}).options({
  abortEarly: false,
  allowUnknown: true,
});
