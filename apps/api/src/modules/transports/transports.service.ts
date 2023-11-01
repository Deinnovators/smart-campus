import { PrismaService } from '@api/modules/persistance/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from 'database';

@Injectable()
export class TransportsService {
  constructor(private readonly prisma: PrismaService) {}

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
      include: {
        schedule: {
          include: {
            transport: true,
          },
        },
      },
    });
  }

  async getOngoingUpcoming() {
    const date = new Date();
    const dateString = date.toISOString();
    const finalDate = new Date(`1970-01-01T${dateString.split('T')[1]}`);

    const upcoming = await this.prisma.transportSchedule.findMany({
      include: { transport: true },
      // where: {
      //   time: {
      //     gte: finalDate,
      //   },
      // },
      // take: 8,
    });
    const ongoing = await this.getOngoingTrips();

    return {
      ongoing,
      upcoming,
    };
  }

  createTrip(data: Prisma.TripCreateInput) {
    return this.prisma.trip.create({ data });
  }

  updateTrip(id: number, data: Prisma.TripUpdateInput) {
    return this.prisma.trip.update({ where: { id }, data });
  }

  deleteTrip(id: number) {
    return this.prisma.trip.delete({ where: { id } });
  }
}
