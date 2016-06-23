import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const rootEl = document.getElementById('root');
ReactDOM.render(
  <AppContainer>
    <Root/>
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./Root', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextRoot = require('./Root').default;
    ReactDOM.render(
      <AppContainer>
         <NextRoot />
      </AppContainer>,
      rootEl
    );
  });
}
