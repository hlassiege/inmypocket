<template>
  <Sidebar/>
<!--  <MainTab/>-->
  <Footer/>
</template>

<script>
// import MainTab from '../components/MainTab.vue'
import Footer from '../components/Footer.vue'
import Sidebar from '../components/Sidebar.vue'

export default {
  name: 'App',
  components: {
    Footer, Sidebar
  }
}
</script>
