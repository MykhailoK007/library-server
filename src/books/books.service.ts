import { CreateBookDto } from './dto/create-book.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './books.model';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}
  async getAllBooks(): Promise<Book[]> {
    const books = await this.prisma.book.findMany();

    return books;
  }
  async createBook(book: CreateBookDto): Promise<Book> {
    const createdBook = await this.prisma.book.create({ data: { ...book } });

    return createdBook;
  }
  async getBookById(id: string): Promise<Book> {
    const book = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!book) {
      throw new NotFoundException(`Book with Id: ${id} not found`);
    }

    return book;
  }
  async deleteBook(id: string): Promise<{ bookId: string; message: string }> {
    await this.prisma.book.delete({ where: { id } });

    return { bookId: id, message: 'Book deleted' };
  }
  async updateBook(id: string, partialBook: UpdateBookDto): Promise<Book> {
    await this.prisma.book.update({
      where: {
        id,
      },
      data: {
        ...partialBook,
      },
    });

    return this.getBookById(id);
  }
}
