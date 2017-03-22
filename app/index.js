import React from 'react';
import { render } from 'react-dom';
import './css/app.global.css';
import App from './containers/App';

if (process.env.NODE_ENV !== 'production') {
    const {whyDidYouUpdate} = require('why-did-you-update');
    whyDidYouUpdate(React);
}

render(
    <App />,
  document.getElementById('root')
);
