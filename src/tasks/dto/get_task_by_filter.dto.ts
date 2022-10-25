import { Status } from '../task.model';

export class Get_task_by_filterDto {
  search?: string;
  status?: Status;
}
