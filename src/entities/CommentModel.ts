
import { BaseEntity, Column, CreateDateColumn, Entity, ObjectIdColumn , PrimaryColumn, Unique } from 'typeorm';

@Entity({ name : 'comments' })
@Unique(['comment_id','user_id','post_id'])

export class CommentModel extends BaseEntity{
    @PrimaryColumn()
    comment_id!: string

    @Column()
    user_id!: string

    @Column()
    post_id!: string

    @Column()
    title!: string;

    @Column()
    body!: string;

    @CreateDateColumn()
    created_at!: Date;

    @Column()
    likes! : number;
};