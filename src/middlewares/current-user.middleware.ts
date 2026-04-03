import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: any, res: any, next: NextFunction) {
    // get user id form. req
    const { userId } = req.session || {};

    if (userId) {
      //get user
      const user = await this.usersService.findOne(userId);

      //   return user to the current user property
      req.CurrentUser = user;
    }

    next();
  }
}
