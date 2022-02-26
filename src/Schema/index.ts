
import { GraphQLObjectType, GraphQLSchema } from "graphql";

import { User, Users } from "./Queries/User";
import { getPost, getUserPosts, Posts } from "./Queries/Post";
import { getComment, getUserComments } from "./Queries/Comment";

import { CreateUser, DeleteUser, Login, Logout, UpdatePassword } from "./Mutations/User";
import { AddPost, DeletePost, LikePost } from "./Mutations/Post";
import { addComment, DeleteComment, LikeComment } from "./Mutations/Comment";

const Queries = new GraphQLObjectType({
    name : "Queries",
    fields : {
        users        : Users,
        user         : User,
        posts        : Posts,
        getUserPosts : getUserPosts,
        getPost      : getPost,
        getComment   : getComment,
        getComments  : getUserComments,
    },
});

const Mutations = new GraphQLObjectType({
    name : "Mutations",
    fields : {
        createUser     : CreateUser,
        deleteUser     : DeleteUser,
        updatePassword : UpdatePassword,
        addPost        : AddPost,
        deletePost     : DeletePost,
        logIn          : Login,
        logOut         : Logout,
        addComment     : addComment,
        deleteComment  : DeleteComment,
        likePost       : LikePost,
        likeComment    : LikeComment,
    },
});

export const schema = new GraphQLSchema({
    query : Queries,
    mutation : Mutations,
});