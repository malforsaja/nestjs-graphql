import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserInput } from './dto/login-user.input';
import { User } from 'src/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { CreateUserInput } from 'src/users/dto/create-user.input';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(loginUserInput: LoginUserInput) {
    const { email, password } = loginUserInput;
    const user = await this.usersService.findOneByEmail(email);

    const isMatch = await bcrypt.compare(password, user?.password);

    if (user && isMatch) {
      return user;
    }

    return null;
  }

  async signup(payload: CreateUserInput) {
    const user = await this.usersService.findOneByEmail(payload.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    payload.role = 'admin'; // different logic for different roles, for now, we will set it to admin
    const hash = await bcrypt.hash(
      payload.password,
      Number(this.configService.get<string>('SALT_ROUND')),
    );

    return this.usersService.createUser({ ...payload, password: hash });
  }

  login(user: User) {
    return {
      user,
      token: this.jwtService.sign(
        {
          _id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
        },
      ),
    };
  }
}
