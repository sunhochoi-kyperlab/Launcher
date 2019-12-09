import * as types from './actionTypes'

export function showLoading ({commit}) {
  commit(types.SHOW_LOADING)
}
export function hideLoading ({commit}) {
  commit(types.HIDE_LOADING)
}

export function updateAppList ({commit}, appList) {
  commit(types.UPDATE_APP_LIST, appList)
}

export function updateCurrAppSlideIndex ({commit}, index) {
  commit(types.UPDATE_CURR_APP_SLIDE_INDEX, index)
}
