import React from 'react';
import { Route } from 'react-router';
import App from './App';
import Home from './Home'
import Create from './Create';
// import SignupRoute from './SignupRoute';
// import LoginRoute from './LoginRoute';
// import ProfileRoute from './ProfileRoute';
// import NotFound from '../components/NotFound';
// import redirectBackAfter from '../utils/redirectBackAfter';
import fillStore from '../utils/fillStore';
// import DashboardRoute from './DashboardRoute';
// import * as Posts from './Posts';

const routes = (
  <Route component={App}>
    <Route path="/" component={Home}/>
    <Route path="/create" component={Create}/>  
  </Route>
);

function walk(routes, cb) {
  cb(routes);

  if (routes.childRoutes) {
    routes.childRoutes.forEach(route => walk(route, cb));
  }
  return routes;
}

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
