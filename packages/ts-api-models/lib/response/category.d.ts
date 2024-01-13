export interface CategoryEntity {
    category_id: number;
    category_name: string;
}
export interface CategoryTreeEntity extends CategoryEntity {
    children: CategoryTreeEntity[];
}
//# sourceMappingURL=category.d.ts.map