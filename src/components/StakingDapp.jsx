import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { ConnectButton, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { base } from "wagmi/chains";
import { ethers } from "ethers";
import "../styles/globals.css";
import { Buffer } from "buffer";

window.Buffer = Buffer;

const wagmiConfig = getDefaultConfig({
  appName: "Buddysworld",
  projectId: "d982685293fdd3ec6e6fe9f6e240538b",
  chains: [base],
  ssr: false,
});

const stakingContractAddress = "0x62fD47E335Fa5Ff754FE0509329152bde5106C16";
const buddyCoinContractAddress = "0x8f62131c1b43834155A7FE1E1002F67F6dd464Df";

const stakingABI = [
  {"inputs":[{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"uint256","name":"_minStake","type":"uint256"},{"internalType":"uint256","name":"_maxStake","type":"uint256"},{"internalType":"bool","name":"_isEarlyWithdrawalEnabled","type":"bool"},{"internalType":"uint256[]","name":"_lockPeriods","type":"uint256[]"},{"internalType":"uint256[]","name":"_rewardRates","type":"uint256[]"},{"internalType":"uint256[]","name":"_earlyWithdrawalPenalties","type":"uint256[]"}],"stateMutability":"nonpayable","type":"constructor"},
  {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},
  {"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"uint256","name":"stakeIndex","type":"uint256"}],"name":"calculateReward","outputs":[{"internalType":"uint256","name":"rewardAmount","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"claimAllRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"stakeIndex","type":"uint256"}],"name":"claimReward","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[],"name":"companyFeePercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"companyFeeReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"depositTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"earlyWithdrawalPenalties","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"getStakingInfo","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserStakes","outputs":[{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"lastClaimTimestamp","type":"uint256"},{"internalType":"uint256","name":"tier","type":"uint256"}],"internalType":"struct BuddycoinStakingDapp.Stake[]","name":"userStakes","type":"tuple[]"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"isEarlyWithdrawalEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lockPeriods","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"maxStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"minStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardRates","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"uint256[]","name":"newPenalties","type":"uint256[]"}],"name":"setEarlyWithdrawalPenalties","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_tier","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"toggleEarlyWithdrawal","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userTotalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"stakeIndex","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawTokens","outputs":[],"stateMutability":"nonpayable","type":"function"}
];
const buddyCoinABI = [
  {"inputs":[],"stateMutability":"nonpayable","type":"constructor"},
  {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Approval","type":"event"},
  {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"burner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Burn","type":"event"},
  {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},
  {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Transfer","type":"event"},
  {"inputs":[{"internalType":"address","name":"ownerAddress","type":"address"},{"internalType":"address","name":"delegateAddress","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[],"name":"decimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"totalSupply_","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}
];

export default function StakingDapp() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [stakingContract, setStakingContract] = useState(null);
  const [buddyCoinContract, setBuddyCoinContract] = useState(null);
  const [amountToStake, setAmountToStake] = useState("");
  const [stakingDurations, setStakingDurations] = useState([30, 90, 120]);
  const [stakingRewards, setStakingRewards] = useState([7, 10, 15]);
  const [stakingPenalties, setStakingPenalties] = useState([30, 30, 30]);
  const [stakes, setStakes] = useState([]);
  const [pendingRewards, setPendingRewards] = useState("0");

  useEffect(() => {
    let isMounted = true;
    if (!isConnected || !address) return;

    const setupContracts = async () => {
      try {
        if (!window.ethereum) return;
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        if (!isMounted) return;

        const stakingInstance = new ethers.Contract(stakingContractAddress, stakingABI, signer);
        const buddyCoinInstance = new ethers.Contract(buddyCoinContractAddress, buddyCoinABI, signer);

        setStakingContract(stakingInstance);
        setBuddyCoinContract(buddyCoinInstance);
      } catch (error) {
        console.error("Error initializing contracts:", error);
      }
    };

    setupContracts();
    return () => {
      isMounted = false;
    };
  }, [isConnected, address]);

  const stakeTokens = async (tier) => {
    if (!stakingContract || !buddyCoinContract || !amountToStake) {
      alert("Staking contract or token contract not initialized");
      return;
    }
    try {
      const amount = ethers.parseEther(amountToStake);
      const approveTx = await buddyCoinContract.approve(stakingContractAddress, amount);
      await approveTx.wait();
      const stakeTx = await stakingContract.stake(amount, tier);
      await stakeTx.wait();
      alert("Tokens staked successfully!");
      updatePendingRewards(); // Update after successful staking
    } catch (error) {
      console.error("Error staking tokens:", error);
    }
  };

  const claimRewards = async () => {
    if (!stakingContract) {
      alert("Staking contract not initialized");
      return;
    }
    try {
      const claimTx = await stakingContract.claimAllRewards();
      await claimTx.wait();
      alert("Rewards claimed successfully!");
      updatePendingRewards(); // Update after claiming rewards
    } catch (error) {
      console.error("Error claiming rewards:", error);
    }
  };

  const updatePendingRewards = async () => {
    if (!stakingContract || !address || stakes.length === 0) {
      console.warn("⚠️ Staking contract or stakes are not defined.");
      return;
    }
  
    try {
      let totalRewards = 0n;
  
      for (let i = 0; i < stakes.length; i++) {
        const reward = await stakingContract.calculateReward(address, i);
        console.log(`🔎 Reward for stake ${i}:`, reward?.toString());
  
        totalRewards += BigInt(reward);
      }
  
      setTimeout(() => {
        if (stakingContract && totalRewards > 0n) {
          setPendingRewards(ethers.formatEther(totalRewards.toString()));
        }
      }, 0);
  
    } catch (error) {
      console.error("❌ Error updating pending rewards:", error);
    }
  };
  


  const fetchUserStakes = async () => {
    if (!stakingContract || !address) return;
  
    try {
      const userStakes = await stakingContract.getUserStakes(address);
      console.log("✅ Stakes récupérées du contrat:", userStakes);
  
      if (!userStakes || userStakes.length === 0) {
        console.warn("⚠️ Aucun stake trouvé pour cet utilisateur");
        return;
      }
  
      const formattedStakes = userStakes.map((stake) => ({
        amount: ethers.formatEther(stake.amount),
        startTime: new Date(Number(stake.startTime) * 1000),
        unlockTime: new Date((Number(stake.startTime) + 30 * 86400) * 1000),
        penalty: 10,
        tier: Number(stake.tier),
      }));
  
      // 🚀 Différer la mise à jour pour éviter l'erreur React
      setTimeout(() => {
        if (stakingContract && formattedStakes.length > 0) {
          setStakes(formattedStakes);
        }
      }, 0);
  
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des stakes:", error);
    }
  };
  
  

  useEffect(() => {
    if (stakingContract && address) {
      console.log("🔄 Fetching user stakes for:", address);
      
      setTimeout(() => {
        if (stakingContract) {
          fetchUserStakes();
        }
      }, 0); // 🚀 Différer l'exécution pour éviter les conflits
    }
  }, [stakingContract, address]);
  
  useEffect(() => {
    if (stakes.length === 0) {
      console.warn("⚠️ Stakes are still empty, waiting for update...");
    } else {
      console.log("✅ Stakes are now available, updating pending rewards...");
      setTimeout(() => updatePendingRewards(), 0);
    }
  }, [stakes]); // Exécute `updatePendingRewards()` une fois `stakes` mis à jour
    
  const unstakeTokens = async (index) => {
    if (!stakingContract) {
      alert("Staking contract not initialized");
      return;
    }
    try {
      const unstakeTx = await stakingContract.withdraw(index);
      await unstakeTx.wait();
      alert("Tokens unstaked successfully!");
      updatePendingRewards(); // Update after unstaking
    } catch (error) {
      console.error("Error unstaking tokens:", error);
    }
  };

  return (
    <WagmiConfig config={wagmiConfig}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-dark-gray to-gray-900 text-white p-3 sm:p-4 md:p-5 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-wiggle text-center">
          BUDDYCOIN STAKING
        </h1>
        <div className="mb-4 sm:mb-6 w-full flex justify-center">
          <ConnectButton className="bg-soft-blue hover:bg-hover-blue text-white font-bold py-2 px-4 rounded-lg shadow-neon w-full max-w-xs sm:max-w-sm md:max-w-md" />
        </div>
        <Card className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl mt-5 p-4 sm:p-5 bg-gray-800 rounded-2xl shadow-lg border border-gray-700">
          <CardContent>
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">Stake your $BUDYS</h2>
            <div className="overflow-x-auto w-full">
              <table className="table-auto w-full text-center text-white mb-4 border border-gray-600 rounded-lg shadow-md">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="p-2">#</th>
                    <th className="p-2">Lock</th>
                    <th className="p-2">APR</th>
                    <th className="p-2">Penalty</th>
                    <th className="p-2 hidden sm:table-cell">Amount</th>
                    <th className="p-2">Stake</th>
                  </tr>
                </thead>
                <tbody>
                  {stakingDurations.map((duration, index) => (
                    <tr key={index} className="bg-gray-800 hover:bg-gray-700 transition-all">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{duration} days</td>
                      <td className="p-2 text-green-400">{stakingRewards[index]}%</td>
                      <td className="p-2 text-red-400">{stakingPenalties[index]}%</td>
                      <td className="p-2 hidden sm:table-cell">
                        <input
                          type="text"
                          placeholder="Enter amount"
                          value={amountToStake}
                          onChange={(e) => setAmountToStake(e.target.value)}
                          className="w-full p-2 rounded-lg text-black border border-gray-400 shadow-sm"
                        />
                      </td>
                      <td className="p-2">
                        <Button onClick={() => stakeTokens(index)} className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md">
                          Stake
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="text-lg sm:text-xl font-bold mt-6 text-center">Pending Rewards</h2>
            <div className="mx-auto w-full max-w-xs sm:max-w-sm flex flex-col items-center justify-center mb-6 p-4 sm:p-6 bg-gray-700 rounded-lg shadow-xl border border-gray-600">
              <span className="text-2xl sm:text-3xl font-bold mb-2 text-neon-green">
                {Number(pendingRewards).toFixed(2)} $BUDYS
              </span>
              <Button
                onClick={() => claimRewards()}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg shadow-md"
              >
                Claim Rewards
              </Button>
            </div>

            <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">Dashboard</h2>
            <div className="overflow-x-auto w-full">
              <table className="table-auto w-full text-center text-white mb-4 border border-gray-600 rounded-lg shadow-md">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="p-2">#</th>
                    <th className="p-2">APR%</th>
                    <th className="p-2">Amount</th>
                    <th className="p-2 hidden sm:table-cell">Stake Date</th>
                    <th className="p-2 hidden sm:table-cell">Unlock Date</th>
                    <th className="p-2">Penalty</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stakes.map((stake, index) => (
                    <tr key={index} className="bg-gray-800 hover:bg-gray-700 transition-all">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{stakingRewards[stake.tier]}%</td>
                      <td className="p-2">{stake.amount}</td>
                      <td className="p-2 hidden sm:table-cell">{stake.startTime.toLocaleDateString()}</td>
                      <td className="p-2 hidden sm:table-cell">{stake.unlockTime.toLocaleDateString()}</td>
                      <td className="p-2">{stake.penalty}%</td>
                      <td className="p-2">
                        <Button onClick={() => unstakeTokens(index)} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md">
                          Unstake
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </WagmiConfig>
  );

}

