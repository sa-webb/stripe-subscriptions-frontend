import * as React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import { Mutation } from '@apollo/react-components';
import gql from 'graphql-tag';

import {
  ChangeCreditCardMutation,
  ChangeCreditCardMutationVariables
} from '../../generated/schemaTypes';
import { userFragment } from '../../graphql/fragments/user';

const changeCreditCardMutation = gql`
  mutation ChangeCreditCardMutation($source: String!, $ccLast4: String!) {
    changeCreditCard(source: $source, ccLast4: $ccLast4) {
      ...UserInfo
    }
  }
  ${userFragment}
`;

export default class ChangeCard extends React.PureComponent {
  render() {
    return (
      <Mutation<ChangeCreditCardMutation, ChangeCreditCardMutationVariables>
        mutation={changeCreditCardMutation}
      >
        {mutate => (
          <StripeCheckout
            token={async token => {
              const response = await mutate({
                variables: { source: token.id, ccLast4: token.card.last4 }
              });
              console.log(response);
            }}
            panelLabel='Change Card'
            stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE!}
          >
            <button>change credit card</button>{' '}
          </StripeCheckout>
        )}
      </Mutation>
    );
  }
}
