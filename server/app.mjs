import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";

// Load schema & resolvers
import { typeDefs } from "./schema/schema.js";
import { resolvers } from "./resolver/resolver.js";
import { mongoDataMethods } from "./data/db.js";

import dotenv from 'dotenv';
dotenv.config();

mongoDataMethods

// Connect to MongoDb
const connectDb = async () => {
  try {
    mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(con => {
      console.log(`MongoDB database connected with Host: ${con.connection.host}`);
    })
  } catch (error) {
    console.log(error);
  }
}
await connectDb();


// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ mongoDataMethods })
})
await server.start();

const app = express();

app.use(cors())
server.applyMiddleware({ app })

// server.applyMiddleware({ app, path: '/' })

app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
)