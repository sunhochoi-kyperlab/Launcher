<template>
  <div class='side-menu' >
    <div @click='back' class='btn back' ></div>
    <div @click='runningApps' class='btn app' :class='{"dis" : $route.name === "running"}' ></div>
    <div @click='home' class='btn home' ></div>
  </div>
</template>

<script>
import {Application} from '@/libs/Application'

export default {
  name: 'SideMenu',
  methods: {
    back () {
      if (this.$route.path === '/') {
        Application.home()
      } else {
        this.$router.back()
      }
    },
    runningApps () {
      this.$router.push('running')
    },
    home () {
      Application.home()
    }
  },
  mounted () {
  }
}
</script>
<style lang='scss' scoped >
.side-menu{
  width:100%;
  height:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-between;
  .btn {
    width:126px;
    height:100px;
    &.back{
      background: url(../style/common/img/ico_gnb.png) no-repeat 0 0;
      background-position: 0 1px;
      &:active{
        background-position: -126px 1px;
      }
    }
    &.app{
      background: url(../style/common/img/ico_apps.png) no-repeat 1px 0;
      &:active{
        background-position: -126px 1px;
      }
      &.dis{
        background-position: -251px 1px;
        pointer-events: none;
      }
    }
    &.home{
      margin-bottom:9px;
      background: url(../style/common/img/ico_gnb.png) no-repeat 0 0;
      background-position: 1px -100px;
      &:active{
        background-position: -125px -100px;
      }
    }
  }
}
</style>
