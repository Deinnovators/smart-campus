import { PrismaService } from '@api/modules/persistance/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, CourseOffering } from '@prisma/client';

@Injectable()
export class CourseOfferingService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<CourseOffering[]> {
    try {
      const offers = await this.prisma.courseOffering.findMany({
        orderBy: { id: 'asc' },
        include: { CourseDistribution: true },
      });
      return offers;
    } catch (error) {
      throw new Error('Failed to fetch offers');
    }
  }

  async findOne(id: number): Promise<CourseOffering> {
    try {
      const data = await this.prisma.courseOffering.findUnique({
        where: { id },
        include: { CourseDistribution: true },
      });

      if (!data) {
        throw new Error(`Data with id ${id} not found`);
      }
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch data with id ${id}`);
    }
  }

  async create(data: CourseOffering): Promise<CourseOffering> {
    try {
      return await this.prisma.courseOffering.create({ data });
    } catch (error) {
      throw new Error(`${error}  Failed to create offer`);
    }
  }

  async update(
    id: number,
    data: Prisma.CourseOfferingUpdateInput,
  ): Promise<CourseOffering> {
    try {
      const offer = await this.prisma.courseOffering.update({
        where: { id },
        data,
      });

      if (!offer) {
        throw new Error(`offer with id ${id} not found`);
      }

      return offer;
    } catch (error) {
      throw new Error(`Failed to update offer with id ${id}`);
    }
  }

  async delete(id: number): Promise<CourseOffering> {
    try {
      const distribution = await this.prisma.courseOffering.delete({
        where: { id },
      });

      if (!distribution) {
        throw new Error(`distribution with id ${id} not found`);
      }

      return distribution;
    } catch (error) {
      throw new Error(`Failed to delete distribution with id ${id}`);
    }
  }
}
