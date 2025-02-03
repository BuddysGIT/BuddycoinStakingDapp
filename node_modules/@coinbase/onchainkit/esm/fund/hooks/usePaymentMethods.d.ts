import type { OnrampError, PaymentMethod } from '../types';
export declare const usePaymentMethods: ({ country, subdivision, currency, setPaymentMethods, setIsPaymentMethodsLoading, onError, }: {
    country: string;
    subdivision?: string | undefined;
    currency: string;
    setPaymentMethods: (paymentMethods: PaymentMethod[]) => void;
    setIsPaymentMethodsLoading: (loading: boolean) => void;
    onError?: ((e: OnrampError | undefined) => void) | undefined;
}) => void;
//# sourceMappingURL=usePaymentMethods.d.ts.map