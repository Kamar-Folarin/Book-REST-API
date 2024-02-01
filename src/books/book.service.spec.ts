import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Book } from './entity/book.entity';
import { AddBookDto } from './dto/add-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksService } from './book.service';

describe('BooksService', () => {
  let service: BooksService;
  let repository: Repository<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    repository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  describe('getAllBooks', () => {
    it('should return an array of books', async () => {
      const expectedResult = [{ id: 1, title: 'Book 1' }] as Book[];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(expectedResult);

      const result = await service.getAllBooks();

      expect(result).toEqual(expectedResult);
    });
  });

  describe('getBookById', () => {
    it('should return a book by id', async () => {
      const expectedResult = { id: 1, title: 'Book 1' } as Book;
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(expectedResult);

      const result = await service.getBookById(1);

      expect(result).toEqual(expectedResult);
    });

    it('should throw NotFoundException if book with id not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.getBookById(1)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('addBook', () => {
    it('should add a new book', async () => {
      const createBookDto: AddBookDto = { title: 'New Book', author: 'Author', publishedDate: new Date() };
      const expectedResult = { id: 1, ...createBookDto } as Book;
      jest.spyOn(repository, 'create').mockReturnValueOnce(expectedResult);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(expectedResult);

      const result = await service.addBook(createBookDto);

      expect(result).toEqual(expectedResult);
      expect(repository.create).toHaveBeenCalledWith(createBookDto);
      expect(repository.save).toHaveBeenCalledWith(expectedResult);
    });
  });

  describe('updateBook', () => {
    it('should update an existing book', async () => {
      const updateBookDto: UpdateBookDto = { title: 'Updated Book' };
      const existingBook = { id: 1, title: 'Book 1', author: 'Author', publishedDate: new Date() } as Book;
      const expectedResult = { ...existingBook, ...updateBookDto } as Book;
      jest.spyOn(service, 'getBookById').mockResolvedValueOnce(existingBook);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(expectedResult);

      const result = await service.updateBook(1, updateBookDto);

      expect(result).toEqual(expectedResult);
      expect(repository.save).toHaveBeenCalledWith(expectedResult);
    });

    it('should throw NotFoundException if book with id not found', async () => {
      jest.spyOn(service, 'getBookById').mockResolvedValueOnce(undefined);

      await expect(service.updateBook(1, { title: 'Updated Book' })).rejects.toThrowError(NotFoundException);
    });
  });

  describe('deleteBook', () => {
    it('should delete an existing book', async () => {
      const result = { affected: 1 } as any;
      jest.spyOn(repository, 'delete').mockResolvedValueOnce(result);

      const deleteResponse = await service.deleteBook(1);

      expect(deleteResponse).toEqual({ message: 'Book successfully deleted' });
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if book with id not found', async () => {
      const result = { affected: 0 } as any;
      jest.spyOn(repository, 'delete').mockResolvedValueOnce(result);

      await expect(service.deleteBook(1)).rejects.toThrowError(NotFoundException);
    });
  });
});
