
// import user model
const { Query } = require('mongoose');
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            try{
                if (context.user) {
                    return await User.findById(context.user._id).populate('savedBooks');
                }

            } catch (err){
                console.log("Error in my query me: ", err);
                throw new Error ('You are not logged in.');
            }
        }
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            console.log(email, password);
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
            console.log(token, user );
            return { token, user };
        },

        saveBook: async (parent, { bookInput }, context ) => {
            console.log('I hit this SAVE BOOK ROUTE route');
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id },
                    { $addToSet: {savedBooks: bookInput } },
                    {new: true } );
                return updatedUser;
            }
            throw new Error('You must be logged in for this');
        }, 

        removeBook: async (parent, { bookId }, context) => {
            console.log('Remove Book Route HIT');
            if (context.user) {
                console.log(bookId);
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull : {savedBooks: { bookId } } },
                    { new: true }
                );
                // console.log(updatedUser);
                return updatedUser;
            }
            throw new Error('You must be logged in for this')
        }

    }
};

module.exports = resolvers; 