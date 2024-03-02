import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from '../articles.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Article } from '../entities/article.entity';

const mockRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOneBy: jest.fn(),
  merge: jest.fn(),
  findBy: jest.fn(),
  delete: jest.fn(),
};

describe('ArticlesService', () => {
  let service: ArticlesService;
  let repository: Repository<Article>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        {
          provide: getRepositoryToken(Article),
          useValue: mockRepository,
        }
      ],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
    repository = module.get<Repository<Article>>(getRepositoryToken(Article));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new article', async () => {
      const createArticleDto = { title: 'Title', content: 'Content' };
      const author = 'John Doe';

      mockRepository.create.mockReturnValue(createArticleDto);

      await service.create(author, createArticleDto);

      expect(mockRepository.create).toHaveBeenCalledWith({ author, ...createArticleDto });
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });

  describe('findByAuthor', () => {
    it('should find articles by author', async () => {
      const author = 'John Doe';
      const articles = [{ id: 1, title: 'Title', author, content: 'Content' }];

      mockRepository.findBy.mockResolvedValue(articles);

      const result = await service.findByAuthor(author);

      expect(mockRepository.findBy).toHaveBeenCalledWith({ author });
      expect(result).toEqual(articles);
    });
  });

  describe('findOneBy', () => {
    it('should find one article by author and id', async () => {
      const author = 'John Doe';
      const id = 1;
      const article = { id, title: 'Title', author, content: 'Content' };

      mockRepository.findOneBy.mockResolvedValue(article);

      const result = await service.findOne(author, id);

      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ author, id });
      expect(result).toEqual(article);
    });
  });

  describe('update', () => {
    it('should update an existing article', async () => {
      const author = 'John Doe';
      const id = 1;
      const updateArticleDto = { title: 'Updated Title', content: 'Updated Content' };
      const existingArticle = { id, title: 'Title', author, content: 'Content' };

      mockRepository.findOneBy.mockResolvedValue(existingArticle);

      await service.update(author, id, updateArticleDto);

      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ author, id });
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('should throw an error if article to update is not found', async () => {
      const author = 'John Doe';
      const id = 1;
      const updateArticleDto = { title: 'Updated Title', content: 'Updated Content' };

      mockRepository.findOneBy.mockResolvedValue(null);

      await expect(service.update(author, id, updateArticleDto)).rejects.toThrow(`Entity with ID ${id} not found`);
    });
  });

  describe('remove', () => {
    it('should remove an article by id', async () => {
      const id = 1;
      const deleteResult = {id, author: 'John Doe', title: 'title', content: 'content', date: new Date()};

      mockRepository.findOneBy.mockResolvedValue(deleteResult);
      mockRepository.delete.mockResolvedValue({deleteResult: {affected: 1}});

      const result = await service.remove(deleteResult.author, id);

      expect(mockRepository.delete).toHaveBeenCalledWith(id);
      expect(result).toBe(deleteResult);
    });
  });
});
