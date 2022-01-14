<template>
  <Header/>
  <Sidebar>
    <SASUTab/>
  </Sidebar>

  <Footer/>
</template>

<script>
import Footer from '../components/Footer.vue'
import Sidebar from "../components/Sidebar";
import SASUTab from "../components/SASUTab";
import Header from '../components/Header.vue'
export default {
  name: 'App',
  components: {
    SASUTab,
    Sidebar,
    Footer, Header
  }
}
</script>


