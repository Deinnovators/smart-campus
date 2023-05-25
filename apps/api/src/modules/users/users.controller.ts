import { AccessRoles } from '@api/decorators/roles.decorator';
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

  @AccessRoles('superadmin', 'admin', 'teacher', 'stuff')
  @Get()
  async getUsers(@Query() query: string) {
    let args;
    if (query) {
      args = QueryString.parse(query);
    }
    return this.service.findMany(args);
  }

  @AccessRoles('superadmin', 'admin', 'teacher', 'stuff')
  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id): Promise<User> {
    return this.service.findOne({ where: { id: id } });
  }

  @AccessRoles('superadmin', 'admin')
  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.service.update(id, data);
  }

  @AccessRoles('superadmin', 'admin')
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.service.deleteOne(id);
  }

  @AccessRoles('superadmin', 'admin')
  @Post()
  async createUser(@Body() userInput: Prisma.UserCreateInput): Promise<User> {
    return this.service.create(userInput);
  }
}
