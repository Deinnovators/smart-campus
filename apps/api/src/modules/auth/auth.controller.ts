import { Public } from '@api/decorators/public.decorator';
import { AuthService } from '@api/modules/auth/auth.service';
import { LocalAuthGuard } from '@api/guards/local-auth.guard';
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

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
