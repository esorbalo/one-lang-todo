import React from 'react';
import { Provider } from 'react-redux';
import { Root } from 'native-base';

import { configureReduxStore } from './stores/configureStore';
import StyledApp from './StyledApp';

const reduxStore = configureReduxStore();

export default app = () => (
  <Provider store={reduxStore}>
    <Root>
      <StyledApp />
    </Root>
  </Provider>
);
