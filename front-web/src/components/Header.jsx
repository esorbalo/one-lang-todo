import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';

import * as actions from 'actions/AuthActions';
import Flash from './Flash';
import Logo from './Logo';

class HeaderComponent extends Component {

  constructor() {
    super();
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
  }

  signup() {
    this.props.dispatch(actions.startSignup());
  }

  logout() {
    this.props.dispatch(actions.startLogout());
  }
  //
  // showLeftSideMenuItems(loggedIn, username, userid) {
  //   if (loggedIn) {
  //     return (
  //       <ul className="nav navbar-nav">
  //         <li><Link to={`/users/${userid}/todos`}>{username}&#8217;s todos</Link></li>
  //       </ul>
  //     );
  //   }
  // }

  showRightSideMenuItems(loggedIn) {
    if (!loggedIn) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/auth/login">Login</Link></li>
          <li><Link to="/auth/signup">Sign Up</Link></li>
        </ul>
      );
    }
    return (
      <ul className="nav navbar-nav navbar-right">
        <li><a href="/" onClick={this.logout}>Logout</a></li>
      </ul>
    );
  }

  render() {
    const { user, authenticated } = this.props;
    return (
      <div>
        <Flash />
        <nav className="navbar navbar-default">
          <div className="container-fluid container">

            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                data-target="#navbar" aria-expanded="false" aria-controls="navbar"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <Link className="navbar-brand" to="/"><Logo /></Link>
            </div>

            <div id="navbar" className="collapse navbar-collapse">
              {/* this.showLeftSideMenuItems(authenticated, user.username, user.id) */}
              {this.showRightSideMenuItems(authenticated)}
            </div>
          </div>
        </nav>
      </div>

    );
  }
}

function stateToProps(state) {
  return {
    authenticated: state.authenticated,
    user: state.user,
  };
}

export default connect(stateToProps)(withRouter(HeaderComponent));
