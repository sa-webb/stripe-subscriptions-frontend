import { userFragment } from './../fragments/user';
import { gql } from 'apollo-boost';

export const meQuery = gql`
  query MeQuery {
    me {
      ...UserInfo
    }
  }
  ${userFragment}
`;
