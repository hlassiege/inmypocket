<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
</script>

<style>
  @import './assets/css/inmypocket.css';
</style>
