import { BadRequestException, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(email: string, password: string) {
    // see if email exists
    const users = await this.usersService.find(email);

    // check of email already exists
    if (users.length) {
      throw new BadRequestException('Email in use');
    }
    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const user = await this.usersService.create(email, hashedPassword);

    // return new user
    return user;
  }

  //

  async signIn(email: string, password: string) {
    // get user by email
    const [user] = await this.usersService.find(email);

    // check if user exists
    if (!user) {
      throw new NotFoundException('user Not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    // check if password match
    if (!isValidPassword) {
      throw new BadRequestException('Wrong password');
    }

    // return user
    return user;
  }
}
