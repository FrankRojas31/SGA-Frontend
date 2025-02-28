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
    {
      path: '/AttackXSS',
      name: 'XSS',
      component: () => import("@/views/atacks/XSSView.vue"),
      meta: {
        menu: true,
        title: 'XSS',
        layout: true,
      }
    }
  ],
})

router.beforeEach((to, from, next) => {
  const verifyAuth = isAuth().value
  const publicRoutes = ['/login', '/register', '/NotFound']
  const requiresAuth = !publicRoutes.includes(to.path)
  const isFirstLoad = !from.path || from.path === '/'

  if (isFirstLoad && to.path === '/') {
    if (!verifyAuth) {
      next('/login')
      return
    } else {
      next('/dashboard')
      return
    }
  }

  if (requiresAuth && !verifyAuth) {
    if (to.matched.length) {
      next('/NotFound')
      return
    } else {
      next('/login')
      return
    }
  }

  if (verifyAuth && (to.name === 'login' || to.name === 'register')) {
    next('/dashboard')
    return
  }

  next()
})

export default router
