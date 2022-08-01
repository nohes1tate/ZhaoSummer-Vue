import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import axios from 'axios'
import qs from 'qs'
Vue.prototype.$qs = qs;

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://43.138.86.76/api/";

Vue.use(ElementUI)
Vue.use(mavonEditor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
