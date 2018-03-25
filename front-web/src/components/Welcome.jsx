import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import TodoMiniApp from './Users/Todos/TodoMiniApp';

class Welcome extends Component {
  constructor() {
    super();
    this.renderNotAuthenticated = this.renderNotAuthenticated.bind(this);
  }

  renderNotAuthenticated() {
    return (
      <div>
        <h1>Welcome</h1>
        <p id="welcome" />
      </div>
    );
  }

  renderAuthenticated() {
    return (
      <TodoMiniApp />
    );
  }

  render() {
    let { authenticated } = this.props;
    return (authenticated) ? this.renderAuthenticated() : this.renderNotAuthenticated();
  }
}

export default connect(
  (state) => {
    return {
      authenticated: state.authenticated,
      user: state.user
    };
  }
)(Welcome);
