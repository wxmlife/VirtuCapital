import {themes as prismThemes} from 'prism-react-renderer';

const isGitHubPages = process.env.DEPLOY_TARGET === 'github-pages';

export default {
  title: 'Virtu Capital 帮助中心',
  tagline: '面向投资者的产品使用指南',
  favicon: 'img/logoVC.png',
  url: isGitHubPages ? 'https://wxmlife.github.io' : 'https://help.virtucapital.com',
  baseUrl: isGitHubPages ? '/VirtuCapital/' : '/',
  organizationName: 'wxmlife',
  projectName: 'virtu-capital-help-center',
  onBrokenLinks: 'throw',
  markdown: {hooks: {onBrokenMarkdownLinks: 'warn'}},
  clientModules: ['./src/chunk-load-recovery.mjs'],
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
        exclude: ['**/*.md.example', '**/superpowers/**'],
        breadcrumbs: true,
        // 当前素材仓库尚无 Git 提交记录；正式接入版本库后可改为 true。
        showLastUpdateTime: false,
        editUrl: undefined
      },
      blog: false,
      theme: {customCss: './src/css/custom.css'}
    }]
  ],
  plugins: [
    ['@docusaurus/plugin-client-redirects', {
      createRedirects(existingPath) {
        if (existingPath.startsWith('/app-guide/guides/')) {
          return [existingPath.replace('/app-guide', '')];
        }
        if (existingPath.startsWith('/app-guide/education/')) {
          return [existingPath.replace('/app-guide', '')];
        }
        if (existingPath === '/app-guide/account-opening') {
          return ['/account-opening'];
        }
        if (existingPath === '/app-guide/account-and-security') {
          return ['/account-and-security'];
        }
        return undefined;
      }
    }]
  ],
  themeConfig: {
    image: 'img/social-card.svg',
    metadata: [
      {name: 'description', content: 'Virtu Capital APP 使用指南与帮助中心'}
    ],
    navbar: {
      title: 'Virtu Capital',
      logo: {alt: 'Virtu Capital', src: 'img/logoVC.png'},
      items: [
        {to: '/', label: '帮助中心', position: 'left'},
        {to: '/app-guide', label: 'APP 新手指南', position: 'left'},
        {to: '/app-guide', label: '开始使用', position: 'right', className: 'navbar-download'},
        {type: 'localeDropdown', position: 'right'},
        {type: 'search', position: 'right'}
      ]
    },
    footer: {
      style: 'light',
      links: [
        {title: '产品', items: [{label: 'APP 新手指南', to: '/app-guide'}, {label: '功能总览', to: '/'}]},
        {title: '支持', items: [{label: '帮助中心', to: '/'}, {label: '意见反馈', to: '/app-guide/guides/feedback'}, {label: '常见问题', to: '/faq'}]},
        {title: '合规', items: [{label: '账户与安全', to: '/app-guide/account-and-security'}, {label: '开户', to: '/app-guide/account-opening'}]}
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Virtu Capital. All rights reserved.`
    },
    docs: {sidebar: {hideable: true, autoCollapseCategories: true}},
    colorMode: {defaultMode: 'light', disableSwitch: false, respectPrefersColorScheme: true},
    prism: {theme: prismThemes.github, darkTheme: prismThemes.dracula}
  }
};
