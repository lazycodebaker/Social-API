
import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from 'graphql';
import { UserType } from './UserType';

export const MessageType = new GraphQLObjectType({
    name : "Message",
    fields : ()=>({
        success : { type : GraphQLBoolean },
        message : { type : GraphQLString  },
        extras  : { type : UserType },
        errorType : { type : GraphQLString },
    }),
});