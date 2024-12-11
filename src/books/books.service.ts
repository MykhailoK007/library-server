import { CreateBookDto } from './dto/create-book.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './books.model';
import { v4 } from 'uuid';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UpdateBookDto } from './dto/update-book.dto';
import { FieldValue } from 'firebase-admin/firestore';

@Injectable()
export class BooksService {
  constructor(private firebaseService: FirebaseService) {}
  async getAllBooks(): Promise<Book[]> {
    const data = await this.firebaseService.bookCollection.get();
    const books: Book[] = [];
    data.forEach((doc) => {
      const book = doc.data() as Book;
      books.push(book);
    });

    return books;
  }
  async createBook(book: CreateBookDto): Promise<Book> {
    const newId = v4();
    await this.firebaseService.bookCollection
      .doc(newId)
      .set({ ...book, id: newId });

    return this.getBookById(newId);
  }
  async getBookById(id: string): Promise<Book> {
    const doc = await this.firebaseService.bookCollection.doc(id).get();

    if (doc.exists) {
      return doc.data() as Book;
    } else {
      throw new NotFoundException(`Book with Id: ${id} not found`);
    }
  }
  async deleteBook(id: string): Promise<{ bookId: string; message: string }> {
    await this.firebaseService.bookCollection.doc(id).delete();

    return { bookId: id, message: 'Book deleted' };
  }
  async updateBook(id: string, partialBook: UpdateBookDto): Promise<Book> {
    await this.firebaseService.bookCollection
      .doc(id)
      .update({ ...partialBook, updated_at: FieldValue.serverTimestamp() });

    return this.getBookById(id);
  }
}
