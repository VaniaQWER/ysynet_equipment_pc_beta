export const getRouter = () => ([
  {
    key: '/system',
    name: '系统管理',
    children: [
      { key: '/system/user', name: '用户管理', children: [
        { key: '/system/user/detail', name: '用户详情' }
      ] },
      { key: '/system/group', name: '组管理' },
      { key: '/system/basic', name: '基础数据' }
    ]
  },
  {
    key: '/ledger',
    name: '资产台账',
    children: [
      { key: '/ledger/archivesMgt', name: '档案管理', children: [
        { key: '/ledger/archivesMgt/ledgerReg', name: '资产登记' },
        { key: '/ledger/archivesMgt/ledgerArchives/list', name: '资产档案' }
      ] },
      { key: '/system/group', name: '调拨管理' },
      { key: '/system/basic', name: '报废管理' }
    ]
  }
])