import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import TestUML from "@/components/projectpage/TestUML";
import AboutView from "@/views/AboutView";
import CreateBox from "@/components/projectpage/CreateBox";
import DocumentView from "@/views/documentEdit/DocumentView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/AboutView')
  },
  {
    path: '/documentEdit/:documentID',
    name: 'documentEdit',
    component: () => import('../views/documentEdit/DocumentView')
  },
  {
    path: '/preview',
    name: 'preview',
    component: () => import('../views/design/PreviewView')
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component:()=>import('../views/login/LoginView')
  },
  {
    path: '/project',
    name: 'project',
    component: () => import(/* webpackChunkName: "about" */ '../views/project/Project'),
    children:[
      //这个是空白页面，重新加载当前页面会用到
      {
        name: "blank",
        path: "blank",
      },
      {path:"",
        component: CreateBox,
        meta:{
          title:"新建"
        }},
      {
        path: "documentEdit",
        component: DocumentView,
        meta: {
          title: "文档页", //页面标题
          canMultipleOpen: true //支持根据参数不同多开不同页签
        }
      },
      {
        path: "testUML",
        component: TestUML,
        meta: {
          title: "UML图页", //页面标题
          canMultipleOpen: true //支持根据参数不同多开不同页签
        }
      },
      {
        path: "testPage",
        component: AboutView,
        meta: {
          title: "页面设计页", //页面标题
          canMultipleOpen: true //支持根据参数不同多开不同页签
        }
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
