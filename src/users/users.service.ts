import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  // find all users
  findAll() {
    return this.repo.find();
  }

  // find user by email
  find(email: string) {
    if (!email) {
      throw new NotFoundException('Email query is required');
    }
    return this.repo.find({ where: { email } });
  }

  //   findOne by id
  async findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  // Creating new User
  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  //   update user
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user with that ID is not found');
    }

    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  //   remove user
  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user with that ID is not found');
    }
    return this.repo.remove(user);
  }

  //   find single record by email
  // find(email: string) {
  //   return this.repo.find({ where: { email } });
  // }
}
