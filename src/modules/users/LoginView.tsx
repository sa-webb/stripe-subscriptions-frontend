import * as React from 'react';

import { gql } from 'apollo-boost';
import { Mutation } from '@apollo/react-components';

import { RouteComponentProps } from 'react-router-dom';
import {
  LoginMutation,
  LoginMutationVariables
} from '../../generated/schemaTypes';
import { meQuery } from '../../graphql/queries/me';
import { userFragment } from '../../graphql/fragments/user';

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...UserInfo
    }
  }
  ${userFragment}
`;

export class LoginView extends React.PureComponent<RouteComponentProps<{}>> {
  state = {
    email: '',
    password: ''
  };

  handleChange = (e: any) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  /**
   * Update cache after render. If not the cache will be set as an undefined user.
   */
  render() {
    const { password, email } = this.state;
    return (
      <Mutation<LoginMutation, LoginMutationVariables>
        update={(cache, { data }) => {
          if (!data || !data.login) {
            return;
          }

          cache.writeQuery({
            query: meQuery,
            data: { me: data.login }
          });
        }}
        mutation={loginMutation}
      >
        {(mutate, {client}) => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div>
              <input
                type='email'
                name='email'
                placeholder='email'
                value={email}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <input
                type='password'
                name='password'
                placeholder='password'
                value={password}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <button
                onClick={async () => {
                  // await client.resetStore();
                  const response = await mutate({
                    variables: this.state
                  });
                  console.log(response);
                  this.props.history.push('/account');
                }}
              >
                Login
              </button>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}
