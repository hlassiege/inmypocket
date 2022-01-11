import '@babel/polyfill'
import 'mutationobserver-shim'
import { createApp } from 'vue'
import App from './App.vue'

const configuration = {

    default : {
        tjm : 500,
        numberOfWorkedDays : 200,
        expenses : 10000,
        sasu : {
            shareOfRevenueInSalary : 15,
            flatTax : true     
        },
        eurl : {
            shareOfRevenueInSalary : 100        
        },
        employee : {
            grossSalary : 70000
        },
        portage : {
            fees : 10
        }
    },
    taxes : {
       // Source https://www.service-public.fr/particuliers/actualites/A15401 (2022)
       impotRevenu : [
        [10225, 0],
        [26070, 0.11],
        [74545, 0.30],
        [160336, 0.41],
        [Infinity, 0.45]
       ],     


       // Source : https://www.service-public.fr/professionnels-entreprises/vosdroits/F23575  (2022)
       // Le taux de 25% c'est pour 2022, c'était 26.5 pour 2021
       impotSociete : [
        [38120, 0.15],
        [Infinity, 0.025]
       ],

        employee : {
            socialContributions : 0.23,
            companySocialContributions : 0.296,
            // pour calculer le super brut à partir du brut 
            toGrossSalary : 0.42           
        }, 
        sasu : {
            // Flat tax sur les dividendes. Source https://www.dougs.fr/blog/fiscalite-et-dividendes/ (2021)
            flatTaxOnDividends : 0.30,
            // abattement de 40% sur les dividendes. Source : https://www.lecoindesentrepreneurs.fr/imposition-dividendes-sasu (2021)
            taxablePartOfDividends : 0.6,
            // Part de la CSG sur les dividendes imposables . Source : https://www.assistant-juridique.fr/regime_fiscal_social_dividendes.jsp (2022)
            // TODO avoir l'option de choisir avec le PFU (prélèvement forfataire unique). Cette calculette considère qu'on ne l'a pas choisi
            csgRdsOnDividends : 0.172,

            // Source : https://www.dougs.fr/blog/charges-sociales-sasu/ (2018)
            socialContributions : {
                allocationFamiliales : 0.0525,
                // on considèrera dans notre simulateur que l'on s'adresse a des dirigeants sans salariés
                formationProfessionnelle : 0.0055,
                aideLogement : 0.0010,
                maladieMaternite : 0.13,
                csgRds : {
                    partDuRevenuConsidere : 0.9825,
                    taux : 0.097
                },
                assuranceVieillesse : [
                    [3111, 0.1545],
                    [13244, 0.023]
                ],
                retraiteCadres : [
                    [3111, 0.0775],
                    [13244, 0.2055],
                    [26488, 0.2055]
                ],
                cotisationRetraiteCadres :  [
                    [26488, 0.0035]
                ], 
                agff : [
                    [3111, 0.02],
                    [13244, 0.022],
                    [26488, 0.022]
                ],
                prevoyance : [
                    [3111, 0.015]
                ],
                apec : [
                    [3111, 0],
                    [13244, 0.0006]
                ]                          
            }
        },
        eurl : {
            // abattement de 40% sur les dividendes. Source : https://www.lecoindesentrepreneurs.fr/imposition-fiscale-sociale-dividendes-eurl/ (2021)
            taxablePartOfDividends : 0.6,

            // Source : https://www.lecoindesentrepreneurs.fr/taux-cotisations-sociales-tns-travailleur-independant/ (2021)
            socialContributions : {
                allocationFamiliales : [
                    [45250, 0],
                    [57590, 0.031],
                    [Infinity, 0.031],
                ],
                indemnitesJournalieres : [
                    [205680, 0.0085],
                    [Infinity, 0]
                ],
                maladieMaternite : [
                    [16454, 0.0316],
                    [45250, 0.0635],
                    [205680, 0.0635],
                    [Infinity, 0.065]
                ],
                retraiteBase : [
                    [41136, 0.1775],
                    [Infinity, 0.006]
                ],  
                retraiteComplementaire : [
                    [38493, 0.07],
                    [164544, 0.08]
                ],                                
                csgRds : 0.097,
                prevoyance : [
                    [41136, 0.013]
                ]                        
            }
        }
    }
    


};


createApp(App)
.provide('configuration', configuration)
.mount('#app')
