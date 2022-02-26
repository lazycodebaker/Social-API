
import { GraphQLFloat, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { CommentModel } from '../../entities/CommentModel';
import { UserModel } from '../../entities/UserModel';
import { CommentType } from './CommentType';
import { UserType } from './UserType';

export const PostType : any = new GraphQLObjectType({
    name : "Post",
    fields : ()=>({
        post_id  : { type : GraphQLString },
        user_id  : { type : GraphQLString },
        title    : { type : GraphQLString },
        body     : { type : GraphQLString },
        created_at : { type : GraphQLString },
        likes    : { type : GraphQLFloat },
        user     : {
            type : UserType,
            resolve : async(parent:any,args:any,context:any) =>{
                return await  UserModel.findOne({
                    user_id : parent.user_id,
                });
            }
        },
        comments   : {
            type   : new GraphQLList(CommentType),
            resolve: async (parent:any,args:any,req:any,res:any)=>{
                console.log("POST LL",parent.post_id)
                const comments =  await CommentModel.find({
                    post_id : parent.post_id                    
                });

                console.log("COMM : ",comments);

                return comments;
            },
        }
    }),
});