<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
html,body {
  margin: 0;
  padding: 0;
}
#app {
  font-size: 12px;
  font-family: PingFangSC-Medium;
  margin: 0 auto;
}
</style>
