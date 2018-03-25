import React, { Component } from 'react';
import { connect } from 'react-redux';

import { startAddTodo } from 'actions/TodoActions';

class AddTodo extends Component {

  constructor(props) {
    super(props);
    this.onNewTodo = this.onNewTodo.bind(this);
  }

  onNewTodo(e) {
    e.preventDefault();
    let newText = this.refs.newtodo.value;
    if (newText) {
      this.refs.newtodo.value = '';
      this.props.dispatch(startAddTodo(this.props.user.id, newText));
    } else {
      this.refs.newtodo.focus();
    }
  }

  render() {
    console.log('AddTodo render');
    return (
      <div className="todo__container__footer">
        <form onSubmit={this.onNewTodo} className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="What do you need to do?"
            ref="newtodo"
          />
          <span className="input-group-btn">
            <button
              className="btn btn-default"
              type="button"
              onClick={this.onNewTodo}
            >Create</button>
          </span>
        </form>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      user: state.user
    };
  }
)(AddTodo);
