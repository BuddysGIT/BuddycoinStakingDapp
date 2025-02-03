let AnalyticsEvent = /*#__PURE__*/function (AnalyticsEvent) {
  AnalyticsEvent["WALLET_CONNECTED"] = "walletConnected";
  return AnalyticsEvent;
}({});

// biome-ignore lint/suspicious/noExplicitAny: generic status can be any type

// make all keys in T optional if they are in K

// check if all keys in T are a key of LifecycleStatusDataShared

/**
 * LifecycleStatus updater type
 * Used to type the statuses used to update LifecycleStatus
 * LifecycleStatusData is persisted across state updates allowing SharedData to be optional except for in init step
 */

export { AnalyticsEvent };
//# sourceMappingURL=types.js.map
