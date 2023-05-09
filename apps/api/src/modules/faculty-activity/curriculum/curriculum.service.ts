import { PrismaService } from '@api/modules/persistance/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CourseCurriculum } from 'database';

@Injectable()
export class CourseCurriculumService {
  constructor(private prisma: PrismaService) {}

  async getCurriculumById(id: number): Promise<CourseCurriculum> {
    try {
      const curriculum = await this.prisma.courseCurriculum.findUnique({
        where: { id },
      });

      if (!curriculum) {
        throw new Error(`courseCurriculum with id ${id} not found`);
      }

      return curriculum;
    } catch (error) {
      throw new Error(`Failed to fetch courseCurriculum with id ${id}`);
    }
  }

  async getAllCurriculum(): Promise<CourseCurriculum[]> {
    try {
      const curriculums = await this.prisma.courseCurriculum.findMany({
        orderBy: { id: 'asc' },
      });
      return curriculums;
    } catch (error) {
      throw new Error('Failed to fetch courses');
    }
  }

  async createCurriculum(data: CourseCurriculum): Promise<CourseCurriculum> {
    try {
      const curriculum = await this.prisma.courseCurriculum.create({
        data,
      });
      return curriculum;
    } catch (error) {
      throw new Error('Failed to create course curriculum');
    }
  }

  async updateCurriculum(
    id: number,
    data: CourseCurriculum,
  ): Promise<CourseCurriculum> {
    try {
      const curriculum = await this.prisma.courseCurriculum.update({
        where: { id },
        data,
      });

      if (!curriculum) {
        throw new Error(`course curriculum with id ${id} not found`);
      }

      return curriculum;
    } catch (error) {
      throw new Error(`Failed to update course curriculum with id ${id}`);
    }
  }

  async deleteCurriculum(id: number): Promise<CourseCurriculum> {
    try {
      const curriculum = await this.prisma.courseCurriculum.delete({
        where: { id },
      });

      if (!curriculum) {
        throw new Error(`course curriculum with id ${id} not found`);
      }

      return curriculum;
    } catch (error) {
      throw new Error(`Failed to delete course curriculum with id ${id}`);
    }
  }
}
