/*
 * @Author: yuwei - 库房管理
 * @Date: 2018-06-12 14:13:54 
* @Last Modified time: 2018-06-12 14:13:54 
 */

import asyncComponent from './asyncComponent';

export default { 
  path: '/storage', 
  name: '库房管理', 
  component: asyncComponent(() => import("../container/storage")),
  routes: [
    { exact:true, path: '/storage/myDelivery', name: '我的送货单', component: asyncComponent(() => import("../container/storage/myDelivery"))},
    { exact:true, path: '/storage/myDelivery/details/:id', name: '我的送货单详情', component: asyncComponent(() => import("../container/storage/myDelivery/details"))},
    { exact:true, path: '/storage/acceptDelivery', name: '到货验收', component: asyncComponent(() => import("../container/storage/acceptDelivery"))},
    { exact:true, path: '/storage/wareHouseMgt', name: '入库管理', component: asyncComponent(() => import("../container/storage/wareHouseMgt"))},
    { exact:true, path: '/storage/wareHouseMgt/details/:id', name: '入库详情', component: asyncComponent(() => import("../container/storage/wareHouseMgt/details"))},
    { exact:true, path: '/storage/wareHouseMgt/addWareHouse', name: '新增入库', component: asyncComponent(() => import("../container/storage/wareHouseMgt/addWareHouse"))},
    
    { exact:true, path: '/storage/outMgt', name: '出库管理', component: asyncComponent(() => import("../container/storage/outMgt"))},
    { exact:true, path: '/storage/outMgt/details/:id', name: '出库详情', component: asyncComponent(() => import("../container/storage/outMgt/details"))},
    { exact:true, path: '/storage/outMgt/receive', name: '领用', component: asyncComponent(() => import("../container/storage/outMgt/receive"))},
    { exact:true, path: '/storage/outMgt/refund', name: '退库', component: asyncComponent(() => import("../container/storage/outMgt/refund"))},
   

    
  ] 
}