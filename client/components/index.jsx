import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { BrowserRouter, Route } from 'react-router-dom';

ReactDOM.render((
  <BrowserRouter>
    <Route exact path='/restaurant/:restaurantId' component={App} />
  </BrowserRouter>
  ), document.getElementById('app')
);