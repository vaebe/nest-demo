import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.userService.findOneByName(username);

    if (!user) {
      throw new BadRequestException('用户不存在!');
    }

    const verifyPass = await argon2.verify(user.password, pass);

    if (!verifyPass) {
      throw new BadRequestException('账号或密码不正确!');
    }

    return user;
  }

  async signIn(username: string, password: string) {
    return this.jwtService.sign({ username, password });
  }

  async signUp(username: string, password: string) {
    if (!username || !password) {
      throw new HttpException('用户名或密码不能为空!', 400);
    }

    const user = await this.userService.findOneByName(username);

    if (user) {
      throw new HttpException('用户已存在请登录!', 200);
    }

    return await this.userService.create({ username, password });
  }
}
