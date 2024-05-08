import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main Bootsrap');
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
  logger.log(`listening on port ${3000}`);
}
bootstrap();
