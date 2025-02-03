'use client';
import '../../identity/index.js';
import { ConnectWallet } from './ConnectWallet.js';
import { ConnectWalletText } from './ConnectWalletText.js';
import { Wallet } from './Wallet.js';
import { WalletAdvanced } from './WalletAdvanced.js';
import { WalletAdvancedAddressDetails } from './WalletAdvancedAddressDetails.js';
import { WalletAdvancedTokenHoldings } from './WalletAdvancedTokenHoldings.js';
import { WalletAdvancedTransactionActions } from './WalletAdvancedTransactionActions.js';
import { WalletAdvancedWalletActions } from './WalletAdvancedWalletActions.js';
import { jsxs, jsx } from 'react/jsx-runtime';
import { Avatar } from '../../identity/components/Avatar.js';
import { Name } from '../../identity/components/Name.js';
function WalletAdvancedDefault() {
  return /*#__PURE__*/jsxs(Wallet, {
    children: [/*#__PURE__*/jsxs(ConnectWallet, {
      children: [/*#__PURE__*/jsx(ConnectWalletText, {
        children: "Connect Wallet"
      }), /*#__PURE__*/jsx(Avatar, {
        className: "h-6 w-6"
      }), /*#__PURE__*/jsx(Name, {})]
    }), /*#__PURE__*/jsxs(WalletAdvanced, {
      children: [/*#__PURE__*/jsx(WalletAdvancedWalletActions, {}), /*#__PURE__*/jsx(WalletAdvancedAddressDetails, {}), /*#__PURE__*/jsx(WalletAdvancedTransactionActions, {}), /*#__PURE__*/jsx(WalletAdvancedTokenHoldings, {})]
    })]
  });
}
export { WalletAdvancedDefault };
//# sourceMappingURL=WalletAdvancedDefault.js.map
