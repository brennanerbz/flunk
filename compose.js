import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from '../reducers/index';

let reducer = combineReducers(reducers);
let middleware = [thunk];

let finalCreateStore;

// In production, we want to use just the middleware.
// In development, we want to use some store enhancers from redux-devtools.
// UglifyJS will eliminate the dead code depending on the build environment.

if (process.env.NODE_ENV === 'production') {
  finalCreateStore = applyMiddleware(...middleware)(createStore);
} else {
  finalCreateStore = compose(
    applyMiddleware(...middleware),
    require('redux-devtools').devTools(),
    require('redux-devtools').persistState(
      window.location.href.match(/[?&]debug_session=([^&]+)\b/)
    )
  )(createStore);

  // Same code without the `compose` helper:
  //
  // finalCreateStore = applyMiddleware(middleware)(
  //   require('redux-devtools').devTools()(
  //     require('redux-devtools').persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))()
  //   )
  // )(createStore);
}

let store = finalCreateStore(reducer);