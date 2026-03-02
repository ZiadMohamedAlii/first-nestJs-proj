import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Delete,
  Patch,
} from '@nestjs/common';

import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UsersService } from './users.service';

import { UseInterceptors } from '@nestjs/common';
import { Serialize } from 'src/Interceptors/serialize.Interceptors';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  //get All users
  @Get()
  findAllUsers() {
    return this.usersService.findAll();
  }

  //create user
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.authService.signUp(body.email, body.password);
  }

  // get user by id
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      return new NotFoundException('User not found');
    }

    return user;
  }

  // delete user
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  // get user by email
  @Get()
  findByEmail(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  //update user by id
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
