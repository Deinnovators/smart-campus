import { AuthService } from '@api/auth/auth.service';
import { JwtAuthGuard } from '@api/auth/jwt-auth.guard';
import { LocalAuthGuard } from '@api/auth/local-auth.guard';
import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  VERSION_NEUTRAL,
} from '@nestjs/common';

@Controller({
  path: 'auth',
  version: VERSION_NEUTRAL,
})
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
