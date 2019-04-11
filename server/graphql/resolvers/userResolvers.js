const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../../models/User');

const userResolvers = {
  Query: {
    loginUser: async (_, args) => {
      const foundUser = await User.findOne({ email: args.input.email });

      if (!foundUser) {
        throw new Error('Authentication Failed');
      }

      const compResult = await bcrypt.compare(
        args.input.password,
        foundUser.password
      );

      if (!compResult) {
        throw new Error('Authentication Failed');
      }

      const token = jwt.sign(
        {
          userId: foundUser._id,
          name: foundUser.name,
          email: foundUser.email
        },
        'secretkey'
      );

      return {
        token,
        name: foundUser.name,
        email: foundUser.email,
        userId: foundUser._id
      };
    }
  },
  Mutation: {
    createUser: async (_, args) => {
      if (args.input.password.length <= 5) {
        throw new Error('Password too short');
      }
      const hashedPassword = await bcrypt.hash(args.input.password, 12);
      const foundUser = await User.findOne({ email: args.input.email });
      if (foundUser) {
        throw new Error('User Account already exist');
      }
      const user = new User({
        name: args.input.name,
        email: args.input.email,
        password: hashedPassword,
        todos: []
      });

      const userInfo = await user.save();

      return {
        id: userInfo._id,
        name: userInfo.name,
        email: userInfo.email,
        todos: []
      };
    }
  }
};

module.exports = {
  userResolvers
};
