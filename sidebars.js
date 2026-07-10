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
            'guides/deposit-international',
            'guides/withdraw-international',
            'guides/position-transfer',
            'guides/stock-transfer'
          ]
        },
        {
          type: 'category',
          label: '股票交易',
          collapsed: true,
          items: ['guides/watchlist', 'guides/stock-detail', 'guides/trade-stocks', 'guides/orders']
        },
        {
          type: 'category',
          label: '市场探索',
          collapsed: true,
          items: ['guides/market']
        },
        {
          type: 'category',
          label: '投资知识',
          collapsed: true,
          items: ['education/stock-selection-basics']
        },
        {
          type: 'category',
          label: '账户与支持',
          collapsed: true,
          items: ['account-and-security', 'guides/settings', 'guides/feedback']
        }
      ]
    },
    'faq'
  ]
};
