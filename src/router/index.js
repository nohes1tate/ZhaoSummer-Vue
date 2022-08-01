import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/home/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/AboutView')
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/project',
    name: 'project',
    component: () => import(/* webpackChunkName: "about" */ '../views/project/project')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
