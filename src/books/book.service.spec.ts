import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  findOneOrFail: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

describe('BooksService', () => {
  let service: BooksService;
  let repository: Repository<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    repository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllBooks', () => {
    it('should return an array of books', async () => {
      const expectedResult = [{ title: 'Book 1' }, { title: 'Book 2' }] as Book[];
      mockRepository.find.mockReturnValueOnce(expectedResult);

      const result = await service.getAllBooks();

      expect(result).toEqual(expectedResult);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('getBookById', () => {
    it('should return a book by ID', async () => {
      const expectedId = 1;
      const expectedResult = { id: expectedId, title: 'Book 1' } as Book;
      mockRepository.findOneOrFail.mockReturnValueOnce(expectedResult);

      const result = await service.getBookById(expectedId);

      expect(result).toEqual(expectedResult);
      expect(mockRepository.findOneOrFail).toHaveBeenCalledWith(expectedId);
    });

    it('should throw NotFoundException if book with ID not found', async () => {
      const nonExistentId = 999;
      mockRepository.findOneOrFail.mockRejectedValueOnce(new Error());

      await expect(service.getBookById(nonExistentId)).rejects.toThrowError();
    });
  });

  describe('addBook', () => {
    it('should add a new book', async () => {
      const createBookDto: CreateBookDto = { title: 'New Book', author: 'Author' };
      const expectedResult = { id: 1, ...createBookDto } as Book;
      mockRepository.create.mockReturnValueOnce(expectedResult);
      mockRepository.save.mockReturnValueOnce(expectedResult);

      const result = await service.addBook(createBookDto);

      expect(result).toEqual(expectedResult);
      expect(mockRepository.create).toHaveBeenCalledWith(createBookDto);
      expect(mockRepository.save).toHaveBeenCalledWith(expectedResult);
    });
  });

  describe('updateBook', () => {
    it('should update a book', async () => {
      const existingBook: Book = { id: 1, title: 'Old Title', author: 'Old Author' };
      const updateBookDto: UpdateBookDto = { title: 'New Title' };
      const updatedBook: Book = { ...existingBook, ...updateBookDto };
      mockRepository.findOneOrFail.mockReturnValueOnce(existingBook);
      mockRepository.save.mockReturnValueOnce(updatedBook);

      const result = await service.updateBook(existingBook.id, updateBookDto);

      expect(result).toEqual(updatedBook);
      expect(mockRepository.findOneOrFail).toHaveBeenCalledWith(existingBook.id);
      expect(mockRepository.save).toHaveBeenCalledWith(updatedBook);
    });

    it('should throw NotFoundException if book with ID not found', async () => {
      const nonExistentId = 999;
      mockRepository.findOneOrFail.mockRejectedValueOnce(new Error());

      await expect(service.updateBook(nonExistentId, {} as UpdateBookDto)).rejects.toThrowError();
    });
  });

  describe('deleteBook', () => {
    it('should delete a book', async () => {
      const expectedId = 1;
      mockRepository.delete.mockReturnValueOnce({ affected: 1 });

      const result = await service.deleteBook(expectedId);

      expect(result).toBe(true);
      expect(mockRepository.delete).toHaveBeenCalledWith(expectedId);
    });

    it('should return false if book with ID not found', async () => {
      const nonExistentId = 999;
      mockRepository.delete.mockReturnValueOnce({ affected: 0 });

      const result = await service.deleteBook(nonExistentId);

      expect(result).toBe(false);
      expect(mockRepository.delete).toHaveBeenCalledWith(nonExistentId);
    });
  });
});
