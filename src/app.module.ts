import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/book.module';
import { ConfigModule } from '@nestjs/config';
import { DATABASE_CONFIG, NODE_ENV } from './common/constants/env.constants';
import { Book } from './books/entity/book.entity';

@Module({
  imports: [

    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.MSSQL_HOST,
      port: Number(process.env.MSSQL_PORT),
      username: process.env.MSSQL_USERNAME,
      password: process.env.MSSQL_PASSWORD,
      database: process.env.MSSQL_DATABASE,
      options: {
        encrypt: false,
      },
      synchronize: true,
      entities: [Book],
    }),
    BooksModule,
  ],
})
export class AppModule {

}
