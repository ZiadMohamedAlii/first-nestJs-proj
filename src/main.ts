import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // this part for cleaning Body inside req ,res and make it matches the DTO.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // used to make sure that the body matches the Dto
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
