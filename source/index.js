import React, { Component } from 'react';
import { render } from 'react-dom';

import App from './App.js';

const rootEl = document.getElementById('root');

const _render = (Component) =>
  render(
    <App />,
    rootEl
  );
  
_render(App);

if (module.hot) {
	module.hot.accept('./App.js', () => _render(App));	
} 
