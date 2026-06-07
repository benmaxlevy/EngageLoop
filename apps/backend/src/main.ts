import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT ?? 4000);
  const corsOrigins = process.env.CORS_ORIGIN?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean) ?? ['http://localhost:3000'];
  app.enableCors({
    origin: corsOrigins,
    credentials: process.env.CORS_CREDENTIALS === 'true',
  });
  await app.listen(port);
  console.log(`Backend is running on: http://localhost:${port}`);
}
void bootstrap();
