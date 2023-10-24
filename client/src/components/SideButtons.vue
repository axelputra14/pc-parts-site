<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
  name: 'SideButtons',
  props: ['buttonCaption', 'pageTarget'],
  emits: ['changePage'],
  methods: {
    changePage(newPage) {
      console.log(newPage, 'ini di buttons') //udah muncul tahap 1
      this.$emit('changePage', newPage) // emit sesuatu dengan nama sidebarEmit isinya apa
    }
  }
}
</script>

<template>
  <a href="" v-on:click.prevent="changePage(pageTarget)"
    ><RouterLink to="">{{ buttonCaption }}</RouterLink></a
  >
</template>
