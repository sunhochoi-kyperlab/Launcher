import * as types from './actionTypes'

export default {
  [types.SHOW_LOADING] (state) {
    state.isLoading = true
  },
  [types.HIDE_LOADING] (state) {
    state.isLoading = false
  },
  [types.UPDATE_APP_LIST] (state, appList) {
    state.appList = appList
  },
  [types.UPDATE_CURR_APP_SLIDE_INDEX] (state, index) {
    state.currAppSlideIndex = index
  },
  [types.UPDATE_NEW_APP_LIST] (state, newAppList) {
    state.newAppList = newAppList
  }
}
