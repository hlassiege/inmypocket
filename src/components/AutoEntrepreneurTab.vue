<template>
  <div class="container">
    <div class="row">
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
                <label for="tjm" class="form-label">TJM (votre tarif journalier HT)</label>
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
    </div>

    <div class="row mt-3" v-if="revenue > configuration.taxes.autoentreprise.maxRevenue">
      <div class="alert alert-danger" role="alert">
        En Auto entreprise, votre chiffre d'affaire ne devrait pas dépasser {{ configuration.taxes.autoentreprise.maxRevenue }}€ au risque de changer de régime fiscal.
      </div>
    </div>

    
    
    <div class="row">
      <div class="card text-center col-md-3">
          <div class="card-body">
            <h6 class="card-title text-uppercase text-muted">In my pocket (après IR): </h6>
            <p class="card-text red-text">€<span class="ml-2" style="font-size: 30px;">{{ (netSalary -  impotRevenu).toLocaleString() }}</span></p>
          </div>
      </div>
    </div>

    <div class="row">
      <div class="card">
        
        <div class="card-body">
          <div class="accordion accordion-flush" id="accordionDetails">
          
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                Details
              </button>
            </h2>
            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionDetails">
              <div class="accordion-body">

                <div class="row">
                  <div class="col">
                    <h4>Revenus personnels</h4>
                    <table class="table table-borderless">
                      <tbody>
                        <tr>
                          <th scope="row">Chiffre d'affaires
                          </th>
                          <td>{{ revenue }}€</td>
                        </tr>
                        <tr>
                          <th scope="row">Cotisations sociales</th>
                          <td>-{{ socialContributions }}€</td>
                        </tr>
                        <tr class="lineTotal">
                          <th scope="row">Salaire net</th>
                          <td>{{ netSalary }}€</td>
                        </tr>
                      <tr>
                          <th scope="row">Total imposable</th>
                          <td>{{ totalTaxableRevenue  }}€</td>
                        </tr>                      
                        <tr>
                          <th scope="row">Impot sur le revenu</th>
                          <td>-{{ impotRevenu  }}€</td>
                        </tr>
                        <tr class="lineTotal">
                          <th scope="row">Net après impot</th>
                          <td><strong>{{ netSalary -  impotRevenu }}€</strong></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>                
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import computeImpotParTranche from '../helpers/taxeComputations';

export default {
  name: "PortageTab",
  inject : ['configuration'],
  data : function() {
    return {
      tjm : this.configuration.default.tjm,
      workload : this.configuration.default.autoentreprise.numberOfWorkedDays,
    };
  },  
  computed: {
    revenue() {
      return this.tjm * this.workload;
    },
    socialContributions() {
      return Math.round(this.revenue * this.configuration.taxes.autoentreprise.socialContributions);
    },
    netSalary() {
      return this.revenue - this.socialContributions;
    },
    totalTaxableRevenue() {
      // Abattement de 10%. Source : https://www.impots.gouv.fr/portail/particulier/questions/comment-puis-je-beneficier-de-la-deduction-forfaitaire-de-10 
      return this.netSalary - Math.round(this.netSalary * 0.10);
    },
    impotRevenu() {
      return this.computeImpotRevenu( this.totalTaxableRevenue );
    }
  },
  methods : {
    computeImpotRevenu(montant){
        return computeImpotParTranche(montant, this.configuration.taxes.impotRevenu);
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
.lineTotal {
  border-top: 1px solid #ff000d;
}
</style>
