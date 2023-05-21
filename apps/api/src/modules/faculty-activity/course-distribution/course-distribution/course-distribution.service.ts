import { CourseDistribution, Section, Semester } from '.prisma/client';
import { PrismaService } from '@api/modules/persistance/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseDistributionService {
  constructor(private prisma: PrismaService) {}

  async getDistributedCourses(): Promise<CourseDistribution[]> {
    try {
      const courses = await this.prisma.courseDistribution.findMany({
        orderBy: { id: 'asc' },
        include: { courseOfferings: true },
      });
      return courses;
    } catch (error) {
      throw new Error('Failed to fetch courses');
    }
  }

  async getById(id: number): Promise<CourseDistribution> {
    try {
      const data = await this.prisma.courseDistribution.findUnique({
        where: { id },
        include: { courseOfferings: true },
      });

      if (!data) {
        throw new Error(`Data with id ${id} not found`);
      }

      return data;
    } catch (error) {
      throw new Error(`Failed to fetch data with id ${id}`);
    }
  }
  //not working
  async getDistributionByQuery(
    id: number,
    section?: Section,
    year?: string,
    semester?: Semester,
  ): Promise<CourseDistribution[]> {
    try {
      const query = {
        where: {
          departmentId: id,
        },
      };

      if (section) {
        query.where['section'] = section;
      }

      if (year) {
        query.where['academicYear'] = year;
      }
      if (semester) {
        query.where['semester'] = semester;
      }

      const distributions = await this.prisma.courseDistribution.findMany(
        query,
      );

      if (!distributions || distributions.length === 0) {
        throw new Error('No data found');
      }

      return distributions;
    } catch (error) {
      throw new Error(`Failed to fetch data for department with id ${id}`);
    }
  }
  async createDistribution(
    data: CourseDistribution,
  ): Promise<CourseDistribution> {
    try {
      return await this.prisma.courseDistribution.create({ data });
    } catch (error) {
      throw new Error('Failed to create distribution');
    }
  }

  async updateCourse(
    id: number,
    data: CourseDistribution,
  ): Promise<CourseDistribution> {
    try {
      const distribution = await this.prisma.courseDistribution.update({
        where: { id },
        data,
        include: { courseOfferings: true },
      });

      if (!distribution) {
        throw new Error(`distribution with id ${id} not found`);
      }

      return distribution;
    } catch (error) {
      throw new Error(`Failed to update distribution with id ${id}`);
    }
  }

  async deleteCourse(id: number): Promise<CourseDistribution> {
    try {
      const distribution = await this.prisma.courseDistribution.delete({
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
