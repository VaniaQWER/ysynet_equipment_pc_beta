import asyncComponent from './asyncComponent';

export default { 
  path: '/basicdata', 
  name: '基础数据', 
  component: asyncComponent(() => import("../container/basicdata")),
  routes: [
      { exact: true, hasBread: true, path: '/basicdata/maintainTmp', name: '保养模板', component: asyncComponent(() => import("../container/basicdata/maintainTmp/maintainTmp"))},
      { exact: true, hasBread: true, path: '/basicdata/suppliesClassify', name: '物资分类', component: asyncComponent(() => import("../container/basicdata/suppliesClassify"))},  
      { exact: true, hasBread: true, path: '/basicdata/financeClassify', name: '财政分类', component: asyncComponent(() => import("../container/basicdata/financeClassify"))},  
      { exact: true, hasBread: true, path: '/basicdata/depreciateClassify', name: '折旧分类', component: asyncComponent(() => import("../container/basicdata/depreciateClassify"))},  
    ]
}