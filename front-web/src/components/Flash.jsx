import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FlashConstants, discardMessage } from 'actions/FlashActions';

class Flash extends Component {

  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
  }

  componentWillReceiveProps() {
    window.setTimeout(() => {
      this.props.dispatch(discardMessage(FlashConstants.FLASH_SUCCESS));
      this.props.dispatch(discardMessage(FlashConstants.FLASH_ERROR));
    }, 3000);
  }

  onClick() {
    this.props.dispatch(discardMessage(FlashConstants.FLASH_SUCCESS));
    this.props.dispatch(discardMessage(FlashConstants.FLASH_ERROR));
  }

  render() {
    const { messageError, messageSuccess } = this.props;
    let messageType = 'alert-danger';
    let messageHeader = 'Error:';
    if (!messageError) {
      messageType = 'alert-success';
      messageHeader = 'Success:';
    }

    if (messageError || messageSuccess) {
      return (
        <div className={`alert ${messageType} alert-dismissible`} role="alert">
          <div className="container">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={this.onClick}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <strong>{messageHeader}</strong> {messageError || messageSuccess}
          </div>
        </div>
      );
    }
    return (<div />);
  }
}

function stateToProps(state) {
  return {
    messageSuccess: state.messageSuccess,
    messageError: state.messageError,
  };
}

export default connect(stateToProps)(Flash);
