import { Injectable } from '@nestjs/common';
import { ArticleType } from './Article';

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }
}
