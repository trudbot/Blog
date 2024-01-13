export interface CreateCategory_Body {
    name: string;
    parentId?: number;
}

export interface AddPosts_Body {
    category_id: number;
    post_ids: number | (number[]);
}

export interface GetPosts_Query {
    category_id: number;
}

export interface GetAncestors_Query {
    category_id: number;
}