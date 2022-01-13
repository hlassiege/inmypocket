<template>
  <Sidebar/>

  <Footer/>
</template>

<script>
import Footer from '../components/Footer.vue'
import Sidebar from '../components/Sidebar.vue'

export default {
  name: 'Home',
  components: {
    Footer, Sidebar
  }
}
</script>
