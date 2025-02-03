import { WagmiProvider, createConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { http } from "viem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StakingDapp from "./components/StakingDapp";

// Création du client Query pour gérer les requêtes
const queryClient = new QueryClient();

// Configuration correcte de wagmi
const wagmiConfig = createConfig({
  autoConnect: true,
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

export default function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <StakingDapp />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
