'use client';
import '../../identity/index.js';
import { portfolioSvg } from '../../internal/svg/portfolioSvg.js';
import { useAccount } from 'wagmi';
import { getDefaultDraggableStartingPosition } from '../utils/getDefaultDraggableStartingPosition.js';
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
function WalletIsland({
  startingPosition = getDefaultDraggableStartingPosition()
}) {
  const _useAccount = useAccount(),
    status = _useAccount.status;
  return /*#__PURE__*/jsxs(Wallet, {
    draggable: true,
    draggableStartingPosition: startingPosition,
    children: [/*#__PURE__*/jsxs(ConnectWallet, {
      className: "!rounded-full m-0 flex h-14 w-14 min-w-14 flex-col items-center justify-center p-0",
      children: [/*#__PURE__*/jsx(ConnectWalletText, {
        children: /*#__PURE__*/jsx("div", {
          className: "h-5 w-5",
          children: portfolioSvg
        })
      }), status === 'connected' ? /*#__PURE__*/jsx(Avatar, {
        className: "pointer-events-none h-14 w-14"
      }) : /*#__PURE__*/jsx("div", {
        className: "h-5 w-5",
        children: portfolioSvg
      })]
    }), /*#__PURE__*/jsxs(WalletAdvanced, {
      children: [/*#__PURE__*/jsx(WalletAdvancedWalletActions, {}), /*#__PURE__*/jsx(WalletAdvancedAddressDetails, {}), /*#__PURE__*/jsx(WalletAdvancedTransactionActions, {}), /*#__PURE__*/jsx(WalletAdvancedTokenHoldings, {})]
    })]
  });
}
export { WalletIsland };
//# sourceMappingURL=WalletIsland.js.map
