import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "./post.entity";
import { Repository } from "typeorm";

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private postsRepository: Repository<Post>
    ){}

    getMetaInfo() {
        const res =  this.postsRepository.find({
            select: {
                post_title: true,
                post_id: true,
                tags: {
                    tag_label: true
                }
            }
        })
    }

    async getPostById(id: number) {
        const post = await this.postsRepository.findOneByOrFail({post_id: id});
        return post;
    }
}