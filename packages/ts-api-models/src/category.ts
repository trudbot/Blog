export interface CreateCategoryApi {
    name: string;
    parentId?: number;
    postIds?: number[];
}

export interface CategoryEntity {
    category_id: number;
    category_name: string;
    children: CategoryEntity[];
}