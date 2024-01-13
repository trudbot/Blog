import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./post.entity";
import { PostsService } from "./post.service";
import {PostsController} from "./post.controller";
import {Category} from "../category/category.entity";
import {CategoryModule} from "../category/category.module";

@Module({
    imports: [
        CategoryModule,
        TypeOrmModule.forFeature([Post, Category])
    ],
    providers: [PostsService],
    controllers: [PostsController],
})
export class PostsModule {}