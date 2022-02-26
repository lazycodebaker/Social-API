
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { MessageType } from '../TypeDefs/MessageType';
import { CommentModel } from '../../entities/CommentModel';
import { v4 } from 'uuid';
import { UserModel } from '../../entities/UserModel';
import { PostModel } from '../../entities/PostModel';

export const addComment = {
    type: MessageType,
    args: {
        post_id      : { type: GraphQLString },
        user_id      : { type: GraphQLString },
        body         : { type: GraphQLString },
    },
    async resolve(parent:any, args:any){
        const data = new Date();
        const comment_id = v4();

        const user =  await UserModel.findOne({
            user_id : args.user_id
        });

        console.log(user,args.user_id);

        if(!user){
            return{
                message : "user not found .",
                success : false ,
                extras : "",
            }
        };

        const post = await PostModel.findOne({
            post_id : args.post_id
        });

        if(!post){
            return{
                message : "Post Not Found .",
                success : false ,
                extras  : ""
            }
        };

        if(post && user){        
            await CommentModel.insert({
                comment_id : comment_id,
                post_id    : args.post_id,    
                user_id    : args.user_id,
                body       : args.body,
                likes      : 0,
                created_at : data.toLocaleDateString('en-US'),           
            });

            return {
                message : 'Comment Added Successfully',
                success : true,
                extras  : comment_id,
            } 
        };
    },
};

export const DeleteComment = {
    type: MessageType,
    args: {
        post_id : { type: GraphQLString },
        user_id : { type: GraphQLString },
        comment_id : { type: GraphQLString },
    },
    async resolve(parent:any, args:any,req:any,res:any){

        const getUser = await UserModel.findOne({
            user_id : args.user_id,
        });

        const getPost = await PostModel.findOne({
            post_id : args.post_id,
        });

        if(!getUser){
            return {
                success : false,
                message : "User Not Found .",
                extras  : "",
            }
        };

        if(!getUser.isLoggedIn){
            return {
                success : false,
                message : "User Not LoggedIn .",
                extras  : "",
            }
        };

        if(!getPost){
            return {
                success : false,
                message : "POSt Not Found .",
                extras  : "",
            }
        };

        if(getUser?.user_id === getPost?.user_id){
            await CommentModel.delete({
                comment_id : args.comment_id,
            });
            return {
                message : 'Comment Deleted Successfully',
                success : true,
                extras  : "",
            } 
        }else{
            return{
                message : 'You are not authorized to delete this comment',
                success : false,
                extras : "",
            }
        }              
    },
};


export const LikeComment = {
    type : MessageType,
    description : "Like A Comment",
    args:{
        user_id     : { type : GraphQLString },
        comment_id  : { type : GraphQLString },        
    },
    async resolve(parent:any,args:any,req:any,res:any){
        const getUser = await UserModel.findOne({
            user_id : args.user_id
        });

        const getComment = await CommentModel.findOne({
            comment_id : args.comment_id,
        });

        if(!getUser){
            return {
                success : false,
                message : "User Not Found .",
                extras  : "",
            }
        };

        if(!getUser.isLoggedIn){
            return {
                success : false,
                message : "User Not Logged In .",
                extras  : "",
            }
        };

        if(!getComment){
            return {
                success : false,
                message : "Comment Not Found .",
                extras  : "",
            }
        };

        var prevLikes = getComment.likes;        

        await CommentModel.update({
            comment_id : args.comment_id,
        },{
            likes :  prevLikes + 1,
        });       

        return {
            success : true,
            message : "Comment Liked.",
            extras  : "",
        };
    },
};