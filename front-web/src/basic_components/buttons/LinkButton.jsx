import React, { Component } from 'react';
import { Link } from 'react-router';

class LinkButton extends Component {
  render() {
    const moreClassName = this.props.moreClassName || '';
    return (
      <Link className={`btn btn-primary btn-large ${moreClassName}`} to={this.props.to}>
        {this.props.children}
      </Link>
    );
  }

}

LinkButton.propTypes = {
  moreClassName: React.PropTypes.string,
  to: React.PropTypes.string.isRequired,
  // children: React.PropTypes.nodes,
};

LinkButton.getDefaultProps = {
  moreClassName: ''
};

export default LinkButton;
