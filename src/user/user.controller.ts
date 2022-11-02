import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('signup')
  creatUser(@Body() createUserDto: CreateUserDto): Promise<string> {
    return this.userService.signUp(createUserDto);
  }

  @Post('signin')
  signIn(@Body() userDto: CreateUserDto): Promise<{ accessToken: string }> {
    return this.userService.signIn(userDto);
  }
}
