import React, { Component } from 'react';
import { connect } from 'react-redux';

import TodosApi from 'utils/TodosApi';
import TodoItem from './TodoItem';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
  }

  renderList() {
    const { userId, todos, showCompleted, searchText } = this.props;
    const filteredTodos = TodosApi.filterTodos(todos, showCompleted, searchText);
    if (filteredTodos.length === 0) {
      return (
        <p className="container__message">Nothing to do</p>
      );
    }

    return filteredTodos.map(todo =>
      <TodoItem
        key={todo.id}
        userId={userId}
        {...todo}
      />
    );
  }

  render() {
    if (!this.props.todos) {
      return;
    }
    return (
      <div>
        {this.renderList(this.props.todos)}
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      userId: state.user.id,
      todos: state.todos,
      showCompleted: state.showCompleted,
      searchText: state.searchText,
    };
  }
)(TodoList);
