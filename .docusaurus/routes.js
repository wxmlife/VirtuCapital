import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/',
    component: ComponentCreator('/', '3bc'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', 'b14'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', '672'),
            routes: [
              {
                path: '/account-and-security',
                component: ComponentCreator('/account-and-security', 'f01'),
                exact: true,
                sidebar: "guideSidebar"
              },
              {
                path: '/account-opening',
                component: ComponentCreator('/account-opening', 'e9b'),
                exact: true,
                sidebar: "guideSidebar"
              },
              {
                path: '/app-guide',
                component: ComponentCreator('/app-guide', 'b47'),
                exact: true,
                sidebar: "guideSidebar"
              },
              {
                path: '/education/stock-selection-basics',
                component: ComponentCreator('/education/stock-selection-basics', 'c75'),
                exact: true,
                sidebar: "guideSidebar"
              },
              {
                path: '/faq',
                component: ComponentCreator('/faq', 'a25'),
                exact: true,
                sidebar: "guideSidebar"
              },
              {
                path: '/guides/assets',
                component: ComponentCreator('/guides/assets', 'b81'),
                exact: true,
                sidebar: "guideSidebar"
              },
              {
                path: '/guides/deposit-international',
                component: ComponentCreator('/guides/deposit-international', '8c2'),
                exact: true,
                sidebar: "guideSidebar"
              },
              {
                path: '/guides/feedback',
                component: ComponentCreator('/guides/feedback', '5c9'),
                exact: true,
                sidebar: "guideSidebar"
              },
              {
                path: '/guides/login',
                component: ComponentCreator('/guides/login', 'e2d'),
                exact: true,
                sidebar: "guideSidebar"
              },
              {
                path: '/guides/market',
                component: ComponentCreator('/guides/market', 'b3b'),
                exact: true,
                sidebar: "guideSidebar"
              },
              {
                path: '/guides/orders',
                component: ComponentCreator('/guides/orders', '297'),
                exact: true,
                sidebar: "guideSidebar"
              },
              {
                path: '/guides/position-transfer',
                component: ComponentCreator('/guides/position-transfer', '9a1'),
                exact: true,
                sidebar: "guideSidebar"
              },
              {
                path: '/guides/settings',
                component: ComponentCreator('/guides/settings', 'f93'),
                exact: true,
                sidebar: "guideSidebar"
              },
              {
                path: '/guides/stock-detail',
                component: ComponentCreator('/guides/stock-detail', '1c6'),
                exact: true,
                sidebar: "guideSidebar"
              },
              {
                path: '/guides/stock-transfer',
                component: ComponentCreator('/guides/stock-transfer', '19e'),
                exact: true,
                sidebar: "guideSidebar"
              },
              {
                path: '/guides/trade-stocks',
                component: ComponentCreator('/guides/trade-stocks', '75d'),
                exact: true,
                sidebar: "guideSidebar"
              },
              {
                path: '/guides/watchlist',
                component: ComponentCreator('/guides/watchlist', '764'),
                exact: true,
                sidebar: "guideSidebar"
              },
              {
                path: '/guides/withdraw-international',
                component: ComponentCreator('/guides/withdraw-international', '0ea'),
                exact: true,
                sidebar: "guideSidebar"
              },
              {
                path: '/',
                component: ComponentCreator('/', 'c48'),
                exact: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
