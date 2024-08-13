import { Global, Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LogsController } from './logs/logs.controller';
import { LogsService } from './logs/logs.service';
import { LogsModule } from './logs/logs.module';
import { RolesController } from './roles/roles.controller';
import { RolesService } from './roles/roles.service';
import { RolesModule } from './roles/roles.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MenusModule } from './menus/menus.module';
import { AppDataSourceOptions } from '../ormConfig';

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

    TypeOrmModule.forRoot(AppDataSourceOptions),
    UserModule,
    LogsModule,
    RolesModule,
    AuthModule,
    MenusModule,
  ],
  controllers: [AppController, LogsController, RolesController],
  providers: [LogsService, RolesService, Logger],
  exports: [Logger, ConfigModule],
})
export class AppModule {}
