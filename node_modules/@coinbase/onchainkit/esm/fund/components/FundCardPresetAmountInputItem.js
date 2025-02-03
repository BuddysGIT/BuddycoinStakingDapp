import { formatFiatAmount } from '../../internal/utils/formatFiatAmount.js';
import { cn, text, color, border } from '../../styles/theme.js';
import { useMemo, useCallback } from 'react';
import { jsx } from 'react/jsx-runtime';
function FundCardPresetAmountInputItem({
  presetAmountInput,
  currency,
  onClick
}) {
  const presetAmountInputText = useMemo(() => {
    return formatFiatAmount({
      amount: presetAmountInput,
      currency,
      minimumFractionDigits: 0
    });
  }, [presetAmountInput, currency]);
  const handleClick = useCallback(() => {
    onClick(presetAmountInput);
  }, [presetAmountInput, onClick]);
  const handleKeyPress = useCallback(event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick(presetAmountInput);
    }
  }, [presetAmountInput, onClick]);
  if (!presetAmountInput) {
    return null;
  }
  return /*#__PURE__*/jsx("button", {
    type: "button",
    "data-testid": "ockPresetAmountInput",
    className: cn(text.body, color.foreground, border.radius, border.lineDefault, 'flex-1', 'p-1', 'overflow-hidden', 'whitespace-nowrap', 'text-ellipsis', 'hover:bg-[var(--ock-bg-default-hover)]', 'focus:outline-none focus:ring-2'),
    title: presetAmountInputText,
    onClick: handleClick,
    onKeyDown: handleKeyPress,
    children: presetAmountInputText
  });
}
export { FundCardPresetAmountInputItem };
//# sourceMappingURL=FundCardPresetAmountInputItem.js.map
