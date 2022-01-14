<template>
  <div class="container mt-5">
    <div class="row">
      <h5 class="card-title">Comparez les revenus que vous auriez en freelance</h5>
      <form>
        <div class="row">
          <div class="col-md-6">
            <label for="grossSalary" class="form-label">Brut annuel</label>
            <input type="text" v-model="grossSalary" class="form-control" id="grossSalary" placeholder="600">
          </div>
        </div>
      </form>
    </div>

    <hr class="mt-5 mb-5">

    <div class="row">
      <div class="d-flex flex-row justify-content-center">
        <div class="card text-center col-md-3 card-stats">
          <div class="card-body">
            <h6 class="card-title text-uppercase text-muted"><i class="bi-gift-fill"></i> &nbsp; In my pocket (après IR): </h6>
            <p class="card-text red-text">€<span class="ml-2" style="font-size: 30px;">{{ (netSalary -  impotRevenu).toLocaleString() }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-5">
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
                    <div class="form-check mb-3 ">
                      <input class="form-check-input" type="checkbox" v-model="computeIncomeTaxWithTaxRate" :value="true" id="computeIncomeTaxWithTaxRate">
                      <label class="form-check-label" for="computeIncomeTaxWithTaxRate">
                        Calculer l'impôt sur le revenu à partir du taux de prélèvement à la source
                      </label>
                    </div>
                    <div class="mb-3">
                      <div class="mb-3 ">
                        <label for="taxRate" class="form-label" title="Plus fiable si vous êtes mariés et/ou avez des enfants">
                          Taux de prélèvement à la source
                        </label>
                        <div class="input-group">
                          <span class="input-group-text" id="percentTaxRate">%</span>
                          <input type="text" :class="taxRateClass" v-model="taxRate" class="form-control" id="taxRate" placeholder="Taux personnalisé trouvable sur le site des impôts" aria-describedby="percentTaxRate">
                        </div>
                      </div>
                    </div>

                    <div class="row mt-3" v-if="computeIncomeTaxWithTaxRate">
                      <div class="alert alert-info" role="info">
                        Le calcul de l'impôt ne prend en compte que vos revenus.<br/>
                        Si vous souhaitez une simulation qui prenne en compte votre situation familiale (nombre de parts etc...)
                        veuillez fournir le taux personnalisé de prélèvement à la source.
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

    <div class="row mt-5">
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
                          <th scope="row">Salaire brut</th>
                          <td>{{ grossSalary }}€</td>
                        </tr>
                        <tr>
                          <th scope="row">Salaire super brut (cout total employeur)
                            <br>
                            <small class="fw-normal">c'est cette somme qu'il faut comparer avec le CA d'un freelance</small>
                          </th>
                          <td>{{ superGrossSalary }}€</td>
                        </tr>
                        <tr>
                          <th scope="row">Cotisations sociales <small> (salariales)</small></th>
                          <td>-{{ socialContributions }}€</td>
                        </tr>
                        <tr>
                          <th scope="row">Cotisations sociales <small> (patronales)</small></th>
                          <td>-{{ companySocialContributions }}€</td>
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
  name: "EmployeeTab",
  inject : ['configuration'],
  data : function() {
    return {
      grossSalary : this.configuration.default.employee.grossSalary
    };
  },  
  computed: {
    taxRateClass() {
      return this.isTaxRateInvalid ? 'is-invalid' : 'is-valid'
    },

    isTaxRateInvalid() {
      return this.computeIncomeTaxWithTaxRate && !this.taxRate;
    },
    netSalary() {
      return this.grossSalary - this.socialContributions;
    },
    superGrossSalary() {
      return parseFloat(this.grossSalary) + parseFloat(this.companySocialContributions);
    },
    totalTaxableRevenue() {
      // Le taux personnalisé d'imposition s'applique sur les revenus totaux
      if (this.computeIncomeTaxWithTaxRate) {
        return this.netSalary;
      }
      // Abattement de 10%. Source : https://www.impots.gouv.fr/portail/particulier/questions/comment-puis-je-beneficier-de-la-deduction-forfaitaire-de-10 
      return this.netSalary - Math.round(this.netSalary * 0.10);
    },
    impotRevenu() {
      if (this.computeIncomeTaxWithTaxRate) {
        return Math.round(this.totalTaxableRevenue * this.taxRate / 100);
      }
      return this.computeImpotRevenu( this.totalTaxableRevenue );
    },
    socialContributions() {
      return Math.round(this.grossSalary * this.configuration.taxes.employee.socialContributions);
    },
    companySocialContributions() {
      return Math.round(this.grossSalary * this.configuration.taxes.employee.toGrossSalary);
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
