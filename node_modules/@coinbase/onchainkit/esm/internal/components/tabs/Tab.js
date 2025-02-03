import { cn, text, color, background } from '../../../styles/theme.js';
import { useCallback } from 'react';
import { useTabsContext } from './Tabs.js';
import { jsx } from 'react/jsx-runtime';
function Tab({
  value,
  children,
  className,
  'aria-label': ariaLabel
}) {
  const _useTabsContext = useTabsContext(),
    selectedTab = _useTabsContext.selectedTab,
    setSelectedTab = _useTabsContext.setSelectedTab;
  const isSelected = selectedTab === value;
  const handleClick = useCallback(() => {
    setSelectedTab(value);
  }, [value, setSelectedTab]);
  return /*#__PURE__*/jsx("button", {
    className: cn(text.label1, isSelected ? color.primary : color.foreground, isSelected ? background.washed : background.default, 'w-1/2 text-center', 'cursor-pointer px-3 py-4', className),
    onClick: handleClick,
    "aria-label": ariaLabel,
    "aria-selected": isSelected,
    "aria-controls": `${value}-panel`,
    role: "tab",
    type: "button",
    children: children
  });
}
export { Tab };
//# sourceMappingURL=Tab.js.map
