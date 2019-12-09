const appList = []

/*
for (var i = 0; i < 29; i++) {
  appList.push({
    name: 'App Name ' + i,
    id: 'appid_' + i
  })
}
*/

const state = {
  isLoading: false,
  appList: appList,
  currAppSlideIndex: 0
}
export default state
