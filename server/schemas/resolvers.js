const { Book, Author, User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (_, args, context) => {
     if (context.user){
      const userData = await User.findOne({ _id: context.user.id })
      .select('-__v -password')
      .populate('savedBooks')

      return userData;
     }
     throw new AuthenticationError('You need to be logged in');
    },
  },
  Mutation: {
    login: async (_, {email, password}) => {
      const user = await User.findeOne({ email });

      if(!user){
        throw new AuthenticationError('Incorrect username or password');
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword){
        throw new AuthenticationError('Incorrect username or password');
      }

      const token = signToken(user);
      return { token, user};
    },
    addUser: async (_, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (_, { bookData }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookData } },
          { new: true }
        ).populate('savedBooks');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    removeBook: async (_, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        ).populate('savedBooks');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
