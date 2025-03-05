import { isAuth } from '@/guard/isAuth'
import NotFoundView from '@/features/errors/NotFoundView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: () => import('@/features/public/LandingFeat.vue'),
      meta: {
        menu: false,
        title: 'landing'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/features/auth/LoginView.vue'),
      meta: {
        menu: false,
        title: 'Login',
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/features/auth/RegisterView.vue'),
      meta: {
        menu: false,
        title: 'Register',
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/features/dashboard/DashboardFeat.vue'),
      meta: {
        menu: true,
        title: 'Dashboard'
      }
    },
    {
      path: '/Periods',
      name: 'Periodos',
      component: () => import('@/features/Periods/PeriodsFeat.vue'),
      meta:{
        menu: true,
        title: 'Periodos'
      }
    },
    {
      path: '/:patchMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
      meta: {
        menu: false,
        title: 'NotFound',
      },
    },
  ],
})

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = isAuth().value
//   const publicRoutes = ['/', '/login', '/register', '/NotFound']
//   const requiresAuth = !publicRoutes.includes(to.path)
//   const isFirstLoad = !from.path || from.path === '/'

//   if (isFirstLoad && to.path === '/') {
//     if (isAuthenticated) {
//       return next('/dashboard')
//     }
//     return next()
//   }

//   if (requiresAuth && !isAuthenticated) {
//     return next(to.matched.length ? '/login' : '/NotFound')
//   }

//   if (isAuthenticated && (to.name === 'login' || to.name === 'register')) {
//     return next('/dashboard')
//   }

//   next()
// })

export default router
