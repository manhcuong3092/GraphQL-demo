import { authors, books } from "../data/static.js";
import { Author } from "../models/Author.js";
import { Book } from "../models/Book.js";

export const resolvers = {
  //QUERY
  Query: {
    books: async (parent, args, context) => await context.mongoDataMethods.getAllBooks(),
    book: async (parent, args, context) => await context.mongoDataMethods.getBookById(args.id),
    authors: async (parent, args, context) => await context.mongoDataMethods.getAllAuthors(),
    author: async (parent, args, context) => await context.mongoDataMethods.getAuthorById(args.id),
  },

  Book: {
    author: async ({ authorId }, args, context) => await context.mongoDataMethods.getAuthorById(authorId)
  },

  Author: {
    books: async ({ id }, args, context) => await context.mongoDataMethods.getAllBooks({ authorId: id })
  },

  //MUTATION
  Mutation: {
    createAuthor: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.createAuthor(args)
    },
    createBook: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.createBook(args)
    },
  }
}
