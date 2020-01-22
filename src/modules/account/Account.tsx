import * as React from 'react';
import { Query } from '@apollo/react-components';
import { MeQuery } from '../../generated/schemaTypes';
import { Redirect } from 'react-router-dom';
import { Subscribe } from './Subscribe';
import { meQuery } from '../../graphql/queries/me';
import ChangeCard from './ChangeCard';
import { CancelSubscription } from './CancelSubscription';

export class Account extends React.PureComponent {
  render() {
    return (
      <Query<MeQuery> query={meQuery}>
        {({ data, loading }) => {
          if (loading) {
            return null;
          }

          if (!data) {
            return <div>data is undefined</div>;
          }

          if (!data.me) {
            return <Redirect to='/login' />;
          }

          if (data.me.type === 'free-trial') {
            return <Subscribe />;
          }
          // if (data.me.type === "test")
          //return <div>Thank you for your purchase {data.me.email}</div>;
          return (
            <div>
              Current Card Number {data.me.ccLast4}
              <ChangeCard />
              <CancelSubscription />
            </div>
          );
        }}
      </Query>
    );
  }
}
