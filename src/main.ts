import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: process.env.PRODUCTION
      ? ['error']
      : ['error', 'warn', 'log', 'debug'],
  });
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
