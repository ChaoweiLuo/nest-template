import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionsFilter } from './enhance/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.setGlobalPrefix("api");

  app.enableVersioning({ defaultVersion: "1", type: VersioningType.URI, prefix: 'v' });

  app.useGlobalFilters(new ExceptionsFilter());

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(+port);
  console.log('Server running on port', port);
  }
bootstrap();
