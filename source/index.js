import React, { Component } from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App.js';

const rootEl = document.getElementById('root');

const _render = (Component) =>
  render(
    <AppContainer>
      <App />
    </AppContainer>,
    rootEl
  );
  
_render(App);

if (module.hot) {
	module.hot.accept('./App.js', () => _render(App));	
} 
