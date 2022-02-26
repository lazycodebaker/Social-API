
import { GraphQLList, GraphQLString } from 'graphql';

import { PostModel } from '../../entities/PostModel';
import { PostType } from '../TypeDefs/PostType';

export const Posts = {
    type : new GraphQLList(PostType),
    async resolve(parent:any,args:any,context:any){
        return await PostModel.find();
    },
};

export const getUserPosts = {
    type : new GraphQLList(PostType),
    args : {
        user_id : { type : GraphQLString },
    },
    async resolve(parent:any,args:any,context:any){
        const posts = await PostModel.find({
            user_id : args.user_id
        })
        return posts;
    },
};

export const getPost = {
    type : PostType,
    args : {
        post_id : { type : GraphQLString },
    },
    async resolve(parent:any,args:any,context:any){
        const post = await PostModel.findOne({
            post_id : args.post_id
        })
        return post;
    },
};