import asyncComponent from './asyncComponent';
export default { 
  path: '/operation',
  name: '资产运维',
  component: asyncComponent(() => import("../container/operation")),
  routes: [
    { 
      path: '/operation/repairMgt',
      name: '维修管理', 
      component: asyncComponent(() => import("../container/operation/repairMgt")), 
      routes: [
      { path: '/operation/repairMgt/list', name: '维修记录', component: asyncComponent(() => import("../container/operation/repairMgt/repairRecord/list"))},
      { path: '/operation/repairMgt/repairRecord/detail', name: '详情', component: asyncComponent(() => import("../container/operation/repairMgt/repairRecord/detail"))},
    ] }
  ]
}