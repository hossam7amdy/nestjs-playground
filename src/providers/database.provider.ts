import { DataSource } from 'typeorm';

export const DATABASE_PROVIDER = Symbol('DATABASE');

export const databaseProvider = {
  provide: DATABASE_PROVIDER,
  useFactory: async () => {
    const dataSource = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      // Warning: shouldn't be used in production
      synchronize: true,
    });

    return dataSource.initialize();
  },
};
