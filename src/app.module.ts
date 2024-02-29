import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({
    envFilePath: '.env.local',
    isGlobal: true,
  }), ArticlesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
