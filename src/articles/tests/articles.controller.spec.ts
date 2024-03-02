import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from '../articles.controller';
import { ArticlesService } from '../articles.service';
import { UpdateArticleDto } from '../dto/update-article.dto';

jest.mock('../articles.service');

describe('ArticlesController', () => {
  let controller: ArticlesController;
  let service: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [ArticlesService],
    }).compile();

    controller = module.get<ArticlesController>(ArticlesController);
    service = module.get<ArticlesService>(ArticlesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new article', async () => {
      const author = 'John Doe';
      const id = 1;
      const createArticleDto = { title: 'Title', content: 'Content' };
      const request = { user: 'John Doe' };
      const createdArticle = {id, author, date: new Date(), ...createArticleDto};

      jest.mocked(service.create).mockResolvedValue(createdArticle);

      const result = await controller.create(request, author, createArticleDto);

      expect(service.create).toHaveBeenCalledWith(author, createArticleDto);
      expect(result).toBe(createdArticle);
    });
  });

  describe('findByAuthor', () => {
    it('should find articles by author', async () => {
      const author = 'John Doe';
      const articles = [{ id: 1, title: 'Title', author, content: 'Content', date: new Date() }];

      jest.mocked(service.findByAuthor).mockResolvedValue(articles);

      const result = await controller.findByAuthor(author);

      expect(service.findByAuthor).toHaveBeenCalledWith(author);
      expect(result).toEqual(articles);
    });
  });

  describe('findOne', () => {
    it('should find one article by author and id', async () => {
      const author = 'John Doe';
      const id = 1;
      const article = { id, title: 'Title', author, content: 'Content', date: new Date() };

      jest.mocked(service.findOne).mockResolvedValue(article);

      const result = await controller.findOne(author, id);

      expect(service.findOne).toHaveBeenCalledWith(author, id);
      expect(result).toEqual(article);
    });
  });

  describe('update', () => {
    it('should update an existing article', async () => {
      const author = 'John Doe';
      const id = 1;
      const request = { user: 'John Doe' };
      const updateArticleDto: UpdateArticleDto = { title: 'Updated Title', content: 'Updated Content' };
      const updatedArticle = {id, author, date: new Date(), title: updateArticleDto.title, content: updateArticleDto.content};

      jest.mocked(service.update).mockResolvedValue(updatedArticle);

      const result = await controller.update(request, author, id, updateArticleDto);

      expect(service.update).toHaveBeenCalledWith(author, id, updateArticleDto);
      expect(result).toBe(updatedArticle);
    });

    it('should throw an error if article to update is not found', async () => {
      const author = 'John Doe';
      const id = 1;
      const request = { user: 'John Doe' };
      const updateArticleDto: UpdateArticleDto = { title: 'Updated Title', content: 'Updated Content' };

      jest.mocked(service.update).mockRejectedValue(new Error(`Entity with ID ${id} not found`));

      await expect(controller.update(request, author, id, updateArticleDto)).rejects.toThrow(`Entity with ID ${id} not found`);

      expect(service.update).toHaveBeenCalledWith(author, id, updateArticleDto);
    });
  });

  describe('remove', () => {
    it('should remove an article by id', async () => {
      const id = 1;
      const request = { user: 'John Doe' };
      const deleteResult = {id, author: 'John Doe', title: 'title', content: 'content', date: new Date()};

      jest.mocked(service.remove).mockResolvedValue(deleteResult);

      const result = await controller.remove(request, deleteResult.author, id);

      expect(service.remove).toHaveBeenCalledWith(id);
      expect(result).toBe(deleteResult);
    });
  });
});
