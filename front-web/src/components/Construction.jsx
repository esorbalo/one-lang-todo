import React, { Component } from 'react';
import { connect } from 'react-redux';

class Construction extends Component {

  render() {
    return (
      <div>
        <h1>Under construction</h1>
        <p>The pages are still under ACTIVE construction.</p>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return state;
  }
)(Construction);
