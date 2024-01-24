import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {TreeRepository} from 'typeorm';
import {Category} from './category.entity';
import {Post} from "../posts/post.entity";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: TreeRepository<Category>,
        @InjectRepository(Post)
        private readonly postRepository: TreeRepository<Post>
    ) {}

    /**
     * 获取分类项的所有祖先分类项(包括自身)
     * @param id
     */
    async getAncestors(id: number): Promise<Category[]> {
        try {
            const thisCategory = await this.categoryRepository.findOneByOrFail({
                category_id: id
            });
            return await this.categoryRepository.findAncestors(thisCategory);
        } catch (e) {
            throw new Error(`不存在 id: ${id} 的分类项`);
        }
    }

    /**
     * 创建一个新分类项
     * @param name 分类项名称
     * @param parentId 父分类项id
     */
    async createCategory(name: string, parentId: number | null) {
        let  parent: Category;
        try {
            parent = parentId && await this.categoryRepository.findOneByOrFail({category_id: parentId});
        } catch (e) {
            throw new Error(`不存在 id: ${parentId} 的父分类项`);
        }

        // 相同名称且父分类项相同的分类项不可重复创建
        const sameNameCategory = await this.categoryRepository.findOneBy({category_name: name, parent});
        if (sameNameCategory) {
            throw new Error(`重复创建分类项: ${parent?.category_name || '顶层'}分类下已存在名称为 ${name} 的分类项`);
        }

        const newCategory = {
            category_name: name,
            parent: parent
        };
        try {
            await this.categoryRepository.save(newCategory);
        } catch (e) {
            throw new Error(`创建分类项失败: ${e.toString()}`);
        }
    }

    /**
     * 根据分类项数组批量创建分类项
     * [c1, c2, c3...]， 前一项为后一项的父分类项
     * @param names 分类项名称
     */
    async multiCreateCategory(names: string[]) {
        let parentId = null;
        let parent: Category;
        for (let cate of names) {
            try {
                await this.createCategory(cate, parentId);
            } catch (e) {
                if (!e.message?.startsWith('重复创建分类项')) {
                    throw e;
                }
            }
             parent = await this.categoryRepository.findOneByOrFail({
                category_name: cate,
                parent: parentId && await this.categoryRepository.findOneByOrFail({category_id: parentId})
            });
            parentId = parent.category_id;
        }
        return parent;
    }

    /**
     * 为分类项添加文章
     * 对应文章原来的分类项会被覆盖
     * @param category_id
     * @param post_ids
     */
    async addPostsToCategory(category_id: number, post_ids: number[]) {
        let category: Category;
        try {
            category= await this.categoryRepository.findOneByOrFail({category_id});
        } catch (e) {
            throw new Error(`不存在 id: ${category_id} 的分类项`);
        }
        try {
            category.posts = [
                ...(category.posts || []),
                ... await Promise.all(post_ids.map(id => this.postRepository.findOneByOrFail({post_id: id})))
            ];
        } catch (e) {
            throw new Error(`添加文章失败: ${e.toString()}`);
        }
        await this.categoryRepository.save(category);
    }

    /**
     * 获取分类项下的所有文章
     * @param category_id
     */
    async getPostsByCategory(category_id: number) {
        const category =  await this.categoryRepository.findOne({
            where: {
                category_id
            },
            relations: {
                posts: true
            }
        });
        if (!category) {
            throw new Error(`不存在 id: ${category_id} 的分类项`);
        }
        const res =  category.posts || [];
        return res.map(post => {
            const {post_id, post_title, publish_date, post_content} = post;
            return {
                post_id,
                post_title,
                publish_date,
                tags: post.tags
            }
        });
    }

    async getAllCategories() {
        return await this.categoryRepository.findTrees();
    }
}
