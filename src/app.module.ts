import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ArticlesModule } from './articles/articles.module';
import { UsersModule } from './users/users.module';
import { AuthService } from './services/auth/auth.service';
import { AuthModule } from './services/auth/auth.module';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({
    envFilePath: '.env.local',
    isGlobal: true,
  }), ArticlesModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
