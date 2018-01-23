import React from 'react'
import {
  HashRouter as Router
} from 'react-router-dom';
import RouteWithSubRoutes from './routeWithSubRoutes';
import Home from '../container/home';
import system from './system';
import ledger from './ledger';

const routes = [
  { path: '/login', component: () => <div>Login</div> },
  { path: '/register', component: () =>  <div>register</div> },
  { path: '/', component: Home, routes: [
    system, ledger
  ]}
]


const RouterMonitor = () => (
  <Router>
    <div>
      {
        routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route}/>
        ))
      }
    </div>
  </Router>
)

export default RouterMonitor