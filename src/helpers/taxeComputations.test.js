import taxeComputations from "./taxeComputations";
import config from "../config";



test('47850 euros should give 8277 of tax', () => {
    expect(taxeComputations(47850, config.taxes.impotRevenu)).toBe(8277);
});

