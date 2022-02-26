
import { GraphQLString } from 'graphql';
import { UserModel } from '../../entities/UserModel';
import { MessageType } from '../TypeDefs/MessageType';
import { v4 } from 'uuid';

export const CreateUser = { 
    type : MessageType,
    args : {
        name     : {type : GraphQLString},
        username : {type : GraphQLString},
        password : {type : GraphQLString},
        confirmPassword : {type : GraphQLString},
        email    : {type : GraphQLString},
    },
    
    async resolve(parent:any,args:any,req:any,res:any){
        const { name ,username ,email, password } = args;

        const user_id = v4();
        const date = new Date();

        const user = await UserModel.findOne({
            username : username
        });

        const user_e = await UserModel.findOne({
            email : email
        });

        if(user_e){
            return {
                success : false,
                message : "Email already exists",
                errorType : "email"
            }
        };

        if(password.length < 6){
            return {
                message : "Password should be atleast 6 characters long",
                success  : false,
                errorType : "password"
            };
        };

        if(password !== args?.confirmPassword){
            return {
                message : "Password and Confirm Password do not match",
                success  : false,
                errorType : "confirmpassword"
            };
        };

        if(user){
            return{
                success : false,
                message : "Username already exists",
                errorType : "username"            
            }
        };

        await UserModel.insert({
            name : name,
            email : email,
            password : password,
            username : username,
            user_id : user_id,
            isLoggedIn : true,
            created_at : date.toLocaleDateString('en-US'),
        });       

        const user_data = await UserModel.findOne({
            username : username
        });

    
        return {
            success : true,
            message : "User Created .",
            extras  : {
                    user_id : user_data?.user_id,
                    username : user_data?.username,
                    name : user_data?.name,
                    email : user_data?.email,
                    isLoggedIn : user_data?.isLoggedIn,
                    created_at : user_data?.created_at,
                    updated_at : user_data?.updated_at,                 
            },
            errorType : "",
        }
    }
};

export const DeleteUser = {
    type : MessageType,
    args:{
        user_id : { type : GraphQLString },
    },
    async resolve(parent:any,args:any,req:any,res:any){
        const { user_id } = args;

        if(await UserModel.findOne({
            user_id : user_id,
        })){
            await UserModel.delete({
                user_id : user_id,
            });

            return {
                success : true,
                message : "User Deleted .",
                extras  : "",
                errorType : "",
            }
        }
        else{
            return {
                success : false,
                message : "User Not Found  .",
                extras  : "",
                errorType : "",
            }
        }       
    },
};

export const UpdatePassword = {
    type : MessageType,
    args : {
        user_id     : { type : GraphQLString },
        oldPassword : { type : GraphQLString },
        newPassword : { type : GraphQLString },
    },
    async resolve(parent:any,args:any,req:any,res:any){
        const { user_id , oldPassword ,newPassword } = args;

        const user = await UserModel.findOne({
            user_id:user_id
        });

        const user_old_password = user?.password;

        const date = new Date();

        if(user_old_password === oldPassword){
            await UserModel.update({
                user_id : user_id,
            },{
                password : newPassword,
                updated_at : date.toLocaleDateString('en-US'),
            });

            return {
                success : true,
                message : "Password Update Successfully .",
                extras  : "",
                errorType : "",
            };
        }
        else{
            return {
                success : false,
                message : "Passwords Not Matched .",
                extras  : "",
                errorType : "password",
            }
        }
    },
};


export const Login = {
    type : MessageType,
    args : {
        username   : { type : GraphQLString },
        password   : { type : GraphQLString },
    },
    async resolve(parent:any,args:any,req:any,res:any){

        const getUser = await UserModel.findOne({
            username : args.username,
        });

        if(!getUser){
            return {
                success : false,
                message : "User Not Found .",
                extras  : "",
                errorType : "username",
            }           
        };

        if( args.password === getUser?.password ){
            await UserModel.update({
                username : args.username,
            },{
                isLoggedIn : true,
            });
        }
        else{
            return {
                success : false,
                message : "Incorrect Password.",
                extras  : "",
                errorType : "password",
            }
        };    

        const user_data = await UserModel.findOne({
            username : args?.username,
        });

        return {
            success : true,
            message : "Login Successfully .",
            extras  : {
                    user_id : user_data?.user_id,
                    username : user_data?.username,
                    name : user_data?.name,
                    email : user_data?.email,
                    isLoggedIn : user_data?.isLoggedIn,
                    created_at : user_data?.created_at,
                    updated_at : user_data?.updated_at,                   
            },
            errorType : "",
        };      
    },
};


export const Logout = {
    type : MessageType,
    args : {
        user_id : { type : GraphQLString },
    },
    async resolve(parent:any,args:any,req:any,res:any){
        const { user_id } = args;

        if(await UserModel.findOne({
            user_id : user_id,
        })){
            await UserModel.update({
                user_id : user_id,
            },{
                isLoggedIn : false,
            });
        }
        else{
            return {
                success : false,
                message : "User Not Found .",
                extras  : "",
                errorType : "user",
            }
        }

        return {
            success : true,
            message : "Logout Successfully .",
            extras  : "",
            errorType : "",
        }
    },
};

