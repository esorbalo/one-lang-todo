import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import { Button, Text } from 'native-base';

import { startLogout } from 'actions/AuthActions';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    this.props.dispatch(startLogout());
  }

  render() {
    return (
      <SafeAreaView>
        <Text></Text>
        <Button full danger onPress={this.onLogout}>
          <Text>Log out</Text>
        </Button>
      </SafeAreaView>
    );
  }
}

export default connect((state) => {
  return {
  };
})(Settings);
