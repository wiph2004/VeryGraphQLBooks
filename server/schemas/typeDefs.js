const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
  }

  type Auth {
    token: ID!
    profile: User
  }
  type Mutation {
    login(username: String!, email: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(book: String!): User
  }
  type User{
  _id: ID
  username: String
  email: String
  bookCount: Int
  savedBooks: [Book]
  }
  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }
  input BookInput {
    authors: [String]
    description: String
    title: String
    bookId: String
    image: String
    link: String
  }
`;

module.exports = typeDefs;
