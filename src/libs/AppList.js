import {AppManager, Application} from '@/libs/Application'
/*
 * 앱 리스트를 담당하는 객체
 * 앱리스트 반환 및 앱과 관련된 정보를 제공
 */
const sortAppList = function (a, b) {
  if (a.getWidgetName('en') > b.getWidgetName('en'))
    return 1
  else
    return -1
}

class AppList {
  constructor () {
    this.updateinfo = AppManager.getApplicationUpdateInfo(Application.getDescriptor().id)
    AppManager.addEventListener('ApplicationUpdateInfo', (json) => {
      let data = json
      if (typeof data === 'string') {
        data = JSON.parse(data)
      }
      this.updateinfo = data
    })
    if (typeof this.updateinfo === 'string') {
      this.updateinfo = JSON.parse(this.updateinfo)
    }
  }
  
  getList (onlyRunning = false) {
    const widgets = AppManager.widgets
    const appList = []
    
    for (let i = 0; i < widgets.length; i++) {
      const item = widgets.item(i)
      if (item.id !== 'http://www.obigo.com/posco/C300/launcher' && item.id !== 'http://www.obigo.com/ssangyong/C300/launcher') {
        if ((onlyRunning && item.running) || !onlyRunning) {
          if (this.updateinfo && this.updateinfo.REMOVE) {
            if (this.updateinfo.REMOVE.find((ele) => {
              if (ele.WIDGET_ID === item.id) {
                item.BlackListMsg = ele.MESSAGE
                item.dis = true
                return true
              } else return false
            })) item.dis = true
          }
          if (this.updateinfo && this.updateinfo.BLACKLIST) {
            if (this.updateinfo.BLACKLIST.find((ele) => {
              if (ele.WIDGET_ID === item.id) {
                item.BlackListMsg = ele.MESSAGE
                item.dis = true
                return true
              } else return false
            })) {
              if (!item.BlackListMsg) {
                item.BlackListMsg = ' '
              }
            }
          }
          // if (this.updateinfo && this.updateinfo.NEW_APPS) {
          //   this.updateinfo.NEW_APPS.find((ele) => {
          //     if (ele.WIDGET_ID === item.id) {
          //       item.isNew = true
          //     }
          //   })
          // }
          appList.push(item)
        }
      }
    }
    appList.sort(sortAppList)
    return appList
  }
  getAppIcon (wd) {
    return wd.localURI + wd.iconSrcPath
  }
  getRunningApplication (wd) {
    const appList = AppManager.getRunningApplications(1)
    const len = appList.length
    for (let i = 0; i < len; i++) {
      if (appList.item(i).getDescriptor().id === wd.id) {
        return appList.item(i)
      }
    }
  }
  remove (wd) {
    AppManager.uninstallWidget(wd)
  }
}

export default new AppList()
