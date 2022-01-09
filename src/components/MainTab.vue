<template>
  <div class="container">
      <ul class="nav nav-tabs"  id="mainTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="sasu-tab" data-bs-toggle="tab" data-bs-target="#sasu" type="button" role="tab" aria-controls="sasu" aria-selected="true">SASU</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link " id="eurl-tab" data-bs-toggle="tab" data-bs-target="#eurl" type="button" role="tab" aria-controls="eurl" aria-selected="true">EURL</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link " id="ei-tab" data-bs-toggle="tab" data-bs-target="#ei" type="button" role="tab" aria-controls="ei" aria-selected="true">EI</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link " id="portage-tab" data-bs-toggle="tab" data-bs-target="#portage" type="button" role="tab" aria-controls="portage" aria-selected="true">Portage salarial</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link " id="employee-tab" data-bs-toggle="tab" data-bs-target="#employee" type="button" role="tab" aria-controls="employee" aria-selected="true">Salariat</button>
        </li>
      </ul>
      <div class="tab-content" id="mainTabContent">
        <div class="tab-pane fade show active" id="sasu" role="tabpanel" aria-labelledby="sasu-tab"><SASUTab/></div>
        <div class="tab-pane fade" id="eurl" role="tabpanel" aria-labelledby="eurl-tab"><EURLTab/></div>
        <div class="tab-pane fade" id="ei" role="tabpanel" aria-labelledby="ei-tab"><EURLTab/></div>
        <div class="tab-pane fade" id="portage" role="tabpanel" aria-labelledby="portage-tab"><EURLTab/></div>
        <div class="tab-pane fade" id="salariat" role="tabpanel" aria-labelledby="salariat-tab"><EURLTab/></div>
      </div>
  </div>
</template>

<script>
import SASUTab from './SASUTab.vue'
import EURLTab from './EURLTab.vue'

export default {
  name: 'MainTab',
  components: {
    SASUTab, EURLTab
  }
}
</script>

<style scoped>
li {
  margin: 0 10px;
}
</style>
