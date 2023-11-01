import { TransportsService } from '@api/modules/transports/transports.service';
import { Controller, Get } from '@nestjs/common';

@Controller('transports')
export class TransportsController {
  constructor(private readonly service: TransportsService) {}

  @Get('/schedules')
  async getAllSchedules() {
    return this.service.getAllSchedule();
  }
}
