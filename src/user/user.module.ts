import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../TypeORM Entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtValidator } from './jwtValidator';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'iTsMySeCrEt',
      signOptions: { expiresIn: 3600 },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtValidator],
  exports: [JwtValidator, PassportModule],
})
export class UserModule {}
