import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ✅ Removes unknown properties
      // forbidNonWhitelisted: false, // ❌ Throws an error if unknown properties are present (optional)
      transform: true, // ✅ Transforms payloads into DTO instances
    }),
  );

  app.enableCors();

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
