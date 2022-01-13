<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2">
        <Sidebar/>
      </div>
      <div class="col-10">
        <AutoEntrepreneur/>
      </div>
    </div>

  </div>
  <Footer/>
</template>

<script>
import Footer from '../components/Footer.vue'
import Sidebar from "../components/Sidebar";
import AutoEntrepreneur from "../components/AutoEntrepreneurTab";

export default {
  name: 'App',
  components: {
    AutoEntrepreneur,
    Sidebar,
    Footer
  }
}
</script>


