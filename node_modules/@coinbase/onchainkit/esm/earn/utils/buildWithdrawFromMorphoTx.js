import { MORPHO_VAULT_ABI } from '../abis/morpho.js';
import { encodeFunctionData } from 'viem';
function buildWithdrawFromMorphoTx({
  vaultAddress,
  amount,
  receiverAddress
}) {
  const withdrawTxData = encodeFunctionData({
    abi: MORPHO_VAULT_ABI,
    functionName: 'withdraw',
    args: [amount, receiverAddress, receiverAddress]
  });
  return [{
    to: vaultAddress,
    data: withdrawTxData
  }];
}
export { buildWithdrawFromMorphoTx };
//# sourceMappingURL=buildWithdrawFromMorphoTx.js.map
