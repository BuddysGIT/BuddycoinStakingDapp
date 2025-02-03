interface AnalyticsParams {
    analyticsUrl?: string;
    appName: string;
    apiKey: string | null;
    data: Record<string, unknown>;
    event: string;
    interactionId: string | null;
}
export declare const sendAnalytics: ({ analyticsUrl, appName, apiKey, data, event, interactionId, }: AnalyticsParams) => Promise<void>;
export {};
//# sourceMappingURL=sendAnalytics.d.ts.map