import { Controller, Get, Param, Post, Body, Put, Delete, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { BooksService } from './book.service';
import { Book } from './entity/book.entity';
import { AddBookDto } from './dto/add-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDto } from './dto/book.dto';


@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Get()
  @ApiOperation({ summary: 'Get all books', description: 'Get a list of all books.' })
  @ApiResponse({ status: 200, description: 'Successful operation', type: [BookDto] })
  async getAllBooks(): Promise<Book[]> {
    return this.booksService.getAllBooks();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific book', description: 'Get details of a specific book by ID.' })
  @ApiParam({ name: 'id', description: 'Book ID' })
  @ApiResponse({ status: 200, description: 'Successful operation', type: BookDto })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async getBookById(@Param('id') id: number): Promise<Book> {
    const book = await this.booksService.getBookById(id);
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  @Post()
  @ApiOperation({ summary: 'Add a new book', description: 'Add a new book to the collection.' })
  @ApiBody({ type: AddBookDto })
  @ApiResponse({ status: 201, description: 'Book created successfully', type: BookDto })
  async addBook(@Body() bookDto: AddBookDto): Promise<Book> {
    return this.booksService.addBook(bookDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing book', description: 'Update details of an existing book by ID.' })
  @ApiParam({ name: 'id', description: 'Book ID' })
  @ApiBody({ type: UpdateBookDto })
  @ApiResponse({ status: 200, description: 'Successful operation', type: BookDto })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async updateBook(@Param('id') id: number, @Body() updatedBook: UpdateBookDto): Promise<Book> {
    const book = await this.booksService.updateBook(id, updatedBook);
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book', description: 'Delete a book by ID.' })
  @ApiParam({ name: 'id', description: 'Book ID' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async deleteBook(@Param('id') id: number) {
    const result = await this.booksService.deleteBook(id);
    if (!result) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return result
  }
}
