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
  }
])