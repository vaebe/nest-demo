import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
  // swagger 配置
  // 会自动读取 app.setGlobalPrefix('api')的api前缀这里无需设置
  const config = new DocumentBuilder()
    .setTitle('nestjs-api')
    .setDescription('nestjs-练习')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // 确保 Token 在页面刷新后仍然保留
    },
  });
}
