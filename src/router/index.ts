/**
 *
 * @authors liwb (lwbhtml@gmail.com)
 * @date    2019/01/12
 * @description 定义路由模块
 */

import Vue, { AsyncComponent } from 'vue';
import Router from 'vue-router';
import Layout from '@/layout/index.vue';

/* Router Modules */
import componentsRouter from './modules/components';
import chartsRouter from './modules/charts';
import tableRouter from './modules/table';
import nestedRouter from './modules/nested';

Vue.use(Router);

const loadView = (view: string): AsyncComponent => (): any => import(`@views/${view}/index.vue`);


/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
 **/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: loadView('redirect')
      }
    ]
  },
  {
    path: '/login',
    component: loadView('login'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: loadView('dashboard'),
        name: 'Dashboard',
        meta: {title: 'dashboard', icon: 'dashboard', noCache: true}
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [
      {
        path: 'index',
        component: loadView('documentation'),
        name: 'Documentation',
        meta: {title: 'documentation', icon: 'documentation', affix: true}
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: loadView('guide'),
        name: 'Guide',
        meta: {title: 'guide', icon: 'guide', noCache: true}
      }
    ]
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401.vue'),
    hidden: true
  }
];

export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page.vue'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive.vue'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role.vue'),
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: loadView('svgIcons'),
        name: 'Icons',
        meta: {title: 'icons', icon: 'icon', noCache: true}
      }
    ]
  },
  /** When your routing table is too long, you can split it into small modules**/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,
  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create.vue'),
        name: 'CreateArticle',
        meta: {title: 'createArticle', icon: 'edit'}
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit.vue'),
        name: 'EditArticle',
        meta: {title: 'editArticle', noCache: true},
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list.vue'),
        name: 'ArticleList',
        meta: {title: 'articleList', icon: 'list'}
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/errorPage/401.vue'),
        name: 'Page401',
        meta: {title: 'page401', noCache: true}
      },
      {
        path: '404',
        component: () => import('@/views/errorPage/404.vue'),
        name: 'Page404',
        meta: {title: 'page404', noCache: true}
      }
    ]
  },
  {
    path: '/error-log',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'log',
        component: loadView('errorLog'),
        name: 'ErrorLog',
        meta: {title: 'errorLog', icon: 'bug'}
      }
    ]
  },
  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/exportExcel.vue'),
        name: 'ExportExcel',
        meta: {title: 'exportExcel'}
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/selectExcel.vue'),
        name: 'SelectExcel',
        meta: {title: 'selectExcel'}
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/mergeHeader.vue'),
        name: 'MergeHeader',
        meta: {title: 'mergeHeader'}
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/uploadExcel.vue'),
        name: 'UploadExcel',
        meta: {title: 'uploadExcel'}
      }
    ]
  },
  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: loadView('tab'),
        name: 'Tab',
        meta: {title: 'tab', icon: 'tab'}
      }
    ]
  },
  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: loadView('pdf'),
        name: 'PDF',
        meta: {title: 'pdf', icon: 'pdf'}
      }
    ]
  },
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download.vue'),
    hidden: true
  },
  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    meta: {title: 'zip', icon: 'zip'},
    children: [
      {
        path: 'download',
        component: loadView('zip'),
        name: 'ExportZip',
        meta: {title: 'exportZip'}
      }
    ]
  },
  {
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: loadView('theme'),
        name: 'Theme',
        meta: {title: 'theme', icon: 'theme'}
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: loadView('clipboard'),
        name: 'ClipboardDemo',
        meta: {title: 'clipboardDemo', icon: 'clipboard'}
      }
    ]
  },
  {
    path: '/i18n',
    component: Layout,
    children: [
      {
        path: 'index',
        component: loadView('i18n-demo'),
        name: 'I18n',
        meta: {title: 'i18n', icon: 'international'}
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: {title: 'externalLink', icon: 'link'}
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
];

const createRouter: any = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({x: 0, y: 0}),
  routes: constantRouterMap
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
