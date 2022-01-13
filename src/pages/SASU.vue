<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2">
        <Sidebar/>
      </div>
      <div class="col-10">
        <SASUTab/>
      </div>
    </div>

  </div>

  <Footer/>
</template>

<script>
import Footer from '../components/Footer.vue'
import Sidebar from "../components/Sidebar";
import SASUTab from "../components/SASUTab";

export default {
  name: 'App',
  components: {
    SASUTab,
    Sidebar,
    Footer
  }
}
</script>


