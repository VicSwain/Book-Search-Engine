const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// set token secret and expiration date
const secret = process.env.AUTH_SECRET;
const expiration = '2h';
module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.query or headers
    let token = req.query.token || req.headers.authorization;
    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
    if (!token) {
      return req;
    }
    // console.log(token);
    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data
      // console.log(data);
      // return req;
    } catch {
      // console.log('Invalid token');
      
    }
    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};









