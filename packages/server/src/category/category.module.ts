import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PostsModule } from 'src/posts/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import {Post} from "../posts/post.entity";

@Module({
    controllers: [CategoryController],
    providers: [CategoryService],
    imports: [TypeOrmModule.forFeature([Category, Post])],
    exports: [CategoryService]
})
export class CategoryModule {}
