<template>
  <div class="container mt-5">
    <div class="row">
      <h5>Veuillez renseigner les paramètres nécessaires pour calculer vos revenus</h5>
      <p class="small">Plus de paramètres sont à votre disposition plus bas</p>
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

    </div>

    <hr class="mt-5 mb-5">

    <div class="row">
      <div class="d-flex flex-row justify-content-center">
        <div class="card text-center col-md-3 card-stats">
          <div class="card-body">
            <h6 class="card-title text-uppercase text-muted"><i class="bi-gift-fill"></i> &nbsp; In my pocket (après IR): </h6>
            <p class="card-text red-text">€<span class="ml-2" style="font-size: 30px;">{{ (totalRevenue -  impotRevenu).toLocaleString() }}</span>
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
                          <th scope="row">Total charges sociétés</th>
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
                        <tr>
                          <th scope="row">Cotisations sociales sur dividendes</th>
                          <td>-{{ socialContributionsOnDividends  }}€</td>
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
                          <td >Dividendes imposables <small>(abattement 40%)</small></td>
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
  name: "SASUTab",
  inject : ['configuration'],
  data : function() {
    return {
      tjm : this.configuration.default.tjm,
      workload : this.configuration.default.numberOfWorkedDays,
      expenses : this.configuration.default.expenses,
      shareOfSalary : this.configuration.default.eurl.shareOfRevenueInSalary
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
      return this.dividends - this.socialContributionsOnDividends;
    },
    taxableDividends() {
      return Math.round( this.dividendsReceivedAfterTaxes * this.configuration.taxes.eurl.taxablePartOfDividends); 
    },
    impotSociete () {
      return this.computeImpotSociete(this.benefits);
    },
    socialContributionsOnDividends() {
        return this.computeSocialContributions(this.dividends);
    },
    totalRevenue() {
      return this.dividendsReceivedAfterTaxes + this.netSalary;
    },
    totalTaxableRevenue() {
      return this.taxableDividends + this.netSalary - Math.round((this.taxableDividends + this.netSalary)*0.10);
    },
    impotRevenu() {
      return this.computeImpotRevenu( this.totalTaxableRevenue );
    },
    socialContributions() {
        return this.computeSocialContributions(this.grossSalary);
    }
  },
  methods : {
    computeSocialContributions(amount) {
      var allocationsFamiliales = Math.round(computeImpotParTranche(amount, this.configuration.taxes.eurl.socialContributions.allocationFamiliales));
      var csgRds = Math.round(amount * this.configuration.taxes.eurl.socialContributions.csgRds);
      var maladieMaternite = Math.round(computeImpotParTranche(amount, this.configuration.taxes.eurl.socialContributions.maladieMaternite));
      var retraiteBase = Math.round(computeImpotParTranche(amount, this.configuration.taxes.eurl.socialContributions.retraiteBase));
      var retraiteComplementaire = Math.round(computeImpotParTranche(amount, this.configuration.taxes.eurl.socialContributions.retraiteComplementaire));
      var prevoyance = Math.round(computeImpotParTranche(amount, this.configuration.taxes.eurl.socialContributions.prevoyance));

      return allocationsFamiliales + csgRds + maladieMaternite +  retraiteBase + retraiteComplementaire + prevoyance ;
    
    },
    computeImpotSociete(montant){
        return computeImpotParTranche(montant, this.configuration.taxes.impotSociete);
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
