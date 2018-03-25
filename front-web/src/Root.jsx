import React, { Component } from 'react';
import { Router, Route, IndexRoute, Redirect } from 'react-router';

import Welcome from 'components/Welcome';
import Construction from 'components/Construction';
import Personal from 'components/Users/Personal/Personal';
import App from 'components/App';
import Users from 'components/Users';
import Login from 'components/Auth/Login';
import Signup from 'components/Auth/Signup';
import * as AuthActions from './actions/AuthActions';

const { connect } = require('react-redux');

class Root extends Component {
  componentDidMount() {
    this.props.dispatch(AuthActions.checkInitialAuthentication());
  }

  render() {
    return (
      <Router history={this.props.history}>
        <Route path="/" component={App}>
          <IndexRoute component={Welcome} />
          <Redirect from="/users" to="/" />
          <Route path="/auth">
            <IndexRoute component={Login} />
            <Route path="login" component={Login} />
            <Route path="signup" component={Signup} />
          </Route>
          <Route path="/users/:userId" component={Users}>
            <IndexRoute component={Personal} />
          </Route>
        </Route>
      </Router>
    );
  }
}

export default connect()(Root);
