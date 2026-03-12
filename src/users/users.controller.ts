import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Delete,
  Patch,
  Session,
} from '@nestjs/common';

import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UsersService } from './users.service';

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

  //Signin -  create user
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signUp(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  //sign in user
  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signIn(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  //

  @Get('/whoami')
  whoAmI(@Session() session: any) {
    return this.usersService.findOne(session.userId);
  }

  //

  @Post('signout')
  signOut(@Session() session: any) {
    if (!session.userId)
      throw new UnauthorizedException('You must be signed in');
    session.userId = null;
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
