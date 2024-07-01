import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'winston-daily-rotate-file';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
  TypeormFilter,
  HttpExceptionFilter,
  ValidationExceptionFilter,
} from './filters';
import { setupSwagger, createWinstonLogger } from './plugins';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: createWinstonLogger(),
    cors: true,
  });

  // api 前缀
  app.setGlobalPrefix('api');

  // 文档配置
  setupSwagger(app);

  // 绑定全局过滤器
  app.useGlobalFilters(
    new TypeormFilter(Logger),
    new HttpExceptionFilter(Logger),
    new ValidationExceptionFilter(Logger),
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(3000);
}
bootstrap();
