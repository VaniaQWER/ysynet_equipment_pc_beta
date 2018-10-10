import asyncComponent from './asyncComponent';

export default { 
  path: '/upkeep', 
  name: '保养管理', 
  component: asyncComponent(() => import("../container/upkeep")),
  routes: [
    { exact:true, path: '/upkeep/addUpKeep', name: '保养登记', component: asyncComponent(() => import("../container/upkeep/addUpKeep"))},
    { exact:true, path: '/upkeep/upkeeplist', name: '保养工单', component: asyncComponent(() => import("../container/upkeep/upKeepList"))},
    { exact:true, path: '/upkeep/upkeeplist/details/:id', name: '保养工单详情', component: asyncComponent(() => import("../container/upkeep/upKeepList/details"))},
    { exact:true, path: '/upkeep/upkeeplist/finish/:id', name: '保养工单修改', component: asyncComponent(() => import("../container/upkeep/upKeepList/finish"))},
    { exact:true, path: '/upkeep/UpKeepDetail/details/:id', name: '保养列表详情', component: asyncComponent(() => import("../container/upkeep/upKeepDetail/details"))},
    { exact:true, path: '/upkeep/UpKeepDetail/finish/:id', name: '保养列表修改', component: asyncComponent(() => import("../container/upkeep/upKeepDetail/finish"))},
    { exact:true, path: '/upkeep/plan', name: '保养计划', component: asyncComponent(() => import("../container/upkeep/plan")) },
    { exact:true, path: '/upkeep/planDetail/:id', name: '保养计划详情', component: asyncComponent(() => import("../container/upkeep/plan/details")) },
    { exact:true, path: '/upkeep/planEdit/:id', name: '保养计划编辑', component: asyncComponent(() => import("../container/upkeep/plan/edit")) },
    { exact:true, path: '/upkeep/newplan', name: '新建计划', component: asyncComponent(() => import("../container/upkeep/newPlan")) },
    { exact:true, path: '/upkeep/upKeepCount', name: '保养统计', component: asyncComponent(() => import("../container/upkeep/upKeepCount"))},
    
  ] 
} 