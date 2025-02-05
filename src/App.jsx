import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { base } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import StakingDapp from "./components/StakingDapp";

// Configuration de wagmi avec RainbowKit
const config = getDefaultConfig({
  appName: 'Buddysworld',
  projectId: 'd982685293fdd3ec6e6fe9f6e240538b', // Mets ton vrai Project ID ici
  chains: [base],
  ssr: false, // Désactive SSR pour éviter les erreurs
});

const queryClient = new QueryClient();

export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <StakingDapp />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
