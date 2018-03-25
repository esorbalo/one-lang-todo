import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

import * as actions from 'actions/AuthActions';
import Login from './screens/auth/Login';
import TodoMiniApp from './screens/Users/TodoMiniApp';

class StyledApp extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    if (!this.props.authenticated) {
      return (<Login />);
    }

    return (<TodoMiniApp />);
  }
}

export default connect((state) => {
  return state;
})(StyledApp);


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
