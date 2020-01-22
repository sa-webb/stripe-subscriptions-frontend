import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { RegisterView } from './modules/users/RegisterView';
import { LoginView } from './modules/users/LoginView';
import { Subscribe } from './modules/account/Subscribe';
import { Account } from './modules/account/Account';
import { Header } from './shared/Header';

export class Routes extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={LoginView} />
          <Route
            path='/'
            render={() => (
              <React.Fragment>
                <Header />
                <div>
                  <Route path='/register' component={RegisterView} />
                  <Route path='/subscribe' component={Subscribe} />
                  <Route path='/account' component={Account} />
                  <Route
                    path='/'
                    exact={true}
                    render={() => <div>Homepage</div>}
                  />
                </div>
              </React.Fragment>
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
