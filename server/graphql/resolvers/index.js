const { Date } = require('../scalars/date');
const { userResolvers } = require('./userResolvers');
const { todoResolvers } = require('./todoResolvers');

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...todoResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...todoResolvers.Mutation
  },
  Date
};

module.exports = {
  resolvers
};
