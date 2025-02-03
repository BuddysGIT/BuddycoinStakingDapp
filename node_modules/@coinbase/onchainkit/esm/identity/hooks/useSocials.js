import { getSocials } from '../utils/getSocials.js';
import { useQuery } from '@tanstack/react-query';
import { mainnet } from 'viem/chains';
const useSocials = ({
  ensName,
  chain = mainnet
}, queryOptions) => {
  const _ref = queryOptions ?? {},
    _ref$enabled = _ref.enabled,
    enabled = _ref$enabled === void 0 ? true : _ref$enabled,
    cacheTime = _ref.cacheTime;
  return useQuery({
    queryKey: ['useSocials', ensName, chain.id],
    queryFn: async () => {
      return getSocials({
        ensName,
        chain
      });
    },
    gcTime: cacheTime,
    enabled,
    refetchOnWindowFocus: false
  });
};
export { useSocials };
//# sourceMappingURL=useSocials.js.map
