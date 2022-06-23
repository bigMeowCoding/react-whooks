import { menus } from './hooks';
import { defineConfig } from 'dumi';
// tslint:disable-next-line:no-var-requires
const packages = require('../package.json');

export default defineConfig({
  title: 'react-whooks',
  mode: 'site',
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
    { title: 'GitLab', path: 'https://gitlab.com/2338/hooks' },
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
  // more config: https://d.umijs.org/config
  scripts: [
    'https://s4.cnzz.com/z_stat.php?id=1278992092&web_id=1278992092',
    `
  const insertVersion = function(){
    const dom = document.createElement('span');
    dom.id = 'logo-version';
    dom.innerHTML = '${packages.version}';
    const logo = document.querySelector('.__dumi-default-navbar-logo');
    if(logo){
      logo.parentNode.insertBefore(dom, logo.nextSibling);
    }else{
      setTimeout(()=>{
        insertVersion();
      }, 1000)
    }
  }
  insertVersion();
  `,
  ],
});
