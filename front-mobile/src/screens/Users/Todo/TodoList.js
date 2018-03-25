import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import { ScrollView, StyleSheet } from 'react-native';
import { List, Icon, Button } from 'native-base';

import * as actions from 'actions/TodoActions';
import TodoItem from './TodoItem';

class TodoList extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: 'To Dos',
      headerRight: (
        <Button
          transparent
          onPress={() => navigation.navigate('NewTodo')}
        >
          <Icon name="add" />
        </Button>
      ),
    };
  };

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(actions.startGetTodos(this.props.user.id));
  }

  renderItem(todo) {
    return (
      <TodoItem
        key={todo.id}
        userId={this.props.user.id}
        {...todo}
      />
    );
  }

  render() {
    if (!this.props.todos) {
      return;
    }
    const items = ['Simon Mignolet', 'Nathaniel Clyni', 'Dejan Lovren', 'Mama Sakho', 'Emre Can'];
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView>
          <List
            dataArray={this.props.todos}
            renderRow={this.renderItem}
          />
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});

export default connect((state) => {
  return {
    user: state.user,
    todos: state.todos,
    showCompleted: state.showCompleted,
  };
})(TodoList);
