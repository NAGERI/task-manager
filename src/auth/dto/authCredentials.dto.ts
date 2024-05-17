import * as Joi from 'joi';

export class AuthCredentialsDto {
  username: string;
  password: string;
}

export const createUserSchema = Joi.object({
  username: Joi.string().min(5).required(),
  password: Joi.string()
    .min(8)
    .max(16)
    .regex(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    .required(),
}).options({
  abortEarly: false,
});
