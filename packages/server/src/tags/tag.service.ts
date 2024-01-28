import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag)
       private readonly tagRepository: Repository<Tag>
    ) {}

    async getAll() {
        const tagEntity =  await this.tagRepository.find({
            relations: {
                posts: true
            }
        });
        return tagEntity.map(tag => ({
            tag_label: tag.tag_label,
            posts_count: tag.posts.length
        }))
    }

    async getPostsByTag(tag: string) {
        const tagEntity = await this.tagRepository.findOne({
            where: {
                tag_label: tag
            },
            relations: ['posts']
        });
        if (!tagEntity) throw new Error(`不存在标签 ${tag}`);
        return tagEntity.posts.map(post => {
            const {post_id, post_title, publish_date} = post;
            return {
                post_id,
                post_title,
                publish_date,
                tags: post.tags
            }
        });
    }
}
