import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions/AuthActions';

class Login extends Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    let data = {
      email: this.refs.email.value,
      password: this.refs.password.value
    };
    this.props.dispatch(actions.startLogin(data));
  }

  render() {
    return (
      <div>
        <fieldset className="form-group">
          <input
            className="form-control"
            type="text"
            ref="email"
            placeholder="e-mail address"
          />
        </fieldset>
        <fieldset className="form-group">
          <input
            className="form-control"
            type="password"
            ref="password"
            placeholder="password"
          />
        </fieldset>
        <div className="form-group">
          <input
            disabled={false}
            type="submit"
            className="btn btn-lg btn-primary btn-block"
            value="Login"
            onClick={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return state;
  }
)(Login);
