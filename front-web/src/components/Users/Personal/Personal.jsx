import React, { Component } from 'react';
import { connect } from 'react-redux';

import DangerButton from 'basics/buttons/DangerButton';

class Personal extends Component {

  constructor() {
    super();
    this.onDeleteUser = this.onDeleteUser.bind(this);
  }

  onDeleteUser() {
    alert('Function not yet implemented');
  }

  render() {
    return (
      <div>
        <h1>My personal page</h1>
        <p>Personal page.</p>
        <br />
        <br />

        <DangerButton onClick={this.onDeleteUser}>Delete user</DangerButton>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return state;
  }
)(Personal);
