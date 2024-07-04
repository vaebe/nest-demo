import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthSignInDto } from './dto/sign-in.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() dto: AuthSignInDto) {
    const { username, password } = dto;

    const user = await this.authService.validateUser(username, password);

    return {
      ...user,
      token: await this.authService.signIn(username, password),
    };
  }

  @Post('signup')
  signUp(@Body() dto: AuthSignInDto) {
    const { username, password } = dto;
    return this.authService.signUp(username, password);
  }
}
