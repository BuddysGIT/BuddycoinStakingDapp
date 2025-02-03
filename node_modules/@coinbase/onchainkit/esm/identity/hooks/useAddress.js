import { getAddress } from '../utils/getAddress.js';
import { useQuery } from '@tanstack/react-query';
import { mainnet } from 'viem/chains';
const useAddress = ({
  name,
  chain = mainnet
}, queryOptions) => {
  const _ref = queryOptions ?? {},
    _ref$enabled = _ref.enabled,
    enabled = _ref$enabled === void 0 ? true : _ref$enabled,
    cacheTime = _ref.cacheTime;
  return useQuery({
    queryKey: ['useAddress', name, chain.id],
    queryFn: async () => {
      return await getAddress({
        name,
        chain
      });
    },
    gcTime: cacheTime,
    enabled,
    refetchOnWindowFocus: false
  });
};
export { useAddress };
//# sourceMappingURL=useAddress.js.map
