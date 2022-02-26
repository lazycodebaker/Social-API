
import { GraphQLList, GraphQLString } from 'graphql';

import { UserType } from '../TypeDefs/UserType';
import { UserModel } from '../../entities/UserModel';
import { MessageType } from '../TypeDefs/MessageType';

export const Users = {
    type : new GraphQLList(UserType),
    async resolve(parent:any,args:any,req:any,res:any){
        return await UserModel.find();
    },
};

export const User = {
    type : MessageType,
    args : {
        user_id : { type : GraphQLString }, 
    },
    async resolve(parent:any,args:any){
        const user =  await UserModel.findOne({
            user_id : args.user_id,
        });

        if (user) {
            return {
                success : true,
                message : "User Found .",
                extras  : user,
                errorType : "",                
            }
        } else {
            return {
                success : false,
                message : "User Not Found .",
                extras  : "",
                errorType : "user not found",
            }
        };
    },
};
