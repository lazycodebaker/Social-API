
import express from 'express';
import * as  dotenv from 'dotenv';

import { createConnection } from "typeorm";

import { graphqlHTTP } from 'express-graphql';
import { schema } from './src/Schema';
import { UserModel } from './src/entities/UserModel';
import { PostModel } from './src/entities/PostModel';
import { CommentModel } from './src/entities/CommentModel';

import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.listen(PORT, async()=>{

    const allowedOrigins = ['http://localhost:3000/'];

    const options: cors.CorsOptions = {
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
        credentials: true,
    };

    await createConnection({
        type: "sqlite",
        database: "./db.sqlite",
        synchronize: true,
        logging: true,
        entities: [
            UserModel,
            PostModel,
            CommentModel
        ]
    }).then(async (connection) => {
        console.log("Connected to SQLite database");
    }).catch(error => console.log(error));

    app.use(cors(options));
    app.use(express.json()); 
    app.use(cookieParser());
    

    app.use('/graphql',graphqlHTTP((req:any,res:any)=>({
        schema : schema,
        graphiql : true,        
    })));
    
    console.log(`Sever Running on PORT :: ${PORT}`);
});