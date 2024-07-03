import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.userService.findOneByName(username);
    if (user && user.password === pass) {
      return user;
    }

    throw new BadRequestException('账号或密码不正确!');
  }

  async signIn(username: string, password: string) {
    return this.jwtService.sign({ username, password });
  }

  signUp(username: string, password: string) {
    return {
      msg: username + password + 'hello signUp--------',
    };
  }
}
