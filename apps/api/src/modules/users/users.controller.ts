import { JwtAuthGuard } from '@api/modules/auth/jwt-auth.guard';
import { UsersService } from '@api/modules/users/users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Prisma, User } from 'database';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  async getUsers() {
    return this.service.findMany();
  }

  @Get(':id')
  async getUser(@Param() params): Promise<User> {
    return this.service.findOne({ where: { id: params.id } });
  }

  @Patch(':id')
  async updateUser(
    @Param() params,
    @Body() data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.service.update(+params.id, data);
  }

  @Delete(':id')
  async deleteUser(@Param() params) {
    return this.service.deleteOne(+params.id);
  }

  @Post()
  async createUser(@Body() userInput: Prisma.UserCreateInput): Promise<User> {
    return this.service.create(userInput);
  }
}
