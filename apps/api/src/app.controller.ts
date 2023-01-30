import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { AppService } from '@api/app.service';
import { Public } from '@api/decorators/public.decorator';

@Controller({
  version: VERSION_NEUTRAL,
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
