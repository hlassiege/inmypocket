<template>
  <div class="container mt-5">
    <div class="row">
      <h5>Veuillez renseigner les paramètres nécessaires pour calculer vos revenus</h5>
      <form class="mt-4">
        <div class="row">
          <div class="col-md-6">
          <div class="mb-3">
            <label for="tjm" class="form-label">TJM (votre tarif journalier HT)</label>
            <div class="input-group mb-3">
              <input type="text" v-model="tjm" id="tjm" placeholder="600" class="form-control" aria-label="TJM HT">
              <span class="input-group-text">€ HT</span>
            </div>
          </div>
          <div class="mb-3">
            <label for="workload" class="form-label">Nombre de jours travaillés dans l'année</label>
            <span class="range-legend">{{ workload }}</span>
            <input type="range" v-model="workload" min="0" max="365" class="form-range" id="workload">
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
            <p class="card-text red-text">€<span class="ml-2" style="font-size: 30px;">{{ (totalRevenue -  impotRevenu).toLocaleString() }}</span>
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
              <div class="mb-3">
                <label for="expenses" class="form-label">Frais annuel</label>
                <div class="input-group">
                  <span class="input-group-text" id="euros">€</span>
                  <input type="text" v-model="expenses" class="form-control" id="expenses" placeholder="10000" aria-describedby="euros">
                </div>
              </div>
              <div class="mb-3">
                <div class="mb-3 ">
                  <label for="shareOfSalary" class="form-label">Pourcentage versé en salaire (versus dividendes)</label>
                  <div class="input-group">
                    <span class="input-group-text" id="percent">%</span>
                    <input type="text" v-model="shareOfSalary" class="form-control" id="shareOfSalary" placeholder="15" aria-describedby="percent">
                  </div>
                </div>
              </div>
              <div class="form-check mb-3 ">
                <input class="form-check-input" type="checkbox" v-model="flatTax" :value="true" id="flatTax">
                <label class="form-check-label" for="flatTax">
                  Dividendes soumis à la Flat Tax (Imposition à l'IR si la case est décoché)
                </label>
              </div>

              <hr class="mt-4 mb-3"/>

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
                <h4>Dépenses</h4>
                <table class="table table-borderless">
                  <tbody>
                  <tr>
                    <th scope="row">Frais</th>
                    <td>{{ expenses }}€</td>
                  </tr>
                  <tr>
                    <th scope="row">Salaire super brut</th>
                    <td>{{ grossSalary }}€</td>
                  </tr>
                  <tr style="border-top: 1px solid #ff000d;">
                    <th scope="row">Total charges sociétés
                    </th>
                    <td>{{ grossSalary + expenses }}€</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="col">
                <h4>Bénéfices</h4>
                <table class="table table-borderless">
                  <tbody>
                  <tr>
                    <th scope="row">Chiffre d'affaires</th>
                    <td>{{ revenue }}€</td>
                  </tr>
                  <tr>
                    <th scope="row">Charges sociétés</th>
                    <td>-{{ grossSalary + expenses }}€</td>
                  </tr>
                  <tr class="lineTotal">
                    <th scope="row" >Bénéfice brut</th>
                    <td>{{ benefits }}€</td>
                  </tr>
                  <tr>
                    <th scope="row">Impot société</th>
                    <td>-{{ impotSociete  }}€</td>
                  </tr>
                  <tr class="lineTotal">
                    <th scope="row">Bénéfice net <small>(dividendes versables)</small></th>
                    <td>{{ dividends }}€</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="col">
                <h4>Dividendes</h4>
                <table class="table table-borderless">
                  <tbody>
                  <tr>
                    <th scope="row">Dividendes brut</th>
                    <td>{{ dividends  }}€</td>
                  </tr>
                  <tr v-if="!flatTax">
                    <th scope="row" >CSG/RDS sur dividendes</th>
                    <td>-{{ csgRdsOnDividends  }}€</td>
                  </tr>
                  <tr v-if="flatTax">
                    <th scope="row" >Flat Tax sur dividendes</th>
                    <td>-{{ flatTaxOnDividends  }}€</td>
                  </tr>
                  <tr class="lineTotal">
                    <th scope="row">Dividendes perçus</th>
                    <td>{{ dividendsReceivedAfterTaxes  }}€</td>
                  </tr>
                  </tbody>
                </table>
              </div>

              <div class="col">
                <h4>Revenus personnels</h4>
                <table class="table table-borderless">
                  <tbody>
                  <tr>
                    <th scope="row">Salaire super brut</th>
                    <td>{{ grossSalary }}€</td>
                  </tr>
                  <tr>
                    <th scope="row">Cotisations sociales <small> (patronales + salariales)</small></th>
                    <td>-{{ socialContributions }}€</td>
                  </tr>
                  <tr class="lineTotal">
                    <th scope="row" >Salaire versé net</th>
                    <td>{{ netSalary }}€</td>
                  </tr>
                  <tr>
                    <th scope="row">Dividendes perçus</th>
                    <td>{{ dividendsReceivedAfterTaxes  }}€</td>
                  </tr>
                  <tr>
                    <td >Dividendes imposables
                      <br/>
                      <small v-if="!flatTax">(abattement 40%)</small>
                      <small v-if="flatTax">(0 avec le choix de la flatTax)</small>
                    </td>
                    <td>{{ taxableDividends  }}€</td>
                  </tr>
                  <tr class="lineTotal">
                    <th scope="row">Total Reçu</th>
                    <td>{{ totalRevenue  }}€</td>
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
                    <td><strong>{{ totalRevenue -  impotRevenu }}€</strong></td>
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
  name: "SASUTab",
  inject : ['configuration'],
  data : function() {
    return {
      tjm : this.configuration.default.tjm,
      taxRate : '',
      computeIncomeTaxWithTaxRate : this.configuration.default.computeIncomeTaxWithTaxRate,
      flatTax : this.configuration.default.sasu.flatTax,
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
      return (this.revenue - this.expenses) * this.shareOfSalary / 100;
    },
    netSalary() {
      return this.grossSalary - this.socialContributions;
    },

    dividends() {
      return this.benefits - this.impotSociete;
    },
    dividendsReceivedAfterTaxes() {
      return this.dividends - this.csgRdsOnDividends - this.flatTaxOnDividends;
    },
    taxableDividends() {
      if (this.flatTax) {
        return 0;
      }
      return Math.round( this.dividendsReceivedAfterTaxes * this.configuration.taxes.sasu.taxablePartOfDividends); 
    },
    impotSociete () {
      return this.computeImpotSociete(this.benefits);
    },
    flatTaxOnDividends () {
      if (this.flatTax) {
        return Math.round(this.dividends * this.configuration.taxes.sasu.flatTaxOnDividends); 
      }
      else return 0;      
    },
    csgRdsOnDividends () {
      if (this.flatTax) {
        return 0;
      }
      return Math.round(this.dividends * this.configuration.taxes.sasu.csgRdsOnDividends); 
    },
    taxRateClass() {
      return this.isTaxRateInvalid ? 'is-invalid' : 'is-valid'
    },

    isTaxRateInvalid() {
      return this.computeIncomeTaxWithTaxRate && !this.taxRate;
    },
    totalRevenue() {
      return this.dividendsReceivedAfterTaxes + this.netSalary;
    },
    totalTaxableRevenue() {
      // Le taux personnalisé d'imposition s'applique sur les revenus totaux (tout en conservant l'abattement sur les dividendes)
      if (this.computeIncomeTaxWithTaxRate) {
        return this.taxableDividends + this.netSalary;
      }
      return this.taxableDividends + this.netSalary - Math.round((this.taxableDividends + this.netSalary)*0.10);
    },
    impotRevenu() {
      if (this.computeIncomeTaxWithTaxRate) {
        return Math.round(this.totalTaxableRevenue * this.taxRate / 100);
      }
      return this.computeImpotRevenu( this.totalTaxableRevenue );
    },
    socialContributions() {

        var allocationsFamiliales = Math.round(this.grossSalary * this.configuration.taxes.sasu.socialContributions.allocationFamiliales);
        var formationPro = Math.round(this.grossSalary * this.configuration.taxes.sasu.socialContributions.formationProfessionnelle);
        var aideLogement = Math.round(this.grossSalary * this.configuration.taxes.sasu.socialContributions.aideLogement);
        var csgRds = Math.round((this.grossSalary * this.configuration.taxes.sasu.socialContributions.csgRds.partDuRevenuConsidere ) * this.configuration.taxes.sasu.socialContributions.csgRds.taux);
        var maladieMaternite = Math.round(this.grossSalary * this.configuration.taxes.sasu.socialContributions.maladieMaternite);

        var assuranceVieillesse = Math.round(computeImpotParTranche(this.grossSalary,  this.configuration.taxes.sasu.socialContributions.assuranceVieillesse));
        var retraitesCadres = Math.round(computeImpotParTranche(this.grossSalary, this.configuration.taxes.sasu.socialContributions.retraiteCadres));
        var cotisationRetraiteCadre = Math.round(computeImpotParTranche(this.grossSalary, this.configuration.taxes.sasu.socialContributions.cotisationRetraiteCadres));
        var agff = Math.round(computeImpotParTranche(this.grossSalary, this.configuration.taxes.sasu.socialContributions.agff));
        var prevoyance = Math.round(computeImpotParTranche(this.grossSalary, this.configuration.taxes.sasu.socialContributions.prevoyance));
        var apec = Math.round(computeImpotParTranche(this.grossSalary, computeImpotParTranche(this.grossSalary, this.configuration.taxes.sasu.socialContributions.apec)));

        return allocationsFamiliales + formationPro + csgRds + aideLogement + maladieMaternite + assuranceVieillesse + retraitesCadres + cotisationRetraiteCadre + agff + prevoyance + apec;
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
    computeImpotSociete(montant){
        return computeImpotParTranche(montant, this.configuration.taxes.impotSociete);
    }, 
    computeImpotRevenu(montant){
        return computeImpotParTranche(montant, this.configuration.taxes.impotRevenu);
    },
  },

};
</script>

