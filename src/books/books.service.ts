import { Injectable } from '@nestjs/common';
import { Book } from './books.model';
import { v4 } from 'uuid';

@Injectable()
export class BooksService {
  books: Book[] = [];
  getAllBooks(): Book[] {
    return this.books;
  }
  createBook(title: string, description: string, author: string): Book {
    const book: Book = {
      title,
      description,
      id: v4(),
      author,
    };

    this.books.push(book);

    return book;
  }
  getBookById(id: string): Book {
    return this.books.find((book) => book.id === id);
  }
  deleteBook(id: string): Book {
    const deleteBook = this.books.find((book) => book.id === id);
    this.books = this.books.filter((book) => book.id !== id);

    return deleteBook;
  }
  updateBook(id: string, partialBook: Partial<Book>): Book {
    const bookById = this.getBookById(id);
    const updatedBook = { ...bookById, ...partialBook };
    this.books = this.books.map((book) =>
      book.id === bookById.id ? updatedBook : book,
    );

    return updatedBook;
  }
}
