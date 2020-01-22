import * as React from "react";
import { gql } from "apollo-boost";
import { userFragment } from "../../graphql/fragments/user";
import { CancelSubscriptionMutation } from "../../generated/schemaTypes";
import { Mutation } from "@apollo/react-components";

const cancelSubscriptionMutation = gql`
    mutation CancelSubscriptionMutation {
        cancelSubscription {
            ...UserInfo
        }
    }
    ${userFragment}
`;

export class CancelSubscription extends React.PureComponent {
    render() {
        return (
            <Mutation<CancelSubscriptionMutation> mutation={cancelSubscriptionMutation}>
                {mutate => <button onClick={() => mutate()}>cancel subscription</button>}
            </Mutation>
        )
    }
}