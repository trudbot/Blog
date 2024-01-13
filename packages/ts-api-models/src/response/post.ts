import {TagEntity} from "./tag";
import {CategoryEntity} from "./category";

export interface PostBaseEntity {
    post_id: number;
    post_title: string;
}

export interface PostMetaInfoEntity extends PostBaseEntity {
    publish_date: Date;
    tags: TagEntity[];
}

export interface PostEntity extends PostBaseEntity{
    post_content: string;
    publish_date: Date;
    tags: TagEntity[];
    category: CategoryEntity[];
}