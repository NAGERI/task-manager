import { IsEnum } from 'class-validator';
import { TaskStatus } from '../tasks.model';

export class UpdateTaskDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;

  name: string;
  description: string;
}
