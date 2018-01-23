import asyncComponent from './asyncComponent';

export default { 
  path: '/ledger', 
  name: '资产台账', 
  component: asyncComponent(() => import("../container/ledger")),
  routes: [
    { 
      path: '/ledger/archivesMgt', 
      name: '档案管理', 
      component: asyncComponent(() => import("../container/ledger/archivesMgt")), 
      routes: [
        { path: '/ledger/archivesMgt/ledgerReg', name: '资产登记', component: asyncComponent(() => import("../container/ledger/archivesMgt/ledgerReg"))},
        { path: '/ledger/archivesMgt/list', name: '资产档案', component: asyncComponent(() => import("../container/ledger/archivesMgt/ledgerArchives/list"))},
        { path: '/ledger/archivesMgt/ledgerArchives', name: '详情', component: asyncComponent(() => import("../container/ledger/archivesMgt/ledgerArchives/detail"))},
      ]
    }
  ]
}