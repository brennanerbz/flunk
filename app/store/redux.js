import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import { reduxReactRouter, 
		 routerStateReducer, 
		 ReduxRouter } from 'redux-router';

import createHistory from 'history/lib/createBrowserHistory';
import routes from '../routes';
import reducers from '../reducers';

let middleware = [thunk];
middleware.push(createLogger({
	collapsed: true
}))

var store = compose(	
	applyMiddleware(...middleware),
	reduxReactRouter({
		createHistory
	})
)(createStore)(reducers);

export default store;

// let finalCreateStore;

// export function createRedux(state) {
// 	const finalStore = compose(
// 		applyMiddleware(...middleware),
// 		reduxReactRouter({
// 			createHistory
// 		})(createStore)
// 	)

// 	const store = finalStore(reducers, state)

// 	if(module.hot) {
// 	  const nextReducer = require('../reducers');
// 	  module.hot.accept('../reducers',
// 	  () => { store.replaceReducer(nextReducer); });
// 	}

// 	return store;
// }



// export function createRedux(initialState) {
// 	const middleware = [thunk];
// 	if (process.env.NODE_ENV !== 'production') {
// 		middleware.push(createLogger({
// 			collapsed: true,
// 			predicate: (getState, action) => !(action.type === ROUTER_STATE_CHANGE)
// 		}))
// 	}

// 	const finalStore = applyMiddleware(...middleware)(createStore);
// 	const store = finalStore(reducer, initialState);

// 	if (module.hot) {
// 	  const nextReducer = require('../reducers');
// 	  module.hot.accept('../reducers',
// 	  () => { store.replaceReducer(nextReducer); });
// 	}

// 	return store;
// }