import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateCategoryApi } from 'ts-api-models'
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ){}
    @Post('create')
    public createCategory(@Body() body: CreateCategoryApi) {
        this.categoryService.createCategory(body.name, body.parentId);

        // TODO: Implement logic to create a new category in the database
        // const newCategory: Category = { name, description }; // Replace with actual implementation

        // res.status(201).json(newCategory);
    }

    @Get('getAll')
    public getAllCategorys() {
        return this.categoryService.getAllCategorys();
    }

    @Get('getPosts')
    public getPostsByCategory(@Req() req) {
        return this.categoryService.getPostsByCategory(req.query.category_id);
    }
}
