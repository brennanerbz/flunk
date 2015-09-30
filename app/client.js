/* eslint-env browser */
/* global process */

import 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createHashHistory from 'history/lib/createHashHistory';

import createHistory from 'history';

import Root from './Root';

const history = (process.env.NODE_ENV === 'production')
  ? createBrowserHistory()
  : createHashHistory()

ReactDOM.render(
	<Root />,
	document.getElementById('app')
);

/* Child: ./Root.js */