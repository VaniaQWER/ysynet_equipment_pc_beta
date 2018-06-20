/*
 * @Author: yuwei -deptwork.js - 科室业务路由
 * @Date: 2018-06-08 15:01:20 
* @Last Modified time: 2018-06-08 15:01:20 
 */
import asyncComponent from './asyncComponent';

export default { 
  path: '/deptwork', 
  name: '科室业务', 
  component: asyncComponent(() => import("../container/deptWork")),
  routes: [
    { exact:true, path: '/deptWork/myProfile', name: '我的档案', component: asyncComponent(() => import("../container/deptWork/myProfile"))},
    { exact:true, path: '/deptWork/myProfile/details/:id', name: '我的档案详情', component: asyncComponent(() => import("../container/deptWork/myProfile/details"))},
    { exact:true, path: '/deptWork/myProfile/content/:id', name: '效益分析', component: asyncComponent(() => import("../container/deptWork/myProfile/benefitAnalysis"))},
  ] 
}