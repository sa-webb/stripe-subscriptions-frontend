import * as React from 'react';
import { Link } from 'react-router-dom';
import { Query } from '@apollo/react-components';
import { MeQuery } from '../generated/schemaTypes';
import { meQuery } from '../graphql/queries/me';

export class Header extends React.PureComponent {
  render() {
    return (
      <div
        style={{
          height: 50,
          width: '100%',
          backgroundColor: 'rgb(255, 254, 252)',
          display: 'flex',
          justifyContent: 'space-around',
          padding: 10,
          alignItems: 'center'
        }}
      >
        <Link to='/'>Stripe example</Link>
        <Query<MeQuery> query={meQuery}>
          {({ data, loading }) => {
            if (loading || !data) {
              return null;
            }

            if (!data.me) {
              return (
                <div>
                  <div>
                    <Link to='/login'>Login</Link>
                  </div>
                  <div>
                    <Link to='/register'>Register</Link>
                  </div>
                </div>
              );
            }
            return (
                <div>
                    <Link to="/account">Account</Link>
                </div>
            )
          }}
        </Query>
      </div>
    );
  }
}
