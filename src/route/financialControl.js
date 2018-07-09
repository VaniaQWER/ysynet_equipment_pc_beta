/*
 * @Author: yuwei  - 财务管理 financialControl
 * @Date: 2018-07-05 14:00:44 
* @Last Modified time: 2018-07-05 14:00:44 
 */

import asyncComponent from './asyncComponent';

export default { 
  path: '/financialControl', 
  name: '财务管理', 
  component: asyncComponent(() => import("../container/financialControl")),
  routes: [
    { exact:true, path: '/financialControl/auditInvoice', name: '发票审核', component: asyncComponent(() => import("../container/financialControl/auditInvoice"))},
    { exact:true, path: '/financialControl/auditInvoice/details/:id', name: '发票审核详情', component: asyncComponent(() => import("../container/financialControl/auditInvoice/details"))},
  ] 
}