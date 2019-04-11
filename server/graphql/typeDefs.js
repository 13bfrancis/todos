const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar Date
  type User {
    id: String!
    name: String!
    email: String!
  }
  type Todo {
    id: String!
    item: String!
    createdAt: Date!
  }
  type LoginCredentials {
    token: String!
    name: String!
    email: String!
    userId: String!
  }
  input UserInfo {
    name: String!
    email: String!
    password: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }
  type Query {
    todos: [Todo]!
    loginUser(input: LoginInput): LoginCredentials!
  }
  type Mutation {
    createUser(input: UserInfo): User!
    createTodo(item: String!): Todo!
    deleteTodo(id: String!): Todo!
  }
`;

module.exports = {
  typeDefs
};
