import { Status } from '../task-status.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class Get_task_by_filterDto {
  @IsOptional()
  @IsEnum(Status)
  search?: string;
  @IsOptional()
  @IsString()
  status?: Status;
}
