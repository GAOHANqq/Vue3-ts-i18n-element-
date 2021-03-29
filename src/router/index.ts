import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      name: 'home',
      path: '/home',
      component: () => import('../views/home/index.vue'),
      children: [
        {
          name: 'list',
          path: 'list',
          component: () => import('../views/article/list.vue')
        },
        {
          name: 'detail',
          path: 'detail/:id',
          component: () => import('../views/article/detail.vue')
        }
      ]
    },
    {
      name: 'register',
      path: '/register',
      component: () => import('../views/register/index.vue')
    }
  ]
})
export default router
