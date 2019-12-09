import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import LauncherEvent from '@/libs/LauncherEvent'

/* 직접 사용하지는 않지만 popup의 오류 메시지를 잡기위해 추가 */
import {install as InstallEvent} from 'obigo-js-ui-rnbs/features/events'
import obgFocus from 'obigo-js-ui-rnbs/directives/obg-focus'
Vue.directive('obg-focus', obgFocus)
window.obigoUI = {}
InstallEvent(Vue)
/*************************************************************/

Vue.config.productionTip = false

/* Native Title */
let app
if (window.applicationFramework && window.applicationFramework.applicationManager) {
  app = window.applicationFramework.applicationManager.getOwnerApplication(window.document)
}

if (app) {
  app.addEventListener('ApplicationShown', function () {
    let a = window.applicationFramework.applicationManager.getOwnerApplication(window.document)
    let d = a.getDescriptor()
    if (a && d) {
      if (d.localURI && d.iconSrcPath) {
        a.setStatusBarTitle('Connected car', (d.localURI + d.iconSrcPath))
      }
    }
  })
}
/* Native Title - End */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
router.push('/')
LauncherEvent.init()
