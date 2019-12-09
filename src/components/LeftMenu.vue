<template>
  <div class="left-mn">
    <div class="menu">
      <ul class="menu_li">
        <li :class="$route.path === '/' ? 'sel' : ''" @click="movePage('/')">Basic 
          <span class="badge" v-show="updateBadgeCount"><em>{{updateBadgeCount}}</em></span>
        </li>
        <li :class="$route.path === '/new' ? 'sel' : ''" @click="movePage('/premium')">Premium</li>
        <li :class="$route.path === '/new' ? 'sel' : ''" @click="movePage('/oem')">OEM</li>
        <li :class="$route.path === '/new' ? 'sel' : ''" @click="movePage('/default')">Default</li>
        <li :class="$route.path === '/new' ? 'sel' : ''" @click="movePage('/folder')">[Folder Name1]</li>
        <li :class="$route.path === '/new' ? 'sel' : ''" @click="movePage('/setting')">Setting</li>
      </ul>
    </div>
  </div>
</template>
v
<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'newAppsApplication',
      'updateBadgeCount'
    ])
  },
  methods: {
    movePage (url) {
      if (url === '/') {
        this.$store.commit('clearNewInstalledIDList')
        this.$store.commit('setPageShow', 'apps')
      } else if (url === '/new') {
        if (this.newAppsApplication.length > 0) {
          this.$store.commit('setPageShow', 'apps')
        } else {
          this.$store.commit('setPageShow', 'noapp')
        }
      }

      this.$router.push(url)
    }
  }
}
</script>
