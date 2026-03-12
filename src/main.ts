import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

//
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // this is for the cookie
  app.use(
    cookieSession({
      keys: ['asdfasf'],
    }),
  );

  // this part for cleaning Body inside req ,res and make it matches the DTO.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // used to make sure that the body matches the Dto
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
