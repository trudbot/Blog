import { Post } from "src/posts/post.entity";
import { Entity, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tag {
    @PrimaryColumn()
    tag_label: string;

    @ManyToMany(() => Post, (post) => post.tags)
    posts: Post[];
}