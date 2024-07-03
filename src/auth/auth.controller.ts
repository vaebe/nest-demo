import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthSignInDto } from './dto/sign-in.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() dto: AuthSignInDto) {
    const { username, password } = dto;

    return {
      token: await this.authService.signIn(username, password),
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('signup')
  signUp(@Body() dto: AuthSignInDto) {
    const { username, password } = dto;
    return this.authService.signUp(username, password);
  }
}
