import Vue from 'vue'
import Electron from 'vue-electron'
import Router from 'vue-router'

import {Tooltip,Slider} from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import App from './App'
import routes from './routes'

Vue.use(Electron)
Vue.use(Router)

Vue.use(Tooltip)
Vue.use(Slider)


Vue.config.debug = true

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})



/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app')
