import { getAvatar } from '../utils/getAvatar.js';
import { useQuery } from '@tanstack/react-query';
import { mainnet } from 'viem/chains';

/**
 * Gets an ensName and resolves the Avatar
 */
const useAvatar = ({
  ensName,
  chain = mainnet
}, queryOptions) => {
  const _ref = queryOptions ?? {},
    _ref$enabled = _ref.enabled,
    enabled = _ref$enabled === void 0 ? true : _ref$enabled,
    cacheTime = _ref.cacheTime;
  return useQuery({
    queryKey: ['useAvatar', ensName, chain.id],
    queryFn: async () => {
      return getAvatar({
        ensName,
        chain
      });
    },
    gcTime: cacheTime,
    enabled,
    refetchOnWindowFocus: false
  });
};
export { useAvatar };
//# sourceMappingURL=useAvatar.js.map
