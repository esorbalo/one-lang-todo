import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  startAddTodo,
  setSearchText,
  toggleShowCompleted
} from 'actions/TodoActions';

class TodoSearch extends Component {

  constructor(props) {
    super(props);
    this.handleShowCompletedSubmit = this.handleShowCompletedSubmit.bind(this);
    this.handleShowCompletedClick = this.handleShowCompletedClick.bind(this);
  }

  handleShowCompletedSubmit(e) {
    e.preventDefault();
    // Do nothing
  }

  handleShowCompletedClick(e) {
    e.preventDefault();
    this.props.dispatch(toggleShowCompleted());
  }

  render() {
    const { dispatch, showCompleted, searchText } = this.props;
    return (
      <div className="todo__container__header">
        <div>
          <input type="search" className="form-control" ref="searchText"
            placeholder="Search todos" value={searchText}
            onChange={() => {
              let searchText2 = this.refs.searchText.value;
              dispatch(setSearchText(searchText2));
            }}
          />
        </div>
        <div>
          <label htmlFor="showCompleted" onClick={this.handleShowCompletedClick}>
            <input type="checkbox"
              ref="showCompleted"
              checked={showCompleted}
              onChange={this.handleShowCompletedSubmit}
            />
            Show completed todos
          </label>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      user: state.user,
      showCompleted: state.showCompleted,
      searchText: state.searchText,
    };
  }
)(TodoSearch);
