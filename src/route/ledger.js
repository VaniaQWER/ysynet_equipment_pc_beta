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
        { exact: true, hasBread: true, path: '/ledger/archivesMgt/ledgerReg', name: '资产登记', component: asyncComponent(() => import("../container/ledger/archivesMgt/ledgerReg"))},
        { exact: true, hasBread: true, path: '/ledger/archivesMgt/ledgerArchives', name: '资产档案', component: asyncComponent(() => import("../container/ledger/archivesMgt/ledgerArchives/list"))},
        { exact: true, hasBread: true, path: '/ledger/archivesMgt/ledgerArchives/:id', name: '详情', component: asyncComponent(() => import("../container/ledger/archivesMgt/ledgerArchives/detail"))},
      ]
    }
  ]
}