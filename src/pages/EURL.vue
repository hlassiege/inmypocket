<template>
  <Header/>
  <Sidebar>
    <EURLTab/>
  </Sidebar>
  <Footer/>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Sidebar from "../components/Sidebar";
import EURLTab from "../components/EURLTab";

export default {
  name: 'App',
  components: {
    EURLTab,
    Sidebar,
    Footer,
    Header
  }
}
</script>


