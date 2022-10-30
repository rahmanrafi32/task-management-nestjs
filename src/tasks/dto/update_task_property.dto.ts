import { Status } from '../task-status.enum';
import { IsEnum } from 'class-validator';

export class Update_task_propertyDto {
  @IsEnum(Status)
  status: Status;
}
