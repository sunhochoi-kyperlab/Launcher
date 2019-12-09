<template>
  <div class="running-apps content">
    <div class='header' >
      <p>Running Apps</p>
    </div>
    <div class='list-container' >
      <p class="info-text" v-if="isEmptyRunningApps()">No running Apps</p>
      <div v-for='(item, idx) in appList' :key='idx' class='item' >
        <div class='icon' >
          <img :src='getAppIcon(item)' width='100px' height='100px' />
        </div>
        <div class='app-name' >
          <p>{{item.getWidgetName('en')}}</p>
        </div>
        <div class='btn-container' >
          <button @click='destroyApp(item)' >Force Stop</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import {mapGetters} from 'vuex'
import AppList from '@/libs/AppList'
export default {
  name: 'RunningApps',
  computed: mapGetters(['appList']),
  data () {
    return {
    }
  },
  methods: {
    destroyApp (wd) {
      const runningApp = AppList.getRunningApplication(wd)
      if (runningApp) {
        runningApp.destroyApplication()
      }
      setTimeout(() => {
        this.$store.dispatch('updateAppList', AppList.getList(true))
      }, 50)
    },
    getAppIcon: AppList.getAppIcon,
    isEmptyRunningApps () {
      let rtn = true
      if (this.appList.length > 0) rtn = false
      return rtn
    }
  },
  beforeMount () {
    this.$store.dispatch('updateAppList', AppList.getList(true))
  },
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
.running-apps{
  display:flex;
  flex-direction:column;

  .header{
    position: relative;
    height: 130px;
    background-color: rgba(0,0,0,0.3);
    font-family: 'NotoSansCJKkr-Regular';

    padding:10px 10px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    &::before{
      content: '';
      display: block;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background-color: #000000;
      border-bottom: 1px solid #646464;
    }
    p{
      margin-left: 28px;
      font-size: 33.5px;
      color: #acacac;
      white-space: nowrap;
    }
  }
  .list-container{
    height:520px;
    overflow:scroll;
    .info-text {
      margin-top: 235px;
      font-size: 33.5px;
      color: #acacac;
      text-align: center;
      line-height: 150%;
    }
    .item{
      width:100%;
      height:130px;
      display:flex;
      flex-direction:row;
      align-items:center;
      border-bottom: 1px solid #3b414a;
      padding-left:30px;
      .icon {
        display:flex;
        justify-content:center;
        align-items:center;
      }
      .app-name{
        flex:1;
        display:flex;
        flex-direction:column;
        justify-content:center;
        padding-left:30px;
        font-size: 33.5px;
        color: #acacac;
      }
      .btn-container{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        width: 177px;
        height: 66px;
        margin-right:30px;
        button{
          width:inherit;
          height:inherit;
          background: transparent;
          font-size: 30px;
          color: #ffffff;
          text-align: center;
          border: 1px solid #ffffff;

        }
      }
    }
  }
}
</style>
