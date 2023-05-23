import { UsersService } from '@api/modules/users/users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Prisma, User } from 'database';
import QueryString from 'qs';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  async getUsers(@Query() query: string) {
    let args;
    if (query) {
      args = QueryString.parse(query);
    }
    return this.service.findMany(args);
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id): Promise<User> {
    return this.service.findOne({ where: { id: id } });
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.service.deleteOne(id);
  }

  @Post()
  async createUser(@Body() userInput: Prisma.UserCreateInput): Promise<User> {
    return this.service.create(userInput);
  }
}
