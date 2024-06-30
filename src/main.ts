import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as winston from 'winston';
import { utilities, WinstonModule } from 'nest-winston';
import 'winston-daily-rotate-file';
import { Logger } from '@nestjs/common';
import { TypeormFilter } from './filters/typeorm.filter';
import { setupSwagger } from './plugins';

async function bootstrap() {
  const winstonInstance = winston.createLogger({
    // options of Winston
    transports: [
      new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
          winston.format.timestamp(),
          utilities.format.nestLike(),
        ),
      }),
      // events - archive rotate
      new winston.transports.DailyRotateFile({
        level: 'warn',
        dirname: 'logs',
        filename: 'application-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '1m',
        maxFiles: '7d',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.simple(),
        ),
      }),
      new winston.transports.DailyRotateFile({
        level: 'info',
        dirname: 'logs',
        filename: 'info-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '1m',
        maxFiles: '7d',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.simple(),
        ),
      }),
    ],
  });

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({ instance: winstonInstance }),
    cors: true,
  });

  // api 前缀
  app.setGlobalPrefix('api');

  // 文档配置
  setupSwagger(app);

  // 绑定全局过滤器
  app.useGlobalFilters(new TypeormFilter(Logger));

  await app.listen(3000);
}
bootstrap();
