
import { GraphQLString } from 'graphql';
import { PostModel } from '../../entities/PostModel';
import { MessageType } from '../TypeDefs/MessageType';
import { v4 } from 'uuid';
import { UserModel } from '../../entities/UserModel';

export const AddPost = {
    type : MessageType,
    description : "Add A New Post",
    args:{
        user_id : {type : GraphQLString },
        title : { type :  GraphQLString},
        body  : { type :  GraphQLString}        
    },
    async resolve(parent:any,args:any,req:any,res:any){
        const date = new Date();

        const getUser = await UserModel.findOne({
            user_id : args.user_id
        });

        if(getUser){

            await PostModel.insert({
                title      : args.title,
                body       : args.title,
                user_id    : args.user_id,
                post_id    : v4(),
                likes      : 0,
                created_at : date.toLocaleDateString('en-US'),
            });    

            return {
                success : true,
                message : "Post Added",
                extras  : ""
            }
        }
        else{
            return {
                success : false,
                message : "Post Cannot be Added , no user found ",
                extras  : ""
            }
        }
    }
};

export const DeletePost = {
    type : MessageType,
    description : "Delete A Post",
    args:{
        user_id : {type : GraphQLString },     
        post_id : { type : GraphQLString },
    },
    async resolve(parent:any,args:any,req:any,res:any){
        const getUser = await UserModel.findOne({
            user_id : args.user_id
        });

        const getPost = await PostModel.findOne({
            post_id : args.post_id,
        });

        if(!getUser){
            throw new Error("No User Found");
        };

        if(!getUser.isLoggedIn){
            throw new Error("User Not Logged In");
        };

        if(args.user_id === getPost?.user_id){
            await PostModel.delete({
                post_id : args.post_id,
            })
        }else{
            return {
                success : false,
                message : "Post Not Accessible .",
                extras  : "",
            }
        };
           
        return {
            success : true,
            message : "Post Deleted.",
            extras  : "",
        };
    },
};


export const LikePost = {
    type : MessageType,
    description : "Like A Post",
    args:{
        user_id : {type : GraphQLString },
        post_id : { type : GraphQLString },        
    },
    async resolve(parent:any,args:any,req:any,res:any){
        const getUser = await UserModel.findOne({
            user_id : args.user_id
        });

        const getPost = await PostModel.findOne({
            post_id : args.post_id,
        });

        if(!getUser){
            throw new Error("No User Found");
        };

        if(!getUser.isLoggedIn){
            throw new Error("User Not Logged In");
        };

        if(!getPost){
            throw new Error("No Post Found");
        };

        var prevLikes = getPost.likes;
        

        await PostModel.update({
            post_id : args.post_id,
        },{
            likes :  prevLikes + 1,
        });       

        return {
            success : true,
            message : "Post Liked.",
            extras  : "",
        };
    },
};