import { TextInput } from '../../internal/components/TextInput.js';
import { isValidAmount } from '../../internal/utils/isValidAmount.js';
import { cn } from '../../styles/theme.js';
import { formatAmount } from '../../swap/utils/formatAmount.js';
import { jsx } from 'react/jsx-runtime';
function EarnAmountInput({
  className,
  disabled,
  value,
  onChange,
  'aria-label': ariaLabel
}) {
  return /*#__PURE__*/jsx("div", {
    "data-testid": "ockEarnAmountInput",
    className: cn('flex flex-col', className),
    children: /*#__PURE__*/jsx(TextInput, {
      className: cn('w-full border-none bg-transparent font-display text-5xl', 'leading-none outline-none'),
      placeholder: "0.0",
      value: formatAmount(value),
      onChange: onChange,
      inputValidator: isValidAmount,
      disabled: disabled,
      "aria-label": ariaLabel
    })
  });
}
export { EarnAmountInput };
//# sourceMappingURL=EarnAmountInput.js.map
