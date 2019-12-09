<template>
  <div class='home content'>
    <div class='app-list' >
      <AppSlider/>
    </div>
    <div class='indicator' >
      <Carousel />
    </div>
  <!--
    <h1>i'm home</h1>
    -->
  </div>
</template>
<script>
// @ is an alias to /src
import AppSlider from '@/components/AppSlider'
import Carousel from '@/components/Carousel'
import AppList from '@/libs/AppList'
import LauncherEvent from '@/libs/LauncherEvent'

export default {
  name: 'home',
  components: {
    AppSlider,
    Carousel
  },
  methods: {
    runningApps () {
      this.$router.push('running')
    }
  },
  mounted () {
    let self = this
    this.$store.dispatch('updateAppList', AppList.getList())
    LauncherEvent.bind('ApplicationUpdateInfo', () => {
      self.$store.dispatch('updateAppList', AppList.getList())
    })
    LauncherEvent.bind('WidgetUninstallation', (wd, state, requestedURL) => {
      console.log(state)
      if (state === 4 /* WIDGET_UNINSTALLATION_COMPLETED */ || state === 5 /* WIDGET_INSTALLATION_FAILED  */) {
        self.$store.dispatch('updateAppList', AppList.getList())
        self.$store.dispatch('hideLoading')
      }
    })
    LauncherEvent.bind('WidgetInstallation', (wd, state, requestedURL) => {
      console.log(state)
      if (state === 1 /* WIDGET_INSTALLATION_COMPLETED  */ || state === 2 /* WIDGET_INSTALLATION_FAILED  */) {
        let list = AppList.getList()
        list.find((item) => {
          if (item.id === wd.id) {
            item.isNew = true
          }
        })
        self.$store.dispatch('updateAppList', list)
      }
    })
  }
}
</script>
<style lang='scss' scoped>
.home {
  display:flex;
  flex-direction:column;
  flex: 1;
  .app-list{
    position:relative;
    flex: 1;
    overflow:hidden;
  }
  .indicator {
    height:97px;
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:flex-start;
  }
}
</style>
