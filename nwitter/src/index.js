import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import RootContext from 'contexts';
// eslint-disable-next-line no-unused-vars
import firebaseApp from 'models/firebaseApp';

ReactDOM.render(
  <RootContext>
    <App />
  </RootContext>,
  document.getElementById('root'),
);
