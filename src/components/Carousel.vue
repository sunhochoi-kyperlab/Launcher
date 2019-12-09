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
    width:22px;
    height:22px;
    border-radius:50%;
    background-color:#272c33;
    margin-left:9px;
    margin-right:9px;
    &.curr{
      background-color:#4092ff;
    }
  }
}
</style>
