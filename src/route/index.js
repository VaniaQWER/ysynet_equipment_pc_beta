import React from 'react'
import {
  HashRouter as Router, Switch
} from 'react-router-dom';
import RouteWithSubRoutes from './routeWithSubRoutes';
import Home from '../container/home';
import Login from '../container/login';
import system from './system';
import ledger from './ledger';
import operation from './operation';
import dashboard from './dashboard';
import upkeep from './upkeep';
import basicdata from'./basicdata';
import transfer from './transfer';
import inventory from './inventory';
import scrap from './scrap';
const routes = [
  { path: '/login', exact: true, component: Login },
  { path: '/register', exact: true, component: () =>  <div>register</div> },
  { path: '/', component: Home, routes: [
    system, ledger, operation, dashboard , upkeep ,basicdata, transfer , inventory, scrap
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