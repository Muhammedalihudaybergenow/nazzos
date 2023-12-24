import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { SeederOptions } from 'typeorm-extension';
dotenv.config();
const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  database: process.env.TYPEORM_USER_DATABASE_NAME,
  username: process.env.TYPEORM_USER_DATABASE_USERNAME,
  password: process.env.TYPEORM_USER_DATABASE_PASSWORD,
  host: process.env.TYPEORM_USER_DATABASE_HOST,
  port: parseInt(process.env.TYPEORM_USER_DATABASE_PORT),
  migrations: ['dist/**/migrations/**/*.{js,ts}'],
  entities: ['dist/modules/**/*.entity.{js,ts}'],
  seeds: [],
  logger: 'simple-console',
  synchronize:
    process.env.TYPEORM_DATABASE_SYNCHRONIZE == 'true' ? true : false,
};

export const dataSource = new DataSource(dataSourceOptions);

dataSource.initialize();
