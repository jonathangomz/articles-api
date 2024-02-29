import { Injectable } from '@nestjs/common';
import { ArticleType } from './Article';

@Injectable()
export class AppService {
  getHello(): {articles: ArticleType[]} {
    return { articles: [
      {
        id: 1,
        title: 'Test',
        author: 'Jonathan',
        date: new Date(),
        content: 'Jonathan',
      },
      {
        id: 2,
        title: 'Test 2',
        author: 'Jonathan',
        date: new Date(),
        content: 'Jonathan',
      },
      {
        id: 3,
        title: 'Test 3',
        author: 'Jonathan',
        date: new Date(),
        content: 'Jonathan',
      },
    ]}
  }
}
