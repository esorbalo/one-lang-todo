import React from 'react';
import { Footer, FooterTab, Button, Text } from 'native-base';

export default class TodoMiniApp extends React.Component {
  render() {
    return (
      <Footer>
        <FooterTab>
          <Button active>
            <Text>To Dos</Text>
          </Button>
          <Button>
            <Text>User profile</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
