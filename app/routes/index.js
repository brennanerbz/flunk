import React from 'react';
import { Route } from 'react-router';

/* Routes */
import FlunkApp from './App';
import LandingPage from './LandingPage/LandingPage';

import fillStore from '../utils/fillStore';

const routes = (
  <Route component={FlunkApp}>
    <Route path="/" component={LandingPage}/>
  </Route>
);

function walk(routes, cb) {
  cb(routes);

  if (routes.childRoutes) {
    routes.childRoutes.forEach(route => walk(route, cb));
  }
  return routes;
}

/* Parent: ../Root.js */
export default (store, client) => {
  return walk(Route.createRouteFromReactElement(routes), route => {
    route.onEnter = (nextState, transition) => {
      // const loggedIn = !!store.getState().auth.token;

      // if (route.requireAuth && !loggedIn) {
      //   transition.to(...redirectBackAfter('/login', nextState));
      // } else if (client) {
        fillStore(store, nextState, [route.component]);
      // }
    };
  });
};
