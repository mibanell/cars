import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FeaturesSelector from './FeaturesSelector';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <FeaturesSelector/>,
  document.getElementById('features-container')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
