export default {
  adminSidebar: [
    {
      type: 'category',
      label: '管理员使用指南',
      collapsed: false,
      link: {type: 'doc', id: 'index'},
      items: [
        {
          type: 'category', label: '入门与仪表盘', collapsed: true,
          items: ['getting-started/admin-role', 'getting-started/login', 'getting-started/dashboard']
        },
        {
          type: 'category', label: '用户与客户管理', collapsed: true,
          items: ['users/investors', 'users/customers']
        },
        {
          type: 'category', label: '股票与市场数据', collapsed: true,
          items: ['stocks/stock-management', 'market/market-data']
        },
        {
          type: 'category', label: '审核与风控', collapsed: true,
          items: ['reviews/records', 'reviews/audit-log']
        },
        {
          type: 'category', label: '系统管理', collapsed: true,
          items: ['settings/system-settings']
        },
        {
          type: 'category', label: '消息与支持', collapsed: true,
          items: ['communications/message-templates', 'communications/feedback']
        },
        {
          type: 'category', label: '参考资料', collapsed: true,
          items: ['reference/faq', 'reference/permissions']
        }
      ]
    }
  ]
};
