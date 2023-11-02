import { PrismaService } from '@api/modules/persistance/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from 'database';

@Injectable()
export class TransportsService {
  constructor(private readonly prisma: PrismaService) {}
  tripInclude = {
    schedule: {
      include: {
        transport: true,
      },
    },
  };

  getAllSchedule() {
    return this.prisma.transportSchedule.findMany({
      include: { transport: true },
      orderBy: {
        time: 'asc',
      },
    });
  }

  getNextSchedule() {
    const date = new Date();
    const dateString = date.toISOString();
    const finalDate = new Date(`1970-01-01T${dateString.split('T')[1]}`);

    return this.prisma.transportSchedule.findMany({
      include: { transport: true },
      where: {
        time: {
          gte: finalDate,
        },
      },
    });
  }

  getAllDriverNumbers() {
    return this.prisma.driverNumbers.findMany();
  }

  async getOngoingTrips() {
    return this.prisma.trip.findMany({
      include: this.tripInclude,
    });
  }

  async getOngoingUpcoming() {
    const date = new Date();
    const dateString = date.toISOString();
    const finalDate = new Date(`1970-01-01T${dateString.split('T')[1]}`);

    const upcoming = await this.prisma.transportSchedule.findMany({
      include: { transport: true },
      where: {
        time: {
          gte: finalDate,
        },
      },
      take: 8,
    });
    const ongoing = await this.getOngoingTrips();

    return {
      ongoing,
      upcoming,
    };
  }

  createTrip(data: Prisma.TripCreateInput) {
    return this.prisma.trip.create({
      data,
      include: this.tripInclude,
    });
  }

  updateTrip(id: number, data: Prisma.TripUpdateInput) {
    return this.prisma.trip.update({
      where: { id },
      data,
      include: this.tripInclude,
    });
  }

  deleteTrip(id: number) {
    return this.prisma.trip.delete({
      where: { id },
      include: this.tripInclude,
    });
  }
}
