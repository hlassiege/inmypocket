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
            <h6 class="card-title text-uppercase text-muted">Chiffre d'affaire annuel: </h6>
            <p class="card-text red-text">€<span class="ml-2" style="font-size: 30px;">{{ revenue }}</span></p>
          </div>
      </div>
      <div class="card text-center col-md-3">
          <div class="card-body">
            <h6 class="card-title text-uppercase text-muted">In my pocket (après IR): </h6>
            <p class="card-text red-text">€<span class="ml-2" style="font-size: 30px;">{{ totalRevenue -  impotRevenu }}</span></p>
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
                          <th scope="row">CSG/RDS sur dividendes</th>
                          <td>-{{ csgRdsOnDividends  }}€</td>
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
    dividendsReceivedAfterTaxes() {
      return this.dividends - this.csgRdsOnDividends - this.socialContributionsOnDividends;
    },
    taxableDividends() {
      return Math.round( this.dividendsReceivedAfterTaxes * this.configuration.taxes.sasu.taxablePartOfDividends); 
    },
    impotSociete () {
      return this.computeImpotSociete(this.benefits);
    },
    socialContributionsOnDividends() {
        return this.computeSociaContributions(this.dividends);
    },
    csgRdsOnDividends () {
      return Math.round(this.dividends * this.configuration.taxes.sasu.csgRdsOnDividends); 
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
        return this.computeSociaContributions(this.grossSalary);
    }
  },
  methods : {
    computeSociaContributions(amount) {
      var allocationsFamiliales = Math.round(amount * this.configuration.taxes.sasu.socialContributions.allocationFamiliales);
      var formationPro = Math.round(amount * this.configuration.taxes.sasu.socialContributions.formationProfessionnelle);
      var aideLogement = Math.round(amount * this.configuration.taxes.sasu.socialContributions.aideLogement);
      var csgRds = Math.round((amount * this.configuration.taxes.sasu.socialContributions.csgRds.partDuRevenuConsidere ) * this.configuration.taxes.sasu.socialContributions.csgRds.taux);
      var maladieMaternite = Math.round(amount * this.configuration.taxes.sasu.socialContributions.maladieMaternite);

      var assuranceVieillesse = Math.round(computeImpotParTranche(amount,  this.configuration.taxes.sasu.socialContributions.assuranceVieillesse));
      var retraitesCadres = Math.round(computeImpotParTranche(amount, this.configuration.taxes.sasu.socialContributions.retraiteCadres));
      var cotisationRetraiteCadre = Math.round(computeImpotParTranche(amount, this.configuration.taxes.sasu.socialContributions.cotisationRetraiteCadres));
      var agff = Math.round(computeImpotParTranche(amount, this.configuration.taxes.sasu.socialContributions.agff));
      var prevoyance = Math.round(computeImpotParTranche(amount, this.configuration.taxes.sasu.socialContributions.prevoyance));
      var apec = Math.round(computeImpotParTranche(amount, computeImpotParTranche(amount, this.configuration.taxes.sasu.socialContributions.apec)));

      return allocationsFamiliales + formationPro + csgRds + aideLogement + maladieMaternite + assuranceVieillesse + retraitesCadres + cotisationRetraiteCadre + agff + prevoyance + apec;
    
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
