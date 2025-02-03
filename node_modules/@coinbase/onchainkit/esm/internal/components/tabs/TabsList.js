import { cn } from '../../../styles/theme.js';
import { jsx } from 'react/jsx-runtime';
function TabsList({
  className,
  children
}) {
  return /*#__PURE__*/jsx("div", {
    className: cn('flex overflow-hidden', className),
    role: "tablist",
    "aria-orientation": "horizontal",
    children: children
  });
}
export { TabsList };
//# sourceMappingURL=TabsList.js.map
