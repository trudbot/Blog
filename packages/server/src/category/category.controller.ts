import {Body, Controller, Get, HttpException, HttpStatus, Post, Query, Req} from '@nestjs/common';
import {AddPosts_Body, CreateCategory_Body, GetAncestors_Query, GetPosts_Query} from 'ts-api-models/lib/request'
import { CategoryService } from './category.service';
import {CategoryEntity, CategoryTreeEntity, PostMetaInfoEntity} from "ts-api-models/lib/response";

@Controller('categories')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ){}
    @Post('create')
    public async createCategory(@Body() body: CreateCategory_Body) {
        try {
            await this.categoryService.createCategory(body.name, body.parentId);
            return 'success';
        } catch (e) {
            throw new HttpException(e.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @Get('getAll')
    public async getAllCategories(): Promise<CategoryTreeEntity[]> {
        try {
            return await this.categoryService.getAllCategories();
        } catch (e) {
            throw new HttpException(e.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @Get('getPosts')
    public async getPostsByCategory(@Query() query: GetPosts_Query): Promise<PostMetaInfoEntity[]> {
        try {
            return await this.categoryService.getPostsByCategory(query.category_id);
        } catch (e) {
            throw new HttpException(e.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @Post('addPosts')
    public async addPostsToCategory(@Body() body: AddPosts_Body) {
        try {
            await this.categoryService.addPostsToCategory(body.category_id, [].concat(body.post_ids));
            return 'success'
        } catch (e) {
            throw new HttpException(e.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @Get('getAncestors')
    public async getAncestors(@Query() query: GetAncestors_Query): Promise<CategoryEntity[]> {
        try {
            return await this.categoryService.getAncestors(query.category_id);
        } catch (e) {
            throw new HttpException(e.toString(), HttpStatus.BAD_REQUEST);
        }
    }
}
