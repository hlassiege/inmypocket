export default function computeImpotParTranche(montant, tranches) {
    var minTranche = 0;
    var impot = 0;
    for (var i = 0; i < tranches.length; i++) {
        const maxDeLaTranche = tranches[i][0];
        const trancheTaxRate = tranches[i][1];
        if (montant >= maxDeLaTranche) {
            impot += (maxDeLaTranche - minTranche) * trancheTaxRate;
            minTranche = maxDeLaTranche;
        } else if (montant > minTranche) {
            impot += (montant - minTranche) * trancheTaxRate;
            break;
        }
        else if (montant < minTranche) {
            break;
        }
    }

    return Math.round(impot);
}

  