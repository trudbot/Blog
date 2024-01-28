import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { TagService } from './tag.service';
import { PostMetaInfoEntity } from 'ts-api-models/lib/response';
import { TagData } from 'ts-api-models/lib/response/tag';

@Controller('tag')
export class TagController {
    constructor(
        private readonly tagService: TagService
    ) {}
    @Get('getAll')
    public getAllTags(): Promise<TagData[]> {
        return this.tagService.getAll();
    }

    @Get('getPosts/:tag')
    public async getPostsByTag(@Param('tag') tag: string): Promise<PostMetaInfoEntity[]> {
        try {
            return await this.tagService.getPostsByTag(tag);
        } catch (e) {
            throw new HttpException(e.toString(), HttpStatus.BAD_REQUEST);
        }
    }
}
