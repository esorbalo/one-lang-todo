import React, { Component } from 'react';
import { connect } from 'react-redux';

import { startToggleTodo } from 'actions/TodoActions';

const moment = require('moment');

class TodoItem extends Component {

  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleToggle(e) {
    e.preventDefault();
    const { userId, id, completed, dispatch } = this.props;
    dispatch(startToggleTodo({
      id,
      userId,
      completed: !completed
    }));
  }

  handleOnChange(e) {
    e.preventDefault();
    // do nothing. Is here for the browser to not complain.
  }

  render() {
    const { id, text, completed, createdAt, updatedAt, dispatch } = this.props;
    const todoClassName = completed ? 'todo todo-completed' : 'todo';
    const renderDate = () => {
      let message = 'Created: ';
      let timestamp = createdAt;

      if (completed) {
        message = 'Completed ';
        timestamp = updatedAt;
      }

      return message + moment(timestamp)
        .format('DD MMM YYYY @ H:mm:ss');
    };

    return (
      <div className={todoClassName} onClick={this.handleToggle}>
        <div>
          <input type="checkbox" checked={completed} onChange={this.handleOnChange} />
        </div>
        <div>
          <p>{text}</p>
          <p className="todo__subtext">{renderDate()}</p>
        </div>
      </div>
    );
  }
}

export default connect()(TodoItem);
