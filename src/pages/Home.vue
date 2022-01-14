<template>
  <Header/>
  <Sidebar/>

  <Footer/>
</template>

<script>
import Footer from '../components/Footer.vue'
import Sidebar from '../components/Sidebar.vue'
import Header from '../components/Header.vue'

export default {
  name: 'Home',
  components: {
    Footer, Sidebar, Header
  }
}
</script>
