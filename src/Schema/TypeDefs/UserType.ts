
import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { CommentModel } from '../../entities/CommentModel';
import { PostModel } from '../../entities/PostModel';
import { CommentType } from './CommentType';
import { PostType } from './PostType';

export const UserType : any = new GraphQLObjectType({
    name : "User",
    fields : ()=>({      
        user_id    : { type : GraphQLString },
        name       : { type : GraphQLString },
        username   : { type : GraphQLString },
        password   : { type : GraphQLString },
        email      : { type : GraphQLString },
        isLoggedIn : { type : GraphQLBoolean },
        created_at : { type : GraphQLString },
        updated_at : { type : GraphQLString },
        posts      : {
            type   : new GraphQLList(PostType),
            resolve: (parent:any,args:any,context:any)=>{
                return PostModel.find({
                    user_id : parent.user_id
                });
            }                
        },
        comments   : {
            type   : new GraphQLList(CommentType),
            resolve: (parent:any,args:any,req:any,res:any)=>{
                return CommentModel.find({
                    user_id : parent.user_id                    
                });
            },
        }
    }),
});