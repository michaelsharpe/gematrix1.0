import thunk from 'redux-thunk';

import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';

export default function (initialState) {
  // ======================================================
  // Middleware
  // ======================================================

  const middleware = [thunk];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];

  if (process.env.NODE_ENV !== 'production') {
    const devToolsExtension = window.devToolsExtension;

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );

  return store;
}
