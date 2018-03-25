import 'normalize.css/normalize.css';
// import 'bootstrap/dist/css/bootstrap.css';
// App css
import 'styles/App.scss';

import 'core-js/fn/object/assign';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

import Root from './Root';

import { configureReduxStore } from './stores/configureStore';


const reduxStore = configureReduxStore();

// Render the main component into the dom
ReactDOM.render(
  <Provider store={reduxStore}>
    <Root history={browserHistory} />
  </Provider>,
  document.getElementById('app')
);
