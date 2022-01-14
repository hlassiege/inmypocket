<template>
  <Header/>
  <Sidebar>
    <Portage/>
  </Sidebar>

  <Footer/>
</template>

<script>
import Footer from '../components/Footer.vue'
import Sidebar from "../components/Sidebar";
import Portage from "../components/Portage";
import Header from '../components/Header.vue'
export default {
  name: 'App',
  components: {
    Portage,
    Sidebar,
    Footer, Header
  }
}
</script>


