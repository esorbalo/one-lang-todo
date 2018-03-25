import React, { Component } from 'react';
import { Link } from 'react-router';

class DangerButton extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  render() {
    return (
      <button className="btn btn-xs btn-danger" onClick={this.handleClick}>
        {this.props.children}
      </button>
    );
  }

}

DangerButton.propTypes = {
  children: React.PropTypes.node,
  onClick: React.PropTypes.func,
};

DangerButton.getDefaultProps = {
};

export default DangerButton;
