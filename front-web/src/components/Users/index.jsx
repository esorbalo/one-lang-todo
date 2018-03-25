import React, { Component } from 'react';

class Users extends Component {

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-7 col-xs-12">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default Users;
