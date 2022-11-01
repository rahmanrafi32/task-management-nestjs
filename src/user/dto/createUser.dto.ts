import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  id: string;

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(16)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/, {
    message: `Password Should contain at least a capital letter, a small letter, a number,a special character and minimum length`,
  })
  password: string;
}
