export interface CreatePost_Post {
    post_title: string;
    post_content: string;
    category_id?: number;
    tags?: string[];
    publish_date?: Date;
}

export interface UpdateTags_Put {
    post_id: number;
    tags: string[];
}

export interface GetMetaInfo_Query {
    category_id?: number;
    tag_label?: string;
}