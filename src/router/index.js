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
    component: () => import('../views/design/PreviewView'),
    meta:{
      title:"墨书-预览"
    },
  },
  {
    path: '/projectPreview/:projectID',
    name: 'projectPreview',
    component: () => import('../views/preview/ProjectPreview')
  },
  {
    path: '/tempPreview',
    name: 'tempPreview',
    component: () => import('../views/design/TempPreview')
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
