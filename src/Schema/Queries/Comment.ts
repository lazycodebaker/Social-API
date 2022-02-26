
import { GraphQLList, GraphQLString } from 'graphql';
import { CommentModel } from '../../entities/CommentModel';
import { CommentType } from '../TypeDefs/CommentType';


export const getComment = {
    type: CommentType,
    args: {
        comment_id: { type: GraphQLString }
    },
    resolve: async (parent: any, args: any ,req:any,res:any) => {
        const comment = await CommentModel.findOne({ 
            comment_id: args.comment_id 
        });
        return comment;
    },
};


export const getUserComments = {
    type : new GraphQLList(CommentType),
    args : {
        user_id : { type : GraphQLString },
    },
    async resolve(parent:any,args:any,context:any){
        const comments = await CommentModel.find({
            user_id : args.user_id
        })
        return comments;
    },
};
