export interface TaskModel {
  id: string;
  title: string;
  description: string;
  status: Status;
}

export enum Status {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
