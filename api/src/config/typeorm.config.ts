import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: configService.get<string>('MYSQL_HOST'),
  port: configService.get<number>('MYSQL_PORT'),
  username: configService.get<string>('MYSQL_USER'),
  password: configService.get<string>('MYSQL_PASSWORD'),
  database: configService.get<string>('MYSQL_DATABASE'),
  migrationsTableName: 'MIGRATIONS_CHANGELOG',
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Use glob pattern to load entities
  synchronize: false,
  logging: ['migration', 'error'],
});
