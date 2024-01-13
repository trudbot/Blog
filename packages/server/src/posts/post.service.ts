import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Post} from "./post.entity";
import {Repository} from "typeorm";
import {Tag} from "../tags/tag.entity";
import {CategoryService} from "../category/category.service";

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>,
        private readonly categoryService: CategoryService,
    ){}

    async getMetaInfo() {
        return await this.postsRepository.find({
            select: {
                post_title: true,
                post_id: true,
                publish_date: true
            },
            relations: {
                tags: true
            }
        });
    }

    async getPostById(id: number) {
        const post =  await this.postsRepository.findOne({
            where: {
                post_id: id
            },
            relations: {
                tags: true,
                category: true
            }
        });
        return await this.transformCategoryToAncestors.call(this, post);
    }

    async getAll() {
        const posts =  await this.postsRepository.find({
            relations: {
                tags: true,
                category: true
            }
        });
        return await Promise.all(
            posts.map(async post => this.transformCategoryToAncestors.call(this, post)))
            ;
    }

    async createPost(post_content: string, post_title: string, tags?: string[]){
        const newPost = {
            publish_date: new Date(),
            category: null,
            post_content: post_content,
            post_title: post_title,
            tags: tags ? tags.map(tag => ({tag_label: tag})) : []
        };
        await this.postsRepository.save(newPost);
    }

    async updateTags(post_id: number, tags: string[]) {
        const post = await this.postsRepository.findOneByOrFail({post_id});
        post.tags = tags.map(tag => ({tag_label: tag})) as Tag[];
        await this.postsRepository.save(post);
    }

    /**
     * 将文章的分类项更换为其的所有组件组成的数组
     * @param post
     */
    async transformCategoryToAncestors(post: Post) {
        const categories = post.category
            ? await this.categoryService.getAncestors(post.category.category_id)
            : [];
        return {
            ...post,
            category: categories
        }
    }
}