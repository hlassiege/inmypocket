<template>
  <div class="container mt-5">
    <div class="row">
      <h5>Veuillez renseigner les paramètres nécessaires pour calculer vos revenus</h5>
      <form class="mt-4">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="grossSalary" class="form-label">Brut annuel</label>
            <div class="input-group mb-3">
              <input type="text" v-model="grossSalary" class="form-control" id="grossSalary" placeholder="600">
              <span class="input-group-text">€</span>
            </div>
          </div>
        </div>
      </form>
      <a href="#" v-on:click="showAdvancedSettings" ><i class="bi-caret-right-fill"></i>&nbsp;Paramètres avancés</a>
    </div>


    <div class="row">
      <div class="d-flex flex-row justify-content-center">
        <div class="card text-center col-md-3 card-stats">
          <div class="card-body">
            <h6 class="card-title text-uppercase text-muted"><i class="bi-gift-fill"></i> &nbsp; In my pocket (après IR): </h6>
            <p class="card-text red-text">€<span class="ml-2" style="font-size: 30px;">{{ (netSalary -  impotRevenu).toLocaleString() }}</span>
              <br/>
              <small class="text-info"><a href="#" v-on:click="showDetails" ><i class="bi-question-circle"></i></a></small>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" id="modalSettings">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Paramètres avancés</h5>
          </div>
          <div class="modal-body">
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
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>

    <div class="modal" id="modalDetails">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Détails</h5>
          </div>
          <div class="modal-body">
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
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import computeImpotParTranche from '../helpers/taxeComputations';
import {Modal} from 'bootstrap';
export default {
  name: "EmployeeTab",
  inject : ['configuration'],
  data : function() {
    return {
      grossSalary : this.configuration.default.employee.grossSalary,
      taxRate : '',
      computeIncomeTaxWithTaxRate : this.configuration.default.computeIncomeTaxWithTaxRate,
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
    showDetails() {
      var myModal = new Modal(document.getElementById('modalDetails'), {})
      myModal.show();
    },
    showAdvancedSettings() {
      var myModal = new Modal(document.getElementById('modalSettings'), {})
      myModal.show();
    },
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
