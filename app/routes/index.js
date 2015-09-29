import React from 'react';
import { Route } from 'react-router';
import App from './App';
import Home from './Home'
import Create from './Create';

import * as Posts from './Posts';
import * as Comments from './Comments';

import fillStore from '../utils/fillStore';


const routes = (
  <Route component={App}>
    <Route path="/" component={Home}/>
    <Route path="/create" component={Create}/>
    <Route path="/posts" component={Posts.List}/>
    <Route path="/posts/:id" component={Posts.View}/>
    <Route path="/comments" component={Comments.List}/>
    <Route path="/comments/:id" component={Comments.View}/>
  </Route>
);

//TODO: Add the routes for Posts

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
