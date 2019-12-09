import {AppManager} from '@/libs/Application'
import popup from 'obigo-js-ui-rnbs/components/popup'
/*
 * 런처앱에서 담당해야하는 이벤트들을 처리하는 객체
 */
class LauncherEvent {
  init () {
    AppManager.addEventListener('ApplicationLoaded', (app) => {
     if (app.startedby === app.APPLICATION_STARTED_BY_DIRECT || app.startedby === app.APPLICATION_STARTED_BY_WEB) {
        const wd = app.getDescriptor()
        if (wd.id !== 'http://www.obigo.com/posco/digen/launcher' && wd.id !== 'http://www.obigo.com/ssangyong/C300/launcher') {
          app.show()
        }
      }
    })
    AppManager.addEventListener('ApplicationCrashed', (app) => {
      const wd = app.getDescriptor()
      const appId = wd.id
      console.log('crashed : ' + appId)

      const openPopup = popup.show({
        title: 'ERROR',
        content: `${wd.getWidgetName('en')} closed unexpectedly.`,
        buttons: [{
          label: 'OK',
          onClick: () => {
            openPopup.close()
          }
        }]
      })
    })
    AppManager.addEventListener('LowMemory', (msg) => {
      console.log('low memory : ' + msg)
      const openPopup = popup.show({
        title: 'ERROR',
        content: `${msg} closed unexpectedly.`,
        buttons: [{
          label: 'OK',
          onClick: () => {
            openPopup.close()
          }
        }]
      })
    })
    AppManager.addEventListener('ApplicationBack', (app) => {
      console.log('ApplicationBack')
      AppManager.backAck(app)
    })
  }
  bind (event, handler) {
    AppManager.addEventListener(event, handler, false)
  }
}
export default new LauncherEvent()
