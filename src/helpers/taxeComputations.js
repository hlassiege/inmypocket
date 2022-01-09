
export default function computeImpotParTranche(montant, tranches) {
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

  