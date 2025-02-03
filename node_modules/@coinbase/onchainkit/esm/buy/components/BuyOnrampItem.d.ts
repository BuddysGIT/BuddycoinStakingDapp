/// <reference types="react" />
type OnrampItemReact = {
    name: string;
    description: string;
    onClick: () => void;
    svg?: React.ReactNode;
    icon: string;
    amountUSDC?: string;
};
export declare function BuyOnrampItem({ name, description, onClick, icon, amountUSDC, }: OnrampItemReact): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=BuyOnrampItem.d.ts.map