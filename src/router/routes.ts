import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/screens/MainPage.vue') },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('src/screens/Error404.vue'),
  },
];

export default routes;
