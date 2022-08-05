import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
//import TestDocument from "@/components/projectpage/TestDocument";
//import TestPage from "@/components/projectpage/TestPage";
import TestUML from "@/components/projectpage/TestUML";
import designTool from "@/components/InlineAxure/DesignTool";
import documentEditor from "@/components/documentEdit/DocumentEditor";
import ProjectView from "@/components/projectpage/ProjectView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'blankPage',
    component: () => import('../views/login/LoginView')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/AboutView')
  },
  {
    path: '/documentEdit/:documentID',
    name: 'documentEdit',
    component: () => import('../views/documentEdit/DocumentView'),
    meta:{
      title:"墨书-文档编辑"
    },
  },
  {
    path: '/preview',
    name: 'preview',
    component: () => import('../views/design/PreviewView'),
    meta:{
      title:"墨书-预览"
    },

  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta:{
      title:"墨书"
    },
  },
  {
    path: '/login',
    name: 'login',
    component:()=>import('../views/login/LoginView'),
    meta:{
      title:"墨书-登录"
    },
  },
  {
    path: '/project/:projectID',
    name: 'project',
    component: () => import(/* webpackChunkName: "about" */ '../views/project/Project'),
    children:[
      //这个是空白页面，重新加载当前页面会用到
      {
        name: "blank",
        path: "blank",
      },
      {path:"",
        component: () => import('../components/projectpage/CreateBox'),
        meta:{
          title:"新建"
        }},
      {
        path: "document",
        component: documentEditor,
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
        path: "axure/:axureID",
        component: designTool,
        meta: {
          title: "页面设计", //页面标题
          canMultipleOpen: true //支持根据参数不同多开不同页签
        }
      },
      {
        path: "overview",
        component:ProjectView,
        meta: {
          title: "项目概览",
        }
      }

    ]
  },
  {
    path: '/confirm',
    name: 'Confirm',
    component: () => import('../views/register/ConfirmView'),
  },
  {
    path: '/*',
    name: 'PageNotFound',
    component: () => import('../views/error/PageNotFound'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
