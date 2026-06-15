import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from '@repo/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(config.API_PORT);
  console.log(`Backend is running on: http://localhost:${config.API_PORT}`);
}
void bootstrap();
