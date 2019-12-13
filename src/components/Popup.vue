<template>
  <div class="pop">
    <div class="pop-up">
      <div class="pop-con">
        <div class="pop-tittle">Title</div>

        <div class="detail-text">Popup Message</div>

        <!-- 버튼 하나일 때 -->
        <div class="pop-btnarea">
            <button class="pop-btn">buttons1</button>
        </div>

        <!-- 버튼 두개일 때 -->
        <div class="pop-btnarea dual" style="display:none;">
            <button class="pop-btn">buttons1</button>
            <button class="pop-btn">buttons2</button>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
// import {mapState, mapGetters} from 'vuex'
// import {popupType} from '../../js/defines'
export default {
  mounted () {
  },
  data () {
  },
  computed: {
    
  }
}
</script>
 
<style lang="scss" scoped>
.show > .pop{
  display: block !important;
}
.loading > .pop{
  display: none !important;
}
.pop {
  display: none;
}
.pop-btnarea:before {
  top: 0px;
}
.pop-textarea {
  height: auto;
}
.rate .size {
  left: 0px
}
.rate .percentage {
  left: 520px
}
.sub-info {
  overflow:hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  max-width: 450px;
}
.progress .detail-text {
  display: block;
}
</style>