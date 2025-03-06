import { isAuth } from '@/guard/isAuth'
import NotFoundView from '@/features/errors/NotFoundView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('@/features/public/LandingFeat.vue'),
      meta: {
        menu: false,
        title: 'landing',
      },
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
        title: 'Dashboard',
        icon: 'pi pi-chart-pie',
      },
    },
    {
      path: '/Periods',
      name: 'periodos',
      component: () => import('@/features/periods/PeriodsFeat.vue'),
      meta: {
        menu: true,
        title: 'Periodos',
        icon: 'pi pi-briefcase',
      },
    },
    {
      path: '/units',
      name: 'Unidades',
      component: () => import('@/features/units/UnitsFeat.vue'),
      meta: {
        menu: true,
        title: 'Unidades',
        icon: 'pi pi-server',
      },
    },
    {
      path: '/groups',
      name: 'Grupos',
      component: () => import('@/features/groups/GroupsFeat.vue'),
      meta: {
        menu: true,
        title: 'Grupos',
        icon: 'pi pi-sitemap',
      },
    },
    {
      path: '/subject',
      name: 'Materias',
      component: () => import('@/features/subjects/SubjectFeat.vue'),
      meta: {
        menu: true,
        title: 'Materias',
        icon: 'pi pi-book',
      },
    },
    {
      path: '/students',
      name: 'Alumnos',
      component: () => import('@/features/students/StudentsFeat.vue'),
      meta: {
        menu: true,
        title: 'Alumnos',
        icon: 'pi pi-users',
      },
    },
    {
      path: '/teachers',
      name: 'Profesores',
      component: () => import('@/features/teachers/TeachersFeat.vue'),
      meta: {
        menu: true,
        title: 'Profesores',
        icon: 'pi pi-th-large',
      },
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
