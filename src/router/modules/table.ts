/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout/index.vue';

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: 'Table',
    icon: 'table'
  },
  children: [
    {
      path: 'dynamic-table',
      component: () => import('@/views/table/dynamicTable/index.vue'),
      name: 'DynamicTable',
      meta: {title: 'dynamicTable'}
    },
    {
      path: 'drag-table',
      component: () => import('@/views/table/dragTable.vue'),
      name: 'DragTable',
      meta: {title: 'dragTable'}
    },
    {
      path: 'inline-edit-table',
      component: () => import('@/views/table/inlineEditTable.vue'),
      name: 'InlineEditTable',
      meta: {title: 'inlineEditTable'}
    },
    {
      path: 'complex-table',
      component: () => import('@/views/table/complexTable.vue'),
      name: 'ComplexTable',
      meta: {title: 'complexTable'}
    }
  ]
};
export default tableRouter;
