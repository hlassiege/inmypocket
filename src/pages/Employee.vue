<template>
  <Header/>
  <Sidebar>
    <Employee/>
  </Sidebar>

  <Footer/>
</template>

<script>
import Footer from '../components/Footer.vue'
import Sidebar from "../components/Sidebar";
import Employee from "../components/EmployeeTab";
import Header from '../components/Header.vue'
export default {
  name: 'App',
  components: {
    Employee,
    Sidebar,
    Footer,
    Header
  }
}
</script>


