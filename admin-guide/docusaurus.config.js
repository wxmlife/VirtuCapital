import {themes as prismThemes} from 'prism-react-renderer';

const isGitHubPages = process.env.DEPLOY_TARGET === 'github-pages';

export default {
  title: 'Virtu Capital 管理员手册',
  tagline: '仅供获授权的管理员、运营与风控人员使用',
  favicon: 'img/logo.png',
  url: isGitHubPages ? 'https://wxmlife.github.io' : 'https://admin-help.virtucapital.com',
  baseUrl: isGitHubPages ? '/VirtuCapital/admin/' : '/',
  organizationName: 'wxmlife',
  projectName: 'virtu-capital-admin-guide',
  onBrokenLinks: 'throw',
  markdown: {hooks: {onBrokenMarkdownLinks: 'throw'}},
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'zh-Hant', 'en'],
    localeConfigs: {
      'zh-Hans': {label: '简体中文'},
      'zh-Hant': {label: '繁體中文'},
      en: {label: 'English'}
    }
  },
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
        {to: '/getting-started/login', label: '开始使用', position: 'right', className: 'navbar-start'},
        {type: 'localeDropdown', position: 'right'}
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
