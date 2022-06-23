import { defineConfig } from 'dumi';
import { menus } from './hooks';
// tslint:disable-next-line:no-var-requires
const packages = require('../package.json');

export default defineConfig({
  title: 'react-whooks',
  mode: 'site',
  publicPath: '/react-whooks/',
  base: '/react-whooks',
  logo: '/logo.png',
  favicon: '/favicon.ico',
  outputPath: 'build',
  exportStatic: {},
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  resolve: {
    includes: ['docs', 'src'],
  },
  // extraBabelPlugins: [
  //   [
  //     'babel-plugin-import',
  //     {
  //       libraryName: 'antd',
  //       libraryDirectory: 'es',
  //       style: true,
  //     },
  //     'antd',
  //   ],
  // ],
  dynamicImport: {},
  manifest: {},
  hash: true,
  locales: [['zh-CN', '中文']],
  links: [
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/@alifd/theme-design-pro@0.6.2/dist/next-noreset.min.css',
    },
    { rel: 'stylesheet', href: '/style.css' },
  ],

  navs: [
    { title: '指南', path: '/guide' },
    { title: 'Hooks', path: '/hooks' },
    { title: 'GitHub', path: 'https://github.com/bigMeowCoding/react-whooks' },
  ],
  menus: {
    '/': [
      {
        title: '首页',
        path: 'index',
      },
    ],
    '/guide': [
      {
        title: '介绍',
        path: '/guide',
      },
    ],
    '/hooks': menus,
  },
});
