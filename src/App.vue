<template>
  <div id="app" >
    <div class="pop" v-if="isLoading">
      <div class="loader">
        <div class="spinner"></div>
        <p class="text">Loading...</p>
      </div>
    </div>
    <div class='sidebar' >
      <SideMenu />
    </div>
    <Popup />
    <LeftMenu />
    <router-view/>
  </div>
</template>
<script>
import SideMenu from '@/components/SideMenu.vue'
import LeftMenu from '@/components/LeftMenu.vue'
import Popup from '@/components/Popup.vue'
export default {
  components: {
    SideMenu,
    LeftMenu,
    Popup
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>

<style src="./style/common/css/layout.css"></style>
<style lang="scss">
// @import './style/reset.scss';
@import './style/popup.scss';
</style>
<style lang="scss">
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display:flex;
  flex-direction:row;
  width:1280px;
  height:650px;
  background: url(./style/common/img/bg.png) no-repeat 0 0;
  .pop{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.65);
    z-index: 1000;
    .loader{
      position: absolute;
      top: 211px;
      left: 50%;
      margin-left: -90px;
      display: block;
      .spinner{
        margin: 0 auto;
        display: block;
        width: 90px;
        height: 90px;
        background: url('./style/common/img/spinner.png') no-repeat 0 0;
        animation: spin 2s linear infinite;
      }
      .text{
        margin-top: 18px;
        font-size: 33px;
        color: #ffffff;
        text-align: center;
      }
    }
  }
  .sidebar {
    width:126px;
    height:100%;
  }
}
</style>
