import React from 'react';
import { connect } from 'react-redux';
import { Body, CheckBox, ListItem, Text } from 'native-base';

import { startToggleTodo } from 'actions/TodoActions';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    const { userId, id, completed, dispatch } = this.props;
    let toToggle = {
      id,
      userId,
      completed: !completed,
    };
    dispatch(startToggleTodo(toToggle));
  }

  render() {
    const { id, text, completed, createdAt, updatedAt, dispatch } = this.props;
    return (
      <ListItem>
        <CheckBox
          checked={completed === 1}
          onPress={this.handleToggle}
        />
        <Body>
          <Text>{text}</Text>
        </Body>
      </ListItem>
    );
  }
}

export default connect()(TodoItem);
