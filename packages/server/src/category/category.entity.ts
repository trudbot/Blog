import { Post } from "src/posts/post.entity";
import {
    Entity,
    Tree,
    Column,
    PrimaryGeneratedColumn,
    TreeChildren,
    TreeParent,
    OneToMany,
} from "typeorm"

@Entity()
@Tree("closure-table")
export class Category {
    @PrimaryGeneratedColumn()
    category_id: number;

    @Column()
    category_name: string;

    @TreeChildren()
    children: Category[]

    @TreeParent()
    parent: Category;

    @OneToMany(() => Post, (post) => post.category, {
        cascade: true
    })
    posts: Post[]
}