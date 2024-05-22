import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          bookId
          authors
          description
          title
          image
          link
        }
      }
    }
  }
`;

export const ADD_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      password
    }
  }
}
`;

export const SAVE_BOOK = gql`
mutation Mutation($bookInput: BookInput!) {
  saveBook(bookInput: $bookInput) {
    _id
    email
    password
    username
  }
}

`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBook {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
