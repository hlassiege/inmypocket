<template>

  <MainTab/>
</template>

<script>
import MainTab from './components/MainTab.vue'

export default {
  name: 'App',
  components: {
    MainTab
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.logo {
  text-align: center;
}
</style>
