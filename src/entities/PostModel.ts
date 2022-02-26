
import {Entity,BaseEntity,Unique, Column, ObjectIdColumn, CreateDateColumn, PrimaryColumn} from "typeorm";

@Entity({ name: 'posts' })
@Unique(['post_id','user_id'])
export class PostModel extends BaseEntity{
    @PrimaryColumn()    
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