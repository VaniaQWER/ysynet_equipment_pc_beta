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
      { exact:true, path: '/operation/repairMgt/repairReg', name: '报修登记', component: asyncComponent(() => import("../container/operation/repairMgt/repairReg"))},
      { exact:true, path: '/operation/repairMgt/repairRegList', name: '报修记录', component: asyncComponent(() => import("../container/operation/repairMgt/repairReg/list"))},
      { exact:true, path: '/operation/repairMgt/repairRegList/detail/:id', name: '详情', component: asyncComponent(() => import("../container/operation/repairMgt/repairReg/detail"))},
      { exact:true, path: '/operation/repairMgt/repairRegList/edit/:id', name: '编辑', component: asyncComponent(() => import("../container/operation/repairMgt/repairReg/edit"))},
      { exact:true, path: '/operation/repairMgt/myRepairList', name: '我的指派', component: asyncComponent(() => import("../container/operation/repairMgt/myRepairList/list"))},
      { exact:true, path: '/operation/repairMgt/myRepairList/detail/:id', name: '详情', component: asyncComponent(() => import("../container/operation/repairMgt/myRepairList/detail"))},
      { exact:true, path: '/operation/repairMgt/myRepairList/order/:id', name: '指派', component: asyncComponent(() => import("../container/operation/repairMgt/myRepairList/order"))},
      { exact:true, path: '/operation/repairMgt/myServiceList', name: '我的维修单', component: asyncComponent(() => import("../container/operation/repairMgt/myServiceList/list"))},
      { exact:true, path: '/operation/repairMgt/myServiceList/orderTaking/:id', name: '接修', component: asyncComponent(() => import("../container/operation/repairMgt/myServiceList/orderTaking"))},
      { exact:true, path: '/operation/repairMgt/myServiceList/complete/:id', name: '完成', component: asyncComponent(() => import("../container/operation/repairMgt/myServiceList/complete"))},
      { exact:true, path: '/operation/repairMgt/myServiceList/detail/:id', name: '详情', component: asyncComponent(() => import("../container/operation/repairMgt/myServiceList/detail"))},
      { exact:true, path: '/operation/repairMgt/myCheckList', name: '我的验收单', component: asyncComponent(() => import("../container/operation/repairMgt/myCheckList/list"))},
      { exact:true, path: '/operation/repairMgt/myCheckList/check/:id', name: '验收', component: asyncComponent(() => import("../container/operation/repairMgt/myCheckList/check"))},
      { exact:true, path: '/operation/repairMgt/myCheckList/detail/:id', name: '详情', component: asyncComponent(() => import("../container/operation/repairMgt/myCheckList/detail"))},
      { exact:true, path: '/operation/repairMgt/repairRecord', name: '维修记录', component: asyncComponent(() => import("../container/operation/repairMgt/repairRecord/list"))},
      { exact:true, path: '/operation/repairMgt/repairRecord/:id', name: '详情', component: asyncComponent(() => import("../container/operation/repairMgt/repairRecord/detail"))},
    ] },
    {
      path: '/operation/upkeep',
      name: '保养手续', 
      component: asyncComponent(() => import("../container/operation/upkeep")), 
      routes: [
        { exact:true, path: '/operation/upkeep/addUpKeep', name: '保养登记', component: asyncComponent(() => import("../container/operation/upkeep/addUpKeep"))},
        { exact:true, path: '/operation/upkeep/upkeeplist', name: '保养列表', component: asyncComponent(() => import("../container/operation/upkeep/upkeeplist"))},
        { exact:true, path: '/operation/upkeep/UpKeepDetail/details/:id', name: '保养列表详情', component: asyncComponent(() => import("../container/operation/upkeep/UpKeepDetail/details"))},
        { exact:true, path: '/operation/upkeep/UpKeepDetail/finish/:id', name: '保养列表修改', component: asyncComponent(() => import("../container/operation/upkeep/UpKeepDetail/finish"))},
      ]
    }
  ]
}