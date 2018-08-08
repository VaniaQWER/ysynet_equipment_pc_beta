/*
 * @Author: xuhao - 借用管理 -borrowMgt
 * @Date: 2018-08-08 10:49:11 
* @Last Modified time: 2018-08-08 10:49:11
 */
import asyncComponent from './asyncComponent';

export default { 
  path: '/borrowMgt', 
  name: '借用管理', 
  component: asyncComponent(() => import("../container/approval")),
  routes: [
    { exact:true, path: '/borrowMgt/subBorrowMgt', name: '借用管理', component: asyncComponent(() => import("../container/borrowMgt/subBorrowMgt"))},
    { exact:true, path: '/borrowMgt/subBorrowMgt/loan', name: '新建借出', component: asyncComponent(() => import("../container/borrowMgt/subBorrowMgt/loan"))},
  ] 
}