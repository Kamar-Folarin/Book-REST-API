import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateBookDto } from './dto/update-book.dto';
import { AddBookDto } from './dto/add-book.dto';
import { BooksController } from './book.controller';
import { BooksService } from './book.service';
import { Book } from './entity/book.entity';

const mockBooksService = {
  getAllBooks: jest.fn(),
  getBookById: jest.fn(),
  addBook: jest.fn(),
  updateBook: jest.fn(),
  deleteBook: jest.fn(),
};

const mockRepository = {
  findOneOrFail: jest.fn(),
};

describe('BooksController', () => {
  let controller: BooksController;
  let booksService: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: mockBooksService,
        },
        {
          provide: getRepositoryToken(Book),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    booksService = module.get<BooksService>(BooksService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /books', () => {
    it('should return an array of books', async () => {
      const expectedResult = [{ title: 'Book 1' }, { title: 'Book 2' }];
      mockBooksService.getAllBooks.mockReturnValueOnce(expectedResult);

      const result = await controller.getAllBooks();

      expect(result).toEqual(expectedResult);
      expect(mockBooksService.getAllBooks).toHaveBeenCalled();
    });
  });

  describe('GET /books/:id', () => {
    it('should return a book by ID', async () => {
      const expectedId = 1;
      const expectedResult = { id: expectedId, title: 'Book 1' };
      mockBooksService.getBookById.mockReturnValueOnce(expectedResult);

      const result = await controller.getBookById(expectedId);

      expect(result).toEqual(expectedResult);
      expect(mockBooksService.getBookById).toHaveBeenCalledWith(expectedId);
    });
  });

  describe('POST /books', () => {
    it('should add a new book', async () => {
      const createBookDto: AddBookDto = { title: 'New Book', author: 'Author', publishedDate: 2022-10-11 };
      const expectedResult = { id: 1, ...createBookDto };
      mockBooksService.addBook.mockReturnValueOnce(expectedResult);

      const result = await controller.addBook(createBookDto);

      expect(result).toEqual(expectedResult);
      expect(mockBooksService.addBook).toHaveBeenCalledWith(createBookDto);
    });
  });

  describe('PUT /books/:id', () => {
    it('should update a book', async () => {
      const expectedId = 1;
      const updateBookDto: UpdateBookDto = { title: 'Updated Title' };
      const expectedResult = { id: expectedId, ...updateBookDto };
      mockBooksService.updateBook.mockReturnValueOnce(expectedResult);

      const result = await controller.updateBook(expectedId, updateBookDto);

      expect(result).toEqual(expectedResult);
      expect(mockBooksService.updateBook).toHaveBeenCalledWith(expectedId, updateBookDto);
    });
  });

  describe('DELETE /books/:id', () => {
    it('should delete a book', async () => {
      const expectedId = 1;
      mockBooksService.deleteBook.mockReturnValueOnce(true);

      const result = await controller.deleteBook(expectedId);

      expect(result).toBe(true);
      expect(mockBooksService.deleteBook).toHaveBeenCalledWith(expectedId);
    });
  });
});
