<template>
  <div class='app-slider' :style='{width: getWidth(currAppSlideIndex), transform: "translateX(" + xPos + "px) translateZ(0px)"}' @mousedown='dragStart' @touchstart='dragStart' ref='appSlide' >
    <div class='grid-container' v-for='(p) in getPageCount(currAppSlideIndex)' :key='p' >
      <div class='inner-container' >
        <div class='row' v-for='r in rowCount' :key='r' >
          <div class='app-item' v-for='item in getItems(p, r - 1)' :key='item.id' :msg='item.BlackListMsg' :class='{ dis : item.dis }' @click='runApp(item)' >
            <div class='icon-container' >
              <span class='new' v-if="item.isNew">
                <span>N</span>
              </span>
            
              <div class='badge' >
                <em>4</em>
              </div>
             
              <img :src='getAppIcon(item)'  draggable='false' />
            </div>
            <p>{{item.getWidgetName('en')}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {COL, ROW} from '@/const/grid'
import AppList from '@/libs/AppList'
import {Application} from '@/libs/Application'
import popup from 'obigo-js-ui-rnbs/components/popup'

/* 100px 이상 드래그하면 해당 방향으로 페이지 이동 */
const MOVE_THRASHOLD = 30
const ANIMATION_TERM = 120
const CONTAINER_WIDTH = 824
export default {
  name: 'AppSlider',
  computed: mapGetters(['appList', 'currAppSlideIndex']),
  data () {
    return {
      rowCount: ROW,
      xPos: 0,
      isDrag: false
    }
  },
  methods: {
    runApp (wd) {
      let self = this
      if (!this.isDrag) {
        if (wd.dis) {
          if (wd.BlackListMsg) {
            const openPopup = popup.show({
              title: 'ERROR',
              // content: `${wd.getWidgetName('en')} is under maintenance (untill ${wd.BlackListMsg}). Please try later.`,
              content: `${wd.getWidgetName('en')} is under maintenance.\n Please try later.`,
              buttons: [{
                label: 'OK',
                onClick: () => {
                  openPopup.close()
                }
              }]
            })
          } else {
            const openPopup = popup.show({
              title: 'ERROR',
              content: `${wd.getWidgetName('en')} is not available any more.\n Would you like to delete?`,
              buttons: [{
                label: 'Yes',
                onClick: () => {
                  self.$store.dispatch('showLoading')
                  AppList.remove(wd)
                  openPopup.close()
                }
              }, {
                label: 'No',
                onClick: () => {
                  openPopup.close()
                }
              }]
            })
          }
        } else {
          if (wd.running) {
            const runningApp = AppList.getRunningApplication(wd)
            runningApp.show()
          } else {
            delete wd.isNew
            Application.startWidget(wd, false)
            this.$store.dispatch('updateAppList', AppList.getList())
          }
        }
      }
    },
    getAppIcon: AppList.getAppIcon,
    dragStart (e) {
      this.isDrag = false
      const maxPage = this.getMaxPage()
      if (maxPage <= 1) {
        return
      }
      e = e.touches ? e.touches[0] : e
      if (e.type === 'mousedown') {
        this.$refs.appSlide.addEventListener('mousemove', this.dragMove)
        this.$refs.appSlide.addEventListener('mouseup', this.dragEnd)
        this.$refs.appSlide.addEventListener('mouseleave', this.dragEnd)
      } else {
        this.$refs.appSlide.addEventListener('touchmove', this.dragMove)
        this.$refs.appSlide.addEventListener('touchend', this.dragEnd)
        this.$refs.appSlide.addEventListener('touchcancel', this.dragEnd)
      }
      this.beforeX = e.clientX
      this.startX = this.xPos
    },
    dragMove (e) {
      e = e.touches ? e.touches[0] : e
      const currentX = e.clientX

      this.xPos = this.xPos - (this.beforeX - currentX)
      if (this.xPos > 0) {
        this.xPos = 0
      } else if (this.xPos < -CONTAINER_WIDTH && this.currAppSlideIndex === this.getMaxPage() - 1) {
        this.xPos = -CONTAINER_WIDTH
      }

      this.beforeX = currentX
    },
    dragEnd (e) {
      e = e.changedTouches ? e.changedTouches[0] : e
      if (e.type === 'mouseup' || e.type === 'mouseleave') {
        this.$refs.appSlide.removeEventListener('mousemove', this.dragMove)
        this.$refs.appSlide.removeEventListener('mouseup', this.dragEnd)
        this.$refs.appSlide.removeEventListener('mouseleave', this.dragEnd)
      } else {
        this.$refs.appSlide.removeEventListener('touchmove', this.dragMove)
        this.$refs.appSlide.removeEventListener('touchend', this.dragEnd)
        this.$refs.appSlide.removeEventListener('touchcancel', this.dragEnd)
      }
      if (this.startX === this.xPos) {
        return
      }
      const diff = this.startX - this.xPos
      if (Math.abs(diff) > MOVE_THRASHOLD) { // 다른 페이지로 이동
        if (diff < 0) { // go to before page
          this.destXPos = 0
        } else { // go to next page
          if (this.currAppSlideIndex === 0 || this.currAppSlideIndex === this.getMaxPage() - 1) {
            this.destXPos = -CONTAINER_WIDTH
          } else {
            this.destXPos = -CONTAINER_WIDTH * 2
          }
        }
        requestAnimationFrame(this.alignPage)
        this.isDrag = true
      } else { // 원상복구
        if (this.currAppSlideIndex === 0) {
          this.xPos = 0
        } else {
          this.xPos = -CONTAINER_WIDTH
        }
      }
    },
    alignPage () {
      const moveDirection = (this.xPos - this.destXPos) / Math.abs(this.xPos - this.destXPos)
      const w = ANIMATION_TERM * moveDirection
      const maxPage = this.getMaxPage()
      if (isNaN(moveDirection)) {
        return
      }
      this.xPos = this.xPos - w
      if ((moveDirection < 0 && this.xPos > this.destXPos) || (moveDirection > 0 && this.xPos < this.destXPos)) {
        let newSlideIndex = this.currAppSlideIndex + moveDirection
        if (newSlideIndex < 0) {
          newSlideIndex = 0
        } else if (newSlideIndex > maxPage - 1) {
          newSlideIndex = maxPage - 1
        }
        this.$store.dispatch('updateCurrAppSlideIndex', newSlideIndex)
        if (this.currAppSlideIndex === 0) {
          this.xPos = 0
        } else {
          this.xPos = -CONTAINER_WIDTH
        }
      } else {
        requestAnimationFrame(this.alignPage)
      }
    },
    getWidth (currAppSlideIndex) {
      const pageLen = this.getPageCount(currAppSlideIndex).length
      return `${pageLen * CONTAINER_WIDTH}px`
    },
    getItems (page, row) {
      const start = (page * (ROW * COL)) + (row * COL)
      return this.appList.slice(start, start + COL)
    },
    getPageCount (currAppSlideIndex) {
      const maxPage = this.getMaxPage()
      if (currAppSlideIndex === 0) {
        const pages = [0, 1]
        return pages.slice(0, maxPage)
      } else if (currAppSlideIndex === maxPage - 1) {
        return [maxPage - 2, maxPage - 1]
      } else {
        return [currAppSlideIndex - 1, currAppSlideIndex, currAppSlideIndex + 1]
      }
    },
    getMaxPage () {
      return Math.ceil(this.appList.length / (ROW * COL))
    }
  },
  mounted () {
    this.beforeX = -1
    this.startX = -1
    this.dragMove = this.dragMove.bind(this)
    this.dragEnd = this.dragEnd.bind(this)
    this.alignPage = this.alignPage.bind(this)
    this.destXPos = 0
    if (this.currAppSlideIndex === 0) {
      this.xPos = 0
    } else {
      this.xPos = -CONTAINER_WIDTH
    }
  }
}
</script>
<style lang='scss' scoped >
.app-slider{
  height:100%;
  position:absolute;
  display:flex;
  flex-direction:row;
  .grid-container{
    height:100%;
    padding-left:22px;
    padding-right:22px;
    padding-top:54px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:100%;
    .inner-container{
      width:100%;
      height:497px;
      display:flex;
      flex-direction:column;
      .row {
        display:flex;
        justify-content: flex-start;
        flex:1;
        flex-direction:row;
        .app-item{
          padding-top:39px;
          width:260px;
          display:flex;
          flex-direction:column;
          justify-content:flex-start;
          align-items:center;
          &.dis{
            opacity: .3
          }
          .icon-container{
            height:98px;
            position:relative;
            img {
                width: 98px;
                height: 98px;
            }
            .badge{
              z-index: 1;
              position: absolute;
              top: -12px;
              right: -21px;
              display: inline-block;
              min-width: 50px;
              height: 50px;
              font-family: 'NotoSansCJKkr-Regular';
              border-radius: 50px;
              background-color: #ff4c4c;
              box-shadow: 0 2px 5px #1c1c1c;
              em{
                display: block;
                margin: 0 15px;
                text-align: center;
                font-size: 30px;
                line-height: 47px;
                font-style: normal;
                color: #ffffff;
                text-indent: 0;
              }
            }
          }
          p {
            color:white;
            margin: 18px 10px 0;
            font-size: 30px;
            font-family: 'NotoSansCJKkr-Medium';
            word-break: break-all;
            max-height: 60px;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            display: -webkit-box;
            -webkit-box-orient: vertical;
          }
          &:active .icon-container:before{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 120px;
            height: 120px;
            background-color: rgba(64, 146, 255, 0.5);
            border-radius: 10px;
          }
        }
      }
      .ribbon {
        position: absolute;
        top: -2px;
        left: -3px;
        display: block;
        width: 70px;
        height: 30px;
        background: url(../style/common/img/ico_ribbon.png) no-repeat 0 0;
        overflow: hidden;
        em {
          display: block;
          width: 83%;
          height: 100%;
          font-size: 24px;
          font-style: normal;
          line-height: 27px;
          color: #ffffff;
          text-align: center;
        }
      }
      .new {
          position: absolute;
          top: -24px;
          right: -24px;
          span {
              display: block;
              width: 50px;
              height: 50px;
              font-family: 'NotoSansCJKkr-Medium';
              font-size: 30px;
              line-height:48px;
              color: #ffffff;
              text-align: center;
              border-radius: 100%;
              background: #ff4c4c;
          }
      }
      .badge{
          display:block;
          max-width: 90px;
          height: 50px;
          border-radius: 90px;
          background-color: #ff4c4c;
          position: absolute;
          top: -24px;
          right: -24px;
          em{
              display: block;
              margin: 0 10px;
              text-align: center;
              font-size: 30px;
              line-height: 48px;
              font-style: normal;
              color: #ffffff;
              text-indent: 0;
          }
      }
    }
  }
}
</style>
