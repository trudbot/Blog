import { Category } from "src/category/category.entity";
import { Tag } from "src/tags/tag.entity";
import {
    Column, CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    post_id: number;

    @Column()
    post_title: string;

    @Column({
        type: 'text'
    })
    post_content: string;

    @UpdateDateColumn({
        type: "timestamp"
    })
    last_updated: Date;

    @CreateDateColumn({
        type: "timestamp"
    })
    publish_date : Date;

    @ManyToOne(() => Category, (category) => category.posts)
    category: Category;

    @ManyToMany(() => Tag, (tag) => tag.posts, {
        cascade: true
    })
    @JoinTable()
    tags: Tag[];
}