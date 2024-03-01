import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { FilterArticleDto } from './dto/filter-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articlesRepository: Repository<Article>,
    ) {}
  async create(author: string, createArticleDto: CreateArticleDto) {
    const newArticle = this.articlesRepository.create({ author, ...createArticleDto });
    return await this.articlesRepository.save(newArticle);
  }

  async findByAuthor(author: string) {
    const article = await this.articlesRepository.findBy({ author });
    return article;
  }

  async findOne(author: string, id: number) {
    const article = await this.articlesRepository.findOneBy({author, id});
    
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    return article;
  }

  async findAll(queries: FilterArticleDto) {
    const where = {};

    for(let [key, value] of Object.entries(queries)) {
      where[key] = Like(`%${value}%`);
    }

    return await this.articlesRepository.find({ where, order: { date: 'DESC' } });
  }

  async update(author: string, id: number, updateArticleDto: UpdateArticleDto) {
    const articleToUpdate = await this.articlesRepository.findOneBy({author, id});
        
    if (!articleToUpdate) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    this.articlesRepository.merge(articleToUpdate, updateArticleDto);

    return await this.articlesRepository.save(articleToUpdate);
  }

  async remove(author: string, id: number) {
    const articleToDelete = await this.articlesRepository.findOneBy({author, id});

    if (!articleToDelete) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    const deleteResult = await this.articlesRepository.delete(id);

    if (deleteResult.affected === 0) {
      throw new InternalServerErrorException(`An error occurred and the article with ID ${id} could not be deleted`);
    }

    return articleToDelete;
  }
}
