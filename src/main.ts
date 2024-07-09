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
import { ResponseFormatInterceptor } from './interceptors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: createWinstonLogger(),
    cors: true,
  });

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  app.use(helmet());

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

  app.useGlobalInterceptors(new ResponseFormatInterceptor());

  await app.listen(3000);
}
bootstrap();
