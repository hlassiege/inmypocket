<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2">
        <Sidebar/>
      </div>
      <div class="col-10">
        <EURLTab/>
      </div>
    </div>

  </div>

  <Footer/>
</template>

<script>
import Footer from '../components/Footer.vue'
import Sidebar from "../components/Sidebar";
import EURLTab from "../components/EURLTab";

export default {
  name: 'App',
  components: {
    EURLTab,
    Sidebar,
    Footer
  }
}
</script>


