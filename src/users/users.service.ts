import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  // Creating new User
  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  //   findOne by id
  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  //   find single record by email
  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  //   update user
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error('user with that ID is not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }
}
