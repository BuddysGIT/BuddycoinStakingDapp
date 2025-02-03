import type { OnrampPaymentMethod } from '../types';
type OnrampConfigResponseData = {
    countries: OnrampConfigCountry[];
};
type OnrampConfigCountry = {
    id: string;
    subdivisions: string[];
    paymentMethods: OnrampPaymentMethod[];
};
/**
 * Returns list of countries supported by Coinbase Onramp, and the payment methods available in each country.
 */
export declare function fetchOnrampConfig(): Promise<OnrampConfigResponseData>;
export {};
//# sourceMappingURL=fetchOnrampConfig.d.ts.map