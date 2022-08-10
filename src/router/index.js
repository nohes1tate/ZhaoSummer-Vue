import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
//import TestDocument from "@/components/projectpage/TestDocument";
//import TestPage from "@/components/projectpage/TestPage";
import TestUML from "@/components/projectpage/TestUML";
import designTool from "@/components/InlineAxure/DesignTool";
//import documentEditor from "@/components/documentEditOld/DocumentEditor";
//import documentEditor from "@/components/documentEdit/DocumentEdit"
import ProjectView from "@/components/projectpage/ProjectView";
import DocumentEditView from "@/views/documentEdit/DocumentEditView";
//import PreviewListView from "@/views/preview/PreviewListView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'welcomePage',
    component: () => import('../views/welcome/WelcomeView')
  },
  {
    path:'/me/:userID',
    name:'mePage',
    component:()=>import('../views/me/meView')

  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/design/DesignView')
  },
  {
    path: '/documentEdit/:documentID',
    name: 'documentEdit',
    component: () => import('../views/documentEdit/DocumentEditView'),
    meta:{
      title:"墨书-文档编辑"
    },
  },
  {
    path: '/preview',
    name: 'preview',
    component: () => import('../views/preview/PreviewListView'),
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
    path: '/doctemplate/:templateID',
    name: 'doctemplate',
    component:()=>import('../views/preview/documentPreview')
  },
  {
    path: '/design/:projectID',
    name: 'design',
    component:()=>import('../views/design/DesignView'),
  },
  {
    path: '/UML/:projectID',
    name: 'UML',
    component:()=>import('../views/design/UMLView')
  },
  {
    path: '/project/:projectID',
    name: 'project',
    component: () => import(/* webpackChunkName: "about" */ '../views/project/projectVersion2'),
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
        path: "testUML",
        component: TestUML,
        meta: {
          title: "UML图页", //页面标题
          canMultipleOpen: true //支持根据参数不同多开不同页签
        }
      },
      {
        path: "document/:documentID",
        component: DocumentEditView,
        meta: {
          title: "文档页",
          canMultipleOpen: true
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
