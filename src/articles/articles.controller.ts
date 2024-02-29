import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { JwtAuthGuard } from 'src/services/auth/guards/jwt.guards';

@UseGuards(JwtAuthGuard)
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post('/:author')
  create(@Req() request, @Param('author') author: string, @Body() createArticleDto: CreateArticleDto) {
    const authenticatedUser = request.user;
    if(authenticatedUser.username !== author) {
      throw new UnauthorizedException();
    }

    return this.articlesService.create(author, createArticleDto);
  }

  @Get('/:author')
  findByAuthor(@Param('author') author: string) {
    return this.articlesService.findByAuthor(author);
  }

  @Get('/:author/:id')
  findOne(@Param('author') author: string, @Param('id', new ParseIntPipe()) id: number) {
    return this.articlesService.findOne(author, id);
  }

  @Patch('/:author/:id')
  update(@Req() request, @Param('author') author: string, @Param('id', new ParseIntPipe()) id: number, @Body() updateArticleDto: UpdateArticleDto) {
    const authenticatedUser = request.user;
    if(authenticatedUser.username !== author) {
      throw new UnauthorizedException();
    }

    return this.articlesService.update(author, id, updateArticleDto);
  }

  @Delete('/:author/:id')
  remove(@Req() request, @Param('author') author: string, @Param('id', new ParseIntPipe()) id: number) {
    const authenticatedUser = request.user;
    if(authenticatedUser.username !== author) {
      throw new UnauthorizedException();
    }
    
    return this.articlesService.remove(author, id);
  }
}
