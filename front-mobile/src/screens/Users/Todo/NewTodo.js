import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import { Button, Form, Item, Input, Text } from 'native-base';

import { startAddTodo } from 'actions/TodoActions';

class NewTodo extends React.Component {
  constructor(props) {
    super(props);
    this.onNewTodo = this.onNewTodo.bind(this);
    this.state = {
      newTodoText: '',
    };
  }

  onNewTodo() {
    let { dispatch, user, navigation } = this.props;
    dispatch(startAddTodo(user.id, this.state.newTodoText));
    navigation.pop(1);
  }

  render() {
    return (
      <SafeAreaView>
        <Form>
          <Item>
            <Input
              placeholder="Type here new todo..."
              onChangeText={newTodoText => this.setState({ newTodoText })}
            />
          </Item>
          <Button full onPress={this.onNewTodo}>
            <Text>Add</Text>
          </Button>
        </Form>
      </SafeAreaView>
    );
  }
}

export default connect((state) => {
  return {
    user: state.user,
  };
})(NewTodo);
