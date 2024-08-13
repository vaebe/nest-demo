import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

// 1. 设置环境变量指定要加载的配置文件路径
// 默认会加载 .env 文件,这里会加载其他的配置文件如 .env.pro 文件
process.env.DOTENV_CONFIG_PATH = path.resolve(__dirname, '.env');

// 2. 加载并解析指定的配置文件
dotenv.config();

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } =
  process.env;

// 这里到处是为了给 app.module.ts 中使用
export const AppDataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: MYSQL_HOST,
  port: Number(MYSQL_PORT),
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  logging: ['schema', 'query', 'error', 'warn', 'migration'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
};

const AppDataSource = new DataSource(AppDataSourceOptions);

export default AppDataSource;
