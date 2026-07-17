export default {
  guideSidebar: [
    {
      type: 'category',
      label: 'APP 新手指南',
      collapsed: false,
      link: {
        type: 'doc',
        id: 'app-guide'
      },
      items: [
        {
          type: 'category',
          label: '账户开始',
          collapsed: true,
          items: ['guides/login', 'account-opening']
        },
        {
          type: 'category',
          label: '资产管理',
          collapsed: true,
          items: [
            'guides/assets',
            'guides/cash-flow',
            'guides/deposit-international',
            'guides/withdraw-international',
            'guides/position-transfer',
            'guides/stock-transfer',
            'guides/statements'
          ]
        },
        {
          type: 'category',
          label: '股票交易',
          collapsed: true,
          items: ['guides/watchlist', 'guides/market', 'guides/stock-detail', 'guides/trade-stocks', 'guides/orders']
        },
        {
          type: 'category',
          label: '投资知识',
          collapsed: true,
          items: ['education/stock-selection-basics']
        },
        {
          type: 'category',
          label: '账户支持',
          collapsed: true,
          items: ['guides/profile', 'guides/messages', 'account-and-security', 'guides/settings', 'guides/feedback']
        }
      ]
    },
    'faq'
  ]
};
