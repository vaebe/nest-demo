import { Global, Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LogsController } from './logs/logs.controller';
import { LogsService } from './logs/logs.service';
import { LogsModule } from './logs/logs.module';
import { RolesController } from './roles/roles.controller';
import { RolesService } from './roles/roles.service';
import { RolesModule } from './roles/roles.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MYSQL_USER: Joi.string().required(),
        MYSQL_PORT: Joi.number().default(3306),
        MYSQL_HOST: Joi.string().default('localhost'),
        MYSQL_PASSWORD: Joi.string().required(),
        MYSQL_DATABASE: Joi.string().required(),
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
      }),
      validationOptions: {
        allowUnknown: true, // 控制是否允许环境变量中未知的键
        abortEarly: true, // true，在遇到第一个错误时就停止验证；false，返回所有错误。默认为false。
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('MYSQL_USER'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<string>('NODE_ENV') === 'development',
      }),
    }),
    UserModule,
    LogsModule,
    RolesModule,
  ],
  controllers: [AppController, LogsController, RolesController],
  providers: [LogsService, RolesService, Logger],
  exports: [Logger],
})
export class AppModule {}
