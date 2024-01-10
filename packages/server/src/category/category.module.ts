import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PostsModule } from 'src/posts/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';

@Module({
    controllers: [CategoryController],
    providers: [CategoryService],
    imports: [PostsModule, TypeOrmModule.forFeature([Category])],
})
export class CategoryModule {}
