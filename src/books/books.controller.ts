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
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}
  @Get()
  async findAll(): Promise<Book[]> {
    return await this.booksService.getAllBooks();
  }

  @Post()
  createBook(@Body() createBook: CreateBookDto): Promise<Book> {
    return this.booksService.createBook(createBook);
  }
  @Get('/:id')
  getBookById(@Param('id') id: string): Promise<Book> {
    return this.booksService.getBookById(id);
  }
  @Delete('/:id')
  deleteBook(@Param('id') id: string) {
    return this.booksService.deleteBook(id);
  }
  @Put('/:id')
  updateBook(@Param('id') id: string, @Body() book: UpdateBookDto) {
    return this.booksService.updateBook(id, book);
  }
}
