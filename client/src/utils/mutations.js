import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($pasword: String!, $email: String!) {
    login(password: $password, email: $email) {
      token
      user {
        _id
        name
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($usernname: String!, $email: String!, $pasword: String!) {
    addUser(username: $usernname, $email: String!, $pasword: String!) {
      token
      user {
        _id
      name
      email
    }}
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookData: BookInput!) {
    saveBook(bookData: $bookData) {
      _id
      username
      email
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
`;

export const REMOVE_BOOK = gql`
  mutation rmeoveBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        bookId
      }
    }
  }
`;
