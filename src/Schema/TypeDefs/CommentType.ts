
import { GraphQLFloat, GraphQLObjectType, GraphQLString } from 'graphql';
import { PostModel } from '../../entities/PostModel';
import { UserModel } from '../../entities/UserModel';
import { PostType } from './PostType';
import { UserType } from './UserType';

export const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
        comment_id : { type: GraphQLString },
        user_id    : { type : GraphQLString },
        post_id    : { type : GraphQLString },
        body       : { type : GraphQLString },
        created_at : { type : GraphQLString }, 
        likes      : { type : GraphQLFloat }, 
        post       : {
            type   : PostType,
            resolve(parent : any, args : any) : any {                
                return PostModel.findOne({
                    post_id : parent.post_id
                });
            }
        },
        user       : {
            type   : UserType,
            resolve(parent : any, args : any) : any {
                return UserModel.findOne({
                    user_id : parent.user_id
                });
            }
        },
    }),
});