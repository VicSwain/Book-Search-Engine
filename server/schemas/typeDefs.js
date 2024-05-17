const typeDefs = gql `
 type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]!
 }

 type Book {
    bookID: ID!
    authors: [String]!
    description: String!
    title: String!
    image: String
    link: String
 }

 type Auth {
    token: ID!
    user: User
 }

 type Query {
    profiles: [Profile]!
    profile(profileID: ID!): Profile
    me: Profile
 }

 type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookInput: BookInput!): User
    removeBook(bookID: ID!): User
 }

 input BookInput {
    authors: [String]!
    description: String!
    title: String!
    bookID: ID!
    image: String
    link: String
 }
`;

module.exports = typeDefs;

