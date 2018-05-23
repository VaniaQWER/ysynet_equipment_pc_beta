import asyncComponent from './asyncComponent';

export default { 
  path: '/ledger', 
  name: '档案管理', 
  component: asyncComponent(() => import("../container/ledger/")),
  routes: [
      { exact: true, hasBread: true, path: '/ledger/ledgerReg', name: '资产登记', component: asyncComponent(() => import("../container/ledger/ledgerReg"))},
      { exact: true, hasBread: true, path: '/ledger/ledgerArchives', name: '资产档案', component: asyncComponent(() => import("../container/ledger/ledgerArchives/list"))},
      { exact: true, hasBread: true, path: '/ledger/ledgerArchives/:id', name: '详情', component: asyncComponent(() => import("../container/ledger/ledgerArchives/detail"))},
      { exact: true, hasBread: true, path: '/ledger/benefitAnalysis/:id', name: '效益分析', component: asyncComponent(() => import("../container/ledger/ledgerArchives/benefitAnalysis"))},
      { exact: true, hasBread: true, path: '/ledger/ledgerArchives/add/:id', name: '新增档案', component: asyncComponent(() => import("../container/ledger/ledgerArchives/add"))},
  ]
}