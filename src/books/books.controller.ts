import { Book } from './books.model';
import { BooksService } from './books.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}
  @Get()
  findAll(): Book[] {
    // TODO: implement filter
    return this.booksService.getAllBooks();
  }

  @Post()
  createBook(
    // TODO: Apply DTO here
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('author') author: string,
  ): Book {
    return this.booksService.createBook(title, description, author);
  }
  @Get('/:id')
  getBookById(@Param('id') id: string): Book {
    return this.booksService.getBookById(id);
  }
  @Delete('/:id')
  deleteBook(@Param('id') id: string) {
    return this.booksService.deleteBook(id);
  }
  @Put('/:id')
  updateBook(@Param('id') id: string, @Body('book') book: Partial<Book>) {
    return this.booksService.updateBook(id, book);
  }
}
