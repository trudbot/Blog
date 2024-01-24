import {Body, Controller, Get, HttpException, HttpStatus, Post, Put, Query,} from "@nestjs/common";
import {CreatePost_Post, UpdateTags_Put} from "ts-api-models/lib/request";
import {PostsService} from "./post.service";
import {PostEntity, PostMetaInfoEntity} from "ts-api-models/lib/response";

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
    ){}

    @Post('create')
    public async createPost(@Body() body: CreatePost_Post) {
        try {
            return await this.postsService.createPost(body.post_content, body.post_title, body.tags);
        } catch (e) {
            throw new HttpException(e.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 获取文章的基本信息
     */
    @Get('meta')
    public async getMetaInfo(): Promise<PostMetaInfoEntity[]> {
        try {
            return await this.postsService.getMetaInfo();
        } catch (e) {
            throw new HttpException(e.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @Get('getAll')
    public async getAllPosts(): Promise<PostEntity[]> {
        return  await this.postsService.getAll();
    }

    /**
     * 根据id获取文章的完整信息
     * @param query
     */
    @Get('getById')
    public async getPostById(@Query() query: {id: number}): Promise<PostEntity> {
        try {
            return await this.postsService.getPostById(query.id);
        } catch (e) {
            throw new HttpException(e.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @Put('updateTags')
    public async updateTags(@Body() body: UpdateTags_Put) {
        try {
            await this.postsService.updateTags(body.post_id, body.tags);
            return 'success';
        } catch (e) {
            throw new HttpException(e.toString(), HttpStatus.BAD_REQUEST);
        }
    }
}