import { IsNotEmpty } from 'class-validator';

export class Create_taskDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
