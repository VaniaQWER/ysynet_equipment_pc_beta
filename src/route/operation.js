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
      { exact:true, path: '/operation/repairMgt/repairRecord', name: '维修记录', component: asyncComponent(() => import("../container/operation/repairMgt/repairRecord/list"))},
      { exact:true, path: '/operation/repairMgt/repairRecord/:id', name: '详情', component: asyncComponent(() => import("../container/operation/repairMgt/repairRecord/detail"))},
    ] }
  ]
}