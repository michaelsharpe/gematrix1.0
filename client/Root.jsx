import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import configureStore from 'store';

// Pages
import App from './containers/AppContainer';
import Numerals from './containers/NumeralContainer';

const store = configureStore();

export default class Root extends Component {

  // If you use React Router, make this component
  // render <Router> with your routes. Currently,
  // only synchronous routes are hot reloaded, and
  // you will see a warning from <Router> on every reload.
  // You can ignore this warning. For details, see:
  // https://github.com/reactjs/react-router/issues/2182

  render() {
    return (
      <Provider store={store} >
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Numerals}/>
          </Route>
        </Router>
      </Provider>
    );
  }
}
