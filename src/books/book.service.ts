import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entity/book.entity';
import { AddBookDto } from './dto/add-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
  ) {}

  async getAllBooks(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  async getBookById(id: number): Promise<Book> {
    const book = await this.booksRepository.findOne({ where: { id: id } });
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  async addBook(createBookDto: AddBookDto): Promise<Book> {
    const { title, author, publishedDate } = createBookDto;
    const newBook = 
    this.booksRepository.create({title,
        author,
        publishedDate: publishedDate || new Date(),
      });
    await this.booksRepository.save(newBook);
    return newBook
  }

  async updateBook(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const existingBook = await this.getBookById(id);
    if (!existingBook){
        throw new Error(`Book with "${id}" was not found`);
    }
    const updatedBook: Book = { ...existingBook, ...updateBookDto };
    return this.booksRepository.save(updatedBook);

    // return this.booksRepository.update(id, updateBookDto)
  }

  async deleteBook(id: number) {
    const result = await this.booksRepository.delete(id);
    if (result.affected === 0) {
        throw new NotFoundException(`Book with "${id}" was not found`);
      }
      return { message: 'Book successfully deleted' };
  }
}
