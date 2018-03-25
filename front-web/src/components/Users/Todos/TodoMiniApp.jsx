import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions/TodoActions';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import TodoSearch from './TodoSearch';

class TodoMiniApp extends Component {

  componentDidMount() {
    this.props.dispatch(actions.startGetTodos(this.props.user.id));
  }

  render() {
    return (
      <div className="col-lg-4 col-md-6 col-sm-8">
        <div className="todoapp__container">
          <TodoSearch />
          <TodoList />
          <AddTodo />
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      user: state.user,
    };
  }
)(TodoMiniApp);
