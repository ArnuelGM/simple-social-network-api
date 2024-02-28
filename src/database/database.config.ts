import { TypeOrmModule } from '@nestjs/typeorm';

export const DB_MODULE = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: './database.db',
  /* type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12345678abc',
  database: 'socialnet', */
  autoLoadEntities: true,
  synchronize: true,
  entities: [],
});
