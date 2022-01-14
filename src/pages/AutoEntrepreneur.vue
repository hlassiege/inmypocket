<template>
  <Header/>
  <Sidebar>
    <AutoEntrepreneur/>
  </Sidebar>
  <Footer/>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Sidebar from "../components/Sidebar";
import AutoEntrepreneur from "../components/AutoEntrepreneurTab";

export default {
  name: 'App',
  components: {
    AutoEntrepreneur,
    Sidebar,
    Footer,
    Header
  }
}
</script>


