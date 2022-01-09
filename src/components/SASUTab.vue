<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        Paramètres
      </div>
      <div class="card-body">
        <h5 class="card-title">Veuillez renseigner les paramètres nécessaires pour calculer vos revenus</h5>
        <p class="card-text">Plus de paramètres sont à votre disposition plus bas</p>
        <form>
          <div class="row">
            <div class="col-md-6">
              <label for="tjm" class="form-label">TJM (votre tarif journalier)</label>
              <input type="text" v-model="tjm" class="form-control" id="tjm" placeholder="600">
            </div>
            <div class="col-md-6">
              <label for="workload" class="form-label">Nombre de jours travaillés dans l'année</label>
              <input type="text" v-model="workload" class="form-control" id="workload" placeholder="200">
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        Paramètres avancés
      </div>
      <div class="card-body">
        <form>
          <div class="row">
            <div class="col-md-6">
              <label for="expenses" class="form-label">Frais annuel</label>
              <div class="input-group">
                <span class="input-group-text" id="euros">€</span>
              <input type="text" v-model="expenses" class="form-control" id="expenses" placeholder="10000" aria-describedby="euros">
              </div>
            </div>
             <div class="col-md-6">
              <label for="shareOfSalary" class="form-label">Pourcentage versé en salaire (versus dividendes)</label>
              <div class="input-group">
               <span class="input-group-text" id="percent">%</span>
              <input type="text" v-model="shareOfSalary" class="form-control" id="shareOfSalary" placeholder="15" aria-describedby="percent">
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <ul>
        <li>Benefice :  {{ benefits }}</li>
        <li>Salaire versé BRUT :  {{ grossSalary }}</li>
        <li>Cotisations sociales :  {{ socialContributions }}</li>
        <li>Salaire versé NET :  {{ netSalary }}</li>
        <li>Impot société : {{ impotSociete }} </li>
        <li>Dividende brut : {{ dividends }}</li>
        <li>CSG/RDF sur dividendes : {{ csgRdsOnDividends }} </li>
        <li>Dividendes perçus : {{ dividendsReceivedAfterCSGRDS }} </li>
        <li>Dividendes imposable (abattement 40%) : {{ taxableDividends }} </li>
        <li>Total reçu : {{ totalRevenue }}</li>
        <li>Total percu imposable : {{ totalTaxableRevenue }}</li>
        <li>Impot sur le revenu : {{ impotRevenu }}</li>
        <li>Net après Impot (in my pocket) : {{ totalRevenue -  impotRevenu }}</li>
      </ul>

    </div>

    <div class="row">
      <div class="card col-md-3">
          <div class="card-body">
            <h6 class="card-title">Chiffre d'affaire annuel: </h6>
            <p class="card-text red-text">€<span class="ml-2" style="font-size: 30px;">{{ revenue }}</span></p>
          </div>
      </div>
      <div class="card col-md-3">
          <div class="card-body">
            <h6 class="card-title">In my pocket (après IR): </h6>
            <p class="card-text red-text">€<span class="ml-2" style="font-size: 30px;">{{ totalRevenue -  impotRevenu }}</span></p>
          </div>
      </div>
    </div>


    

  </div>
</template>

<script>
export default {
  name: "SASUTab",
  inject : ['configuration'],
  data : function() {
    return {
      tjm : this.configuration.default.tjm,
      workload : this.configuration.default.numberOfWorkedDays,
      expenses : this.configuration.default.expenses,
      shareOfSalary : this.configuration.default.sasu.shareOfRevenueInSalary
    };
  },  
  computed: {
    revenue() {
      return this.tjm * this.workload;
    },
    benefits() {
      return this.revenue - this.expenses - this.grossSalary;
    },
    grossSalary() {
      return this.revenue * this.shareOfSalary / 100;
    },
    netSalary() {
      return this.grossSalary - this.socialContributions;
    },

    dividends() {
      return this.benefits - this.impotSociete;
    },
    dividendsReceivedAfterCSGRDS() {
      return this.dividends - this.csgRdsOnDividends;
    },
    taxableDividends() {
      return Math.round( this.dividendsReceivedAfterCSGRDS * this.configuration.taxes.sasu.taxablePartOfDividends); 
    },
    impotSociete () {
      return this.computeImpotSociete(this.benefits);
    },
    csgRdsOnDividends () {
      return Math.round(this.dividends * this.configuration.taxes.sasu.csgRdsOnDividends); 
    },
    totalRevenue() {
      return this.dividendsReceivedAfterCSGRDS + this.netSalary;
    },
    totalTaxableRevenue() {
      return this.taxableDividends + this.netSalary;
    },
    impotRevenu() {
      return this.computeImpotRevenu( this.totalTaxableRevenue );
    },
    socialContributions() {

        var allocationsFamiliales = Math.round(this.grossSalary * this.configuration.taxes.sasu.socialContributions.allocationFamiliales);
        var formationPro = Math.round(this.grossSalary * this.configuration.taxes.sasu.socialContributions.formationProfessionnelle);
        var aideLogement = Math.round(this.grossSalary * this.configuration.taxes.sasu.socialContributions.aideLogement);
        var csgRds = Math.round((this.grossSalary * this.configuration.taxes.sasu.socialContributions.csgRds.partDuRevenuConsidere ) * this.configuration.taxes.sasu.socialContributions.csgRds.taux);
        var maladieMaternite = Math.round(this.grossSalary * this.configuration.taxes.sasu.socialContributions.maladieMaternite);

        var assuranceVieillesse = Math.round(this.computeImpotParTranche(this.grossSalary,  this.configuration.taxes.sasu.socialContributions.assuranceVieillesse));
        var retraitesCadres = Math.round(this.computeImpotParTranche(this.grossSalary, this.configuration.taxes.sasu.socialContributions.retraiteCadres));
        var cotisationRetraiteCadre = Math.round(this.computeImpotParTranche(this.grossSalary, this.configuration.taxes.sasu.socialContributions.cotisationRetraiteCadres));
        var agff = Math.round(this.computeImpotParTranche(this.grossSalary, this.configuration.taxes.sasu.socialContributions.agff));
        var prevoyance = Math.round(this.computeImpotParTranche(this.grossSalary, this.configuration.taxes.sasu.socialContributions.prevoyance));
        var apec = Math.round(this.computeImpotParTranche(this.grossSalary, this.computeImpotParTranche(this.grossSalary, this.configuration.taxes.sasu.socialContributions.apec)));

        return allocationsFamiliales + formationPro + csgRds + aideLogement + maladieMaternite + assuranceVieillesse + retraitesCadres + cotisationRetraiteCadre + agff + prevoyance + apec;
    }
  },
  methods : {
    computeImpotSociete(montant){
        return this.computeImpotParTranche(montant, this.configuration.taxes.impotSociete);
    }, 
    computeImpotRevenu(montant){
        return this.computeImpotParTranche(montant, this.configuration.taxes.impotRevenu);
    },
    computeImpotParTranche(montant, tranches) {
      var impot = 0;
      for(var i = 0; i < tranches.length; i++){
                if (montant >= tranches[i][0]){
                    const danslatranche = tranches[i][0];
                    impot += danslatranche * tranches[i][1];
                    montant = montant - tranches[i][0];
                }else if (montant < tranches[i][0]){
                    impot += montant*tranches[i][1];
                    montant = 0;
                    break;
                }
            }
            
        return Math.round(impot);
    }
  },

};
</script>

<style scoped>
.container{
  margin-top: 20px;
}
.card {
  margin-top: 20px;
  margin-right: 10px;
}
</style>
