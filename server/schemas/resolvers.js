// import user model
const { Query } = require('mongoose');
const { User } = require('../models');
// import sign token function from auth
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return await User.findById(context.user.id).populate('savedBooks');
            }
            throw new AuthenticationError('You are not logged in.');
        }
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error ('User not found');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new Error ('Incorrect Password');
            }
            const token = signToken(user);
            return { token, user };
        }, 

        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, { bookInput }, context ) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user.id },
                    { $addToSet: {savedBooks: bookInput } },
                    {new: true } 
                ).populate('savedBooks');
                return updatedUser;
            }
            throw new Error('You must be logged in for this');
        }, 

        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user.id },
                    { $pull : {savedBooks: { bookId } } },
                    { new: true }
                ).populate('savedBooks');
                return updatedUser;
            }
            throw new Error('You must be logged in for this')
        }

    }
};

module.exports = resolvers; 