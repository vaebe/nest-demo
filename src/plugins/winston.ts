import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';

export function createWinstonLogger() {
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
    ],
  });

  return WinstonModule.createLogger({ instance: winstonInstance });
}
