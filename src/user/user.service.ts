import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../TypeORM Entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<string> {
    const { username, password } = createUserDto;
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      username,
      password: hashedPass,
    });
    try {
      await this.userRepository.save(newUser);
    } catch (err) {
      if (err.code === '23505')
        throw new ConflictException('Username is already exist');
      else throw new InternalServerErrorException();
    }
    return JSON.stringify({ message: 'User created' });
  }

  async signIn(userDto: CreateUserDto): Promise<string> {
    const { username, password } = userDto;
    try {
      const user = await this.userRepository.findOneBy({ username });
      const comparePass = await bcrypt.compare(password, user.password);
      if (user && comparePass) return JSON.stringify({ message: 'Signed In' });
    } catch (err) {
      throw new UnauthorizedException("Credential didn't matched");
    }
  }
}
