import {
  NestInterceptor,
  CallHandler, //next()
  Injectable,
  ExecutionContext,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { Observable } from 'rxjs';

@Injectable()
// export class CurentUserInterceptor implements NestInterceptor {
//   // instance of user DI
//   constructor(private usersService: UsersService) {}

//   async intercept(context: ExecutionContext, handler: CallHandler) {
//     const request = context.switchToHttp().getRequest();
//     const { userId } = request.session;

//     if (userId) {
//       return this.usersService.findOne(userId);
//     }

//     return handler.handle();
//   }
// }
export class CurrentUserInterceptor implements NestInterceptor {
  // instance form usersService
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if (userId) {
      const user = await this.usersService.findOne(userId);

      request.currentUser = user;
    }

    return handler.handle();
  }
}
