import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import keycloak from '@/keycloak'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:catchAll(.*)', // catch all undefined routes
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!keycloak.authenticated) {
      keycloak.login()
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router