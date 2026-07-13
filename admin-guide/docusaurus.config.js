import {themes as prismThemes} from 'prism-react-renderer';

export default {
  title: 'Virtu Capital 管理员手册',
  tagline: '仅供获授权的管理员、运营与风控人员使用',
  favicon: 'img/logo.png',
  url: 'https://admin-help.virtucapital.com',
  baseUrl: '/',
  organizationName: 'wxmlife',
  projectName: 'virtu-capital-admin-guide',
  onBrokenLinks: 'throw',
  markdown: {hooks: {onBrokenMarkdownLinks: 'throw'}},
  i18n: {defaultLocale: 'zh-Hans', locales: ['zh-Hans']},
  presets: [
    ['classic', {
      docs: {
        routeBasePath: '/',
        sidebarPath: './sidebars.js',
        breadcrumbs: true,
        showLastUpdateTime: false,
        editUrl: undefined
      },
      blog: false,
      theme: {customCss: './src/css/custom.css'}
    }]
  ],
  themeConfig: {
    metadata: [
      {name: 'description', content: 'Virtu Capital 管理员端操作指南'},
      {name: 'robots', content: 'noindex, nofollow, noarchive'}
    ],
    navbar: {
      title: 'Virtu Capital 管理员手册',
      logo: {alt: 'Virtu Capital', src: 'img/logo.png'},
      items: [
        {to: '/', label: '管理帮助中心', position: 'left'},
        {to: '/getting-started/login', label: '开始使用', position: 'right', className: 'navbar-start'}
      ]
    },
    footer: {
      style: 'light',
      copyright: `内部资料 · Copyright © ${new Date().getFullYear()} Virtu Capital.`
    },
    docs: {sidebar: {hideable: true, autoCollapseCategories: true}},
    colorMode: {defaultMode: 'light', disableSwitch: false, respectPrefersColorScheme: true},
    prism: {theme: prismThemes.github, darkTheme: prismThemes.dracula}
  }
};
