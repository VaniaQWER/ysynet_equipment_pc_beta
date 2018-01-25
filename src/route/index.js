import React from 'react'
import {
  HashRouter as Router, Switch
} from 'react-router-dom';
import RouteWithSubRoutes from './routeWithSubRoutes';
import Home from '../container/home';
import system from './system';
import ledger from './ledger';
import operation from './operation';

const routes = [
  { path: '/login', exact: true, component: () => <div>Login</div> },
  { path: '/register', exact: true, component: () =>  <div>register</div> },
  { path: '/', component: Home, routes: [
    system, ledger, operation
  ]}
]


const RouterMonitor = () => (
  <Router>
    <Switch>
      {
        routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route}/>
        ))
      }
    </Switch>
  </Router>
)

export default RouterMonitor