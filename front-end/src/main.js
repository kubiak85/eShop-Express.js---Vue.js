import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import routes from './router'
import store from './store/store.js'

Vue.use(VueRouter)
Vue.use(VueAxios, axios)

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
