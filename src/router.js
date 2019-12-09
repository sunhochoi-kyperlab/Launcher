import Vue from 'vue'
import Router from 'vue-router'
import Home from './screen/Home.vue'
import RunningApps from './screen/RunningApps.vue'

Vue.use(Router)

export default new Router({
  mode: 'abstract',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/running',
      name: 'running',
      component: RunningApps
    }
  ]
})
