<template>
  <div id="app">
    <router-view  v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: 'App',
  /** 页面部分刷新 */
  provide (){
    return {
      reload:this.reload
    }
  },
  data(){
    return {
      isRouterAlive:true
    }
  },
  methods:{
    reload (){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  },
  components:{
  }
}
</script>

<style>

</style>
