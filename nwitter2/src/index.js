import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import RootContext from 'contexts';

ReactDOM.render(
    <RootContext>
        <App />
    </RootContext>,
    document.getElementById('root'),
);
