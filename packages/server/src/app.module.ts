import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts/post.entity';
import { Category } from './category/category.entity';
import { Tag } from './tags/tag.entity';
import { CategoryModule } from './category/category.module';
import {PostsModule} from "./posts/post.module";
import {TagModule} from "./tags/tag.module";
import DatabaseConfig from './config'

@Module({
  imports: [
    CategoryModule,
    PostsModule,
    TagModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      synchronize: true,
      entities: [
        Post,
        Category,
        Tag
      ],
      dateStrings: true,
      ...DatabaseConfig
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
