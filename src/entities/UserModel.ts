
import {Entity,BaseEntity,Unique, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn} from "typeorm";

@Entity({ name: 'users' })
@Unique(['email','username'])
export class UserModel extends BaseEntity{
    @PrimaryColumn()
    user_id!: string

    @Column()
    name!: string;
    
    @Column()
    username!: string;      

    @Column()
    password!: string;      

    @Column({ name: 'email' })
    email!: string;

    @Column()
    isLoggedIn!: boolean;

    @CreateDateColumn()
    created_at!: Date;
        
    @UpdateDateColumn()
    updated_at!: Date;
};