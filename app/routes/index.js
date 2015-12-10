import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { pushState } from 'redux-router';

/* Routes */
import FlunkApp from './App';
import Index from './Index/Index';

import LandingPage from './LandingPage/LandingPage';
import LoginPage from './LoginPage/LoginPage';
import SignUp from './SignUp/SignUp';

import Home from './Home/Home';
import CreateSet from './CreateSet/CreateSet';
import Import from './Import/Import';

import Profile from './Profile/Profile';
import ProfileCreated from '../components/Profile/ProfileCreated/ProfileCreated';
import ProfileStudied from '../components/Profile/ProfileStudied/ProfileStudied';

import Learn from './Learn/Learn';

import SetView from './Set/Set';
import Terms from './Set/Terms';
import Info from './Set/Info';

import Search from './Search/Search';
import Settings from './Settings/Settings';
import ErrorPage from './ErrorPage/ErrorPage';

import fillStore from '../utils/fillStore'; 


const routes = (
    <Route component={FlunkApp}>
        <Route path="/" sharedRoot/>

        <Route path="login" component={LoginPage}/>
        <Route path="signup" component={SignUp}/>

        <Route path='set/:id' component={SetView}>
            <IndexRoute component={Terms}/>
            <Route path="info" component={Info}/>
        </Route>

        <Route path="profile/:id" component={Profile} >
            <IndexRoute component={ProfileCreated}/>
            <Route path="studied" component={ProfileStudied}/>
        </Route>

        <Route path="createset" component={CreateSet} />
        <Route path="createset/:id" component={CreateSet}/>

        <Route path="import" component={Import}/>

        <Route path="learn/:id" component={Learn}/>

        <Route path="search/concepts/:query" component={Search}/>
        <Route path="search/sets/:query" component={Search}/>
        <Route path="search/users/:query" component={Search}/>

        <Route path="settings" component={Settings} requireAuth/>

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
        route.onEnter = (nextState, replaceState) => {
            const loggedIn = store.getState().user.logged_in;
            if(route.sharedRoot && !loggedIn) {
                route.component = LandingPage
            } else if (route.sharedRoot && loggedIn) {
                route.component = Home
            }
            if (route.requireAuth && !loggedIn) {
                replaceState(nextState, '/login');
            }
            if (client) {
                fillStore(store, nextState, [route.component]);
            }
        }
    });
};
