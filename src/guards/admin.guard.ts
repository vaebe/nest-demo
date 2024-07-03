import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log(req.user);

    const user = await this.userService.findOne(req.user.id);
    const userRoles = user.roles ?? [];
    const roleCodes = userRoles.map((role) => role.code);
    // todo 这里获取到用户信息后 判断用户的角色是否是admin
    const isAdamin = roleCodes.includes('admin');
    return isAdamin;
  }
}
