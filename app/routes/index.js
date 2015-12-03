import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { pushState } from 'redux-router';

/* Routes */
import FlunkApp from './App';
import Index from './Index/Index';

import LandingPage from './LandingPage/LandingPage';
import LoginPage from './LoginPage/LoginPage';

import Home from './Home/Home';
import CreateSet from './CreateSet/CreateSet';
import Upload from './Upload/Upload';
import Profile from './Profile/Profile';
import Learn from './Learn/Learn';
import SetView from './Set/Set';
import Search from './Search/Search';
import Settings from './Settings/Settings';
import ErrorPage from './ErrorPage/ErrorPage';

import fillStore from '../utils/fillStore'; 

const routes = (
  <Route component={FlunkApp}>

    <Route path="/" component={Home}/>

    <Route path="landing" component={LandingPage}/>
    <Route path="login" component={LoginPage}/>
    
    <Route path='set/:id' component={SetView}/>
    <Route path="profile/:id" component={Profile} />     

    <Route path="createset" component={CreateSet} />
    <Route path="createset/:id" component={CreateSet}/>

    <Route path="upload" component={Upload}/>

    <Route path="learn/:id" component={Learn}/>

    <Route path="search/concepts/:query" component={Search}/>
    <Route path="search/sets/:query" component={Search}/>
    <Route path="search/users/:query" component={Search}/>

    <Route path="settings" component={Settings}/>

    <Route path="*" component={ErrorPage}/>
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
      if (client) {
        fillStore(store, nextState, [route.component]);
      }
    }
  });
};
// <Route path="/">
//   <Route component={LandingPage}/>
//   <Route component={Home}/>
// </Route>