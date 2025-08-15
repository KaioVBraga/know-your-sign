import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import fs from 'fs';

async function bootstrap() {
  const httpsOptions = process.env.PROFILE === 'PROD' && {
    key: fs.readFileSync(process.env.PRIVKEY_PATH),
    cert: fs.readFileSync(process.env.FULLCHAIN_PATH),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });

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
