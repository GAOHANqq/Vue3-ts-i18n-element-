import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
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
    },
    {
      name: 'message',
      path: '/message',
      component: () => import('../views/message/index.vue')
    },
    {
      name: 'personal',
      path: '/personal',
      component: () => import('../views/personal/index.vue')
    },
    {
      name: 'admin',
      path: '/admin',
      component: () => import('../views/admin/index.vue'),
      children: [
        {
          name: 'add',
          path: 'add',
          component: () => import('../views/article/add.vue')
        }
      ]
    }
  ]
})
export default router
