export interface CreatePost_Post {
    post_title: string;
    post_content: string;
    category_id?: number;
    tags?: string[];
}
export interface UpdateTags_Put {
    post_id: number;
    tags: string[];
}
//# sourceMappingURL=post.d.ts.map