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
      { path: '/system/user', name: '用户管理', component: asyncComponent(() => import("../container/system/user")), children: [
        { path: '/system/user/add', name: '添加', component: asyncComponent(() => import("../container/system/user/add"))},
        { path: '/system/user/edit', name: '编辑', component: asyncComponent(() => import("../container/system/user/edit"))},
        { path: '/system/user/detail', name: '编辑', component: asyncComponent(() => import("../container/system/user/detail"))},
      ] },
      { path: '/system/group', name: '组管理', component: asyncComponent(() => import("../container/system/group"))}
    ]
  },
  {
    path: '/ledger',
    name: '资产台账',
    component: asyncComponent(() => import("../container/ledger")),
    children: [
      { path: '/ledger/archivesMgt', name: '档案管理', component: asyncComponent(() => import("../container/ledger/archivesMgt")), children: [
        { path: '/ledger/archivesMgt/ledgerReg', name: '资产登记', component: asyncComponent(() => import("../container/ledger/archivesMgt/ledgerReg"))},
        { path: '/ledger/archivesMgt/list', name: '资产档案', component: asyncComponent(() => import("../container/ledger/archivesMgt/ledgerArchives/list"))},
        { path: '/ledger/archivesMgt/ledgerArchives/detail', name: '详情', component: asyncComponent(() => import("../container/ledger/archivesMgt/ledgerArchives/detail"))},
      ] }
    ]
  },
  {
    path: '/operation',
    name: '资产运维',
    component: asyncComponent(() => import("../container/operation")),
    children: [
      { path: '/operation/repairMgt', name: '维修管理', component: asyncComponent(() => import("../container/operation/repairMgt")), children: [
        { path: '/operation/repairMgt/list', name: '维修记录', component: asyncComponent(() => import("../container/operation/repairMgt/repairRecord/list"))},
        { path: '/operation/repairMgt/repairRecord/detail', name: '详情', component: asyncComponent(() => import("../container/operation/repairMgt/repairRecord/detail"))},
      ] }
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
