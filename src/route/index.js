import React from 'react';
import {
  HashRouter as Router,
  Route, Switch
} from 'react-router-dom';
import asyncComponent from './asyncComponent';
import Home from '../container/home';
import BasicLayout from '../container/common/basicLayout';
const routes = [
  {
    path: '/system',
    name: '系统管理',
    component: asyncComponent(() => import("../container/system")),
    children: [
      { path: '/system/user', name: '用户', component: asyncComponent(() => import("../container/system/user")), children: [
        { path: '/system/user/detail', name: '用户详情', component: asyncComponent(() => import("../container/system/user/detail"))},
        { path: '/system/user/add', name: '新增用户', component: asyncComponent(() => import("../container/system/user/detail/add"))},
      ] },
      { path: '/system/group', name: '组', component: asyncComponent(() => import("../container/system/group"))},
      { path: '/system/basic', name: '基础数据', component: asyncComponent(() => import("../container/system/basic"))},
    ]
  }
]
const createApp = (Component, layout, props) => <Component {...props} wrapper={layout}/>
const RouterMonitor = () => (
  <Router>
    <Switch>
      <Route exact path='/login' key='/login' render={() => <div>Login</div>}/>
      <Route exact path='/register' key='/register' render={() => <div>Register</div>}/>
      <Route path='/' render={props => (
        createApp(Home, BasicLayout, { routes })
      )}/>
    </Switch>
  </Router> 
)
export default RouterMonitor;
