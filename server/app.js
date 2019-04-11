const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const { resolvers } = require('./graphql/resolvers/index');
const { typeDefs } = require('./graphql/typeDefs');

const { authUser } = require('./helpers/authUser');

require('dotenv').config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';

    const authResult = authUser(token);
    return authResult
      ? { isLoggedIn: true, ...authResult }
      : { isLoggedIn: false };
  }
});

mongoose
  .connect(process.env.DB_CONN_URI, {
    useNewUrlParser: true
  })
  .then(() => {
    server.listen().then(({ url }) => {
      console.log(`Listening on port ${url}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect.', err);
  });
