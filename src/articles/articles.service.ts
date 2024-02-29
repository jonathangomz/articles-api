import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';

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

  findOne(author: string, id: number) {
    return this.articlesRepository.findOneBy({author, id});
  }

  async update(author: string, id: number, updateArticleDto: UpdateArticleDto) {
    const articleToUpdate = await this.articlesRepository.findOneBy({author, id});
        
    if (!articleToUpdate) {
        throw new Error(`Entity with ID ${id} not found`);
    }

    this.articlesRepository.merge(articleToUpdate, updateArticleDto);

    return await this.articlesRepository.save(articleToUpdate);
  }

  async remove(id: number) {
    const articleToDelete = await this.articlesRepository.findOneBy({id});

    if (!articleToDelete) {
      throw new Error(`Entity with ID ${id} not found`);
    }

    const deleteResult = await this.articlesRepository.delete(id);

    if (deleteResult.affected === 0) {
      throw new Error(`Entity with ID ${id} not found`);
    }

    return articleToDelete;
  }
}
