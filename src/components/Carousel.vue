<template>
  <div class='carousel' >
    <div class='c-item' v-for='n in getMaxPage()' :class='{"curr" : n - 1 === currAppSlideIndex}' :key='n' ></div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {COL, ROW} from '@/const/grid'
export default {
  name: 'Carousel',
  computed: mapGetters(['appList', 'currAppSlideIndex']),
  methods: {
    getMaxPage () {
      return Math.ceil(this.appList.length / (COL * ROW))
    }
  },
  mounted () {
  }
}
</script>
<style lang='scss' scoped >
.carousel{
  width:100%;
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  margin-top:13px;
  .c-item {
    margin: 0 9px;
    display: inline-block;
    width: 16px;
    height: 16px;
    background-color: #fff;
    border-radius: 100%;
    &.curr{
        width: 20px;
        height: 20px;
        background-color: #00b1fb;
    }
  }
}
</style>
