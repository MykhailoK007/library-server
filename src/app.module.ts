import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { FirebaseModule } from './firebase/firebase.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    BooksModule,
    FirebaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
