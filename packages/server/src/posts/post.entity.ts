import { Category } from "src/category/category.entity";
import { Tag } from "src/tags/tag.entity";
import { 
    Column, 
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
        type: 'datetime'
    })
    last_updated: Date;

    @Column({
        type: 'datetime'
    })
    publish_date : Date;

    @ManyToOne(() => Category, (category) => category.posts, {
        cascade: true
    })
    category: Category;

    @ManyToMany(() => Tag, (tag) => tag.posts, {
        cascade: true
    })
    @JoinTable()
    tags: Tag[];
}