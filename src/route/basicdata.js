import asyncComponent from './asyncComponent';

export default { 
  path: '/basicdata', 
  name: '基础数据', 
  component: asyncComponent(() => import("../container/basicdata/")),
  routes: [
      { exact: true, hasBread: true, path: '/basicdata/maintainTmp', name: '保养模板', component: asyncComponent(() => import("../container/basicdata/maintainTmp/maintainTmp"))},
      
    ]
}