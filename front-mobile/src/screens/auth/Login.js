import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Content, Button, Form, Item, Input, Text } from 'native-base';

import * as actions from 'actions/AuthActions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onSignIn = this.onSignIn.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  onSignIn() {
    let data = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.dispatch(actions.startLogin(data));
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item>
              <Input
                placeholder="Username"
                onChangeText={email => this.setState({ email })}
              />
            </Item>
            <Item last>
              <Input
                password
                secureTextEntry
                placeholder="Password"
                onChangeText={password => this.setState({ password })}
              />
            </Item>
            <Button full onPress={this.onSignIn}>
              <Text>Sign in</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default connect((state) => {
  return state;
})(Login);
