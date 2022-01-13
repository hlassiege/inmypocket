<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2">
        <Sidebar/>
      </div>
      <div class="col-10">
        <Employee/>
      </div>
    </div>

  </div>

  <Footer/>
</template>

<script>
import Footer from '../components/Footer.vue'
import Sidebar from "../components/Sidebar";
import Employee from "../components/EmployeeTab";

export default {
  name: 'App',
  components: {
    Employee,
    Sidebar,
    Footer
  }
}
</script>


