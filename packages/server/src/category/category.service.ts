import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { Category } from './category.entity';
import { PostsService } from 'src/posts/post.service';
import { CategoryEntity } from 'ts-api-models';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: TreeRepository<Category>,
        private readonly postsService: PostsService
    ) {}
    
    /**
     * 
     * @param id 分类项id
     * @returns 此分类项的所有祖先分类项（包括自身）
     */
    async getCategorysList(id: number): Promise<Category[]> {
        try {
            const thisCategory = await this.categoryRepository.findOneByOrFail({
                category_id: id
            });
            const res = this.categoryRepository.findAncestors(thisCategory);
            console.log(res);
            return res;
        } catch (e) {
            throw new Error(`不存在 id: ${id} 的分类项`);
        }
    }

    /**
     * 创建一个新分类项
     * @param name 分类项名称
     * @param parent_id 父分类项id
     */
    async createCategory(name: string, parent_id: number | null) {
        const parent = parent_id && await this.categoryRepository.findOneBy({category_id: parent_id});
        const newCategory = {
            category_name: name,
            parent: parent
        };
        await this.categoryRepository.save(newCategory);
    }

    async addPostsToCategory(category_id: number, post_ids: number[]) {
        const category = await this.categoryRepository.findOneByOrFail({category_id});
        category.posts = [
            ...category.posts,
            ... await Promise.all(post_ids.map(id => this.postsService.getPostById(id)))
        ];
        this.categoryRepository.save(category);
    }

    async getPostsByCategory(category_id: number) {
        try {
            const category =  await this.categoryRepository.findOneByOrFail({category_id});
            return category.posts || [];
        } catch (e) {
            throw new Error(`不存在 id: ${category_id} 的分类项`);
        }
    }

    async getAllCategorys(): Promise<CategoryEntity[]> {
        return await this.categoryRepository.findTrees();
    }
}
