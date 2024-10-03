import { DataSource } from 'typeorm';
import { User } from './entity/user'; 
import { MongoEntity } from './entity/mongoEntity';

export const postgresDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.POSTGRES_DB || 'mydatabase',
  entities: [User],
  synchronize: true, 
});

// MongoDB DataSource
export const mongoDataSource = new DataSource({
  type: 'mongodb',
  host: process.env.MONGO_HOST || 'localhost',
  port: Number(process.env.MONGO_PORT) || 27017,
  username: process.env.MONGO_USER || '',
  password: process.env.MONGO_PASSWORD || '',
  database: process.env.MONGO_DB || 'mymongodb',
  entities: [MongoEntity],
  useUnifiedTopology: true,
  synchronize: true, 
});
