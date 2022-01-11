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
          <div class="accordion accordion-flush" id="accordionAdvancedSettings">
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingAdvancedSettings">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-advancedSettings" aria-expanded="false" aria-controls="flush-advancedSettings">
                  Paramètres avancés
                </button>
              </h2>
              <div id="flush-advancedSettings" class="accordion-collapse collapse" aria-labelledby="flush-headingAdvancedSettings" data-bs-parent="#accordionAdvancedSettings">
                <div class="accordion-body">

                  <form>
                    <div class="mb-3">
                      <label for="expenses" class="form-label">Frais annuel</label>
                      <div class="input-group">
                        <span class="input-group-text" id="euros">€</span>
                      <input type="text" v-model="expenses" class="form-control" id="expenses" placeholder="10000" aria-describedby="euros">
                      </div>
                    </div>
                    <div class="mb-3">
                      <div class="mb-3 ">
                        <label for="fees" class="form-label">Frais de la société de portage</label>
                        <div class="input-group">
                          <span class="input-group-text" id="percent">%</span>
                        <input type="text" v-model="fees" class="form-control" id="fees" placeholder="10" aria-describedby="percent">
                      </div>
                    </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
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
                    <h4>Calcul du super brut</h4>
                    <table class="table table-borderless">
                      <tbody>
                        <tr>
                          <th scope="row">Chiffre d'affaire généré</th>
                          <td>{{ revenue }}€</td>
                        </tr>
                        <tr>
                          <th scope="row">Frais de la société de portage</th>
                          <td>-{{ feesPortage }}€</td>
                        </tr>
                        <tr>
                          <th scope="row">Frais</th>
                          <td>-{{ expenses }}€</td>
                        </tr>
                        <tr style="border-top: 1px solid #ff000d;">
                          <th scope="row">Super brut
                          </th>
                          <td>{{ superGrossSalary }}€</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="col">
                    <h4>Revenus personnels</h4>
                    <table class="table table-borderless">
                      <tbody>
                        <tr>
                          <th scope="row">Super brut 
                          </th>
                          <td>{{ superGrossSalary }}€</td>
                        </tr>
                        <tr>
                          <th scope="row">Cotisations sociales <small> (patronales)</small></th>
                          <td>-{{ companySocialContributions }}€</td>
                        </tr>
                        <tr>
                          <th scope="row">Salaire brut</th>
                          <td>{{ grossSalary }}€</td>
                        </tr>
                        <tr>
                          <th scope="row">Cotisations sociales <small> (salariales)</small></th>
                          <td>-{{ socialContributions }}€</td>
                        </tr>
                        <tr class="lineTotal">
                          <th scope="row" >Salaire versé net</th>
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
      workload : this.configuration.default.numberOfWorkedDays,
      expenses : this.configuration.default.expenses,
      fees : this.configuration.default.portage.fees
    };
  },  
  computed: {
    revenue() {
      return this.tjm * this.workload;
    },
    feesPortage() {
      return Math.round(this.revenue * this.fees / 100);
    },
    superGrossSalary() {
      return this.revenue - this.feesPortage - this.expenses;
    },
    companySocialContributions() {
      return Math.round(this.superGrossSalary * this.configuration.taxes.employee.companySocialContributions);
    },
    grossSalary() {
      return this.superGrossSalary - this.companySocialContributions;
    },
    socialContributions() {
      return Math.round(this.grossSalary * this.configuration.taxes.employee.socialContributions);
    },
    netSalary() {
      return this.grossSalary - this.socialContributions;
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
