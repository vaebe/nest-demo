import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'winston-daily-rotate-file';
import { Logger } from '@nestjs/common';
import { TypeormFilter } from './filters/typeorm.filter';
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
  app.useGlobalFilters(new TypeormFilter(Logger));

  await app.listen(3000);
}
bootstrap();
