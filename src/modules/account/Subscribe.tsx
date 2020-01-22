import * as React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import { Mutation } from '@apollo/react-components';
import gql from 'graphql-tag';

import { CreateSubscriptionMutation, CreateSubscriptionMutationVariables} from "../../generated/schemaTypes";
import { userFragment } from '../../graphql/fragments/user';

const createSubscriptionMutation = gql`
  mutation CreateSubscriptionMutation($source: String!, $ccLast4: String!) {
    createSubscription(source: $source, ccLast4: $ccLast4) {
      ...UserInfo
    }
  }
  ${userFragment}
`

export class Subscribe extends React.PureComponent {
  render() {
    return (
      <Mutation<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>
        mutation={createSubscriptionMutation}
      >
      { mutate => (
      <StripeCheckout
        token={async token => {
          const response = await mutate({ variables: {source: token.id, ccLast4: token.card.last4}});
          console.log(response);
        }}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE!}
        amount={1000}
      />
      )}</Mutation>
    );
  }
}
