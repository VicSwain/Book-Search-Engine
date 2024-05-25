import { gql } from '@apollo/client';

export const GET_ME = gql `
{
me {
    _id
    email
    password
    savedBooks {
      link
      authors
      bookId
      description
      image
      title
    }
  }
}`;