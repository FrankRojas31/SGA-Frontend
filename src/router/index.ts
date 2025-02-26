import { isAuth } from '@/api/guard/isAuth'
import NotFoundView from '@/views/errors/NotFoundView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/DashboardView.vue'),
      meta: {
        menu: true,
        title: 'Dashboard',
        layout: true,
      },
    },
    {
      path: '/create/user',
      name: 'create-user',
      component: () => import('@/views/dashboard/users/CreateUser.vue'),
      meta: {
        menu: true,
        title: 'Create',
        layout: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: {
        menu: false,
        title: 'Login',
        layout: false,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/RegisterView.vue'),
      meta: {
        menu: false,
        title: 'Register',
        layout: false,
      },
    },
    {
      path: '/:patchMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
      meta: {
        menu: false,
        title: 'NotFound',
        layout: false,
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const verifyAuth = isAuth().value
  const publicRoutes = ['/login', '/register', '/NotFound']
  const requiresAuth = !publicRoutes.includes(to.path)

  if (requiresAuth && !verifyAuth) {
    if (to.matched.length) {
      return next('/NotFound')
    } else {
      return next('/login')
    }
  }

  if (verifyAuth && (to.name === 'login' || to.name === 'register')) {
    return next('/dashboard')
  }

  next()
})

export default router
