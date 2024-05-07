import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import * as Joi from 'joi';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password: string;
}

export const CreateUserSchema = Joi.object({
  name: Joi.string().min(5).max(20).required(),
  password: Joi.string()
    .min(8)
    .max(16)
    .regex(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    .required(),
}).options({
  abortEarly: false,
});
