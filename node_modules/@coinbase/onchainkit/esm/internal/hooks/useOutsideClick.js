import { useCallback, useEffect } from 'react';
function useOutsideClick(elRef, callback) {
  const handleClickOutside = useCallback(e => {
    if (!elRef.current) {
      return;
    }

    // Check if the clicked target is outside of the referenced element
    if (!elRef.current.contains(e.target)) {
      callback();
    }
  }, [callback, elRef]);
  useEffect(() => {
    // Add click event listener when component mounts
    document.addEventListener('click', handleClickOutside, {
      capture: true
    });

    // Cleanup function to remove event listener when component unmounts
    // or when handleClickOutside changes
    return () => {
      document.removeEventListener('click', handleClickOutside, {
        capture: true
      });
    };
  }, [handleClickOutside]);
}
export { useOutsideClick };
//# sourceMappingURL=useOutsideClick.js.map
