import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts/post.entity';
import { Category } from './category/category.entity';
import { Tag } from './tags/tag.entity';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    CategoryModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Song123@trudbot',
      database: 'blog',
      synchronize: true,
      entities: [
        Post,
        Category,
        Tag
      ]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
