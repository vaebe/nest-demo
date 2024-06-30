import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  signIn(username: string, password: string) {
    return this.userService.findAll();
  }

  signUp(username: string, password: string) {
    return {
      msg: username + password + 'hello signUp--------',
    };
  }
}
