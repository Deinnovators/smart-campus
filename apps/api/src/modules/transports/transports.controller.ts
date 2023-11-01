import { TransportsService } from '@api/modules/transports/transports.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Prisma } from 'database';

@Controller('transports')
export class TransportsController {
  constructor(private readonly service: TransportsService) {}

  @Get('/schedules')
  getAllSchedules() {
    return this.service.getAllSchedule();
  }

  @Get('/drivers')
  getAllDriverNumbers() {
    return this.service.getAllDriverNumbers();
  }

  @Get('/ongoing-upcoming')
  getOngoingUpcoming() {
    return this.service.getOngoingUpcoming();
  }

  @Get('/trips')
  getOngoingTrips() {
    return this.service.getOngoingTrips();
  }

  @Post('/trips')
  createTrip(@Body() data: Prisma.TripCreateInput) {
    return this.service.createTrip(data);
  }

  @Patch('/trips/:id')
  updateTrip(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Prisma.TripUpdateInput,
  ) {
    return this.service.updateTrip(id, data);
  }

  @Delete('/trips/:id')
  deleteTrip(@Param('id', ParseIntPipe) id: number) {
    return this.service.deleteTrip(id);
  }
}
