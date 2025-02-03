import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { ethers } from "ethers";
import "../styles/globals.css";

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
  const [amountToStake, setAmountToStake] = useState('');
  const [stakingDurations, setStakingDurations] = useState([30, 90, 120]);
  const [stakingRewards, setStakingRewards] = useState([7, 10, 15]);
  const [stakingPenalties, setStakingPenalties] = useState([30, 30, 30]);
  const [stakes, setStakes] = useState([]);
  const [pendingRewards, setPendingRewards] = useState("0");

  // Function to update pending rewards using BigInt
  const updatePendingRewards = async () => {
    if (!stakingContract) {
      console.error("Staking contract not initialized");
      return;
    }

    if (!stakes || stakes.length === 0) {
      console.warn("No stakes found for this user");
      setPendingRewards("0");
      return;
    }

    try {
      let totalRewards = 0n;

      for (let i = 0; i < stakes.length; i++) {
        const reward = await stakingContract.calculateReward(address, i);
        totalRewards += reward; // reward est déjà un BigInt
      }

      setPendingRewards(ethers.formatEther(totalRewards));
    } catch (error) {
      console.error("Error updating pending rewards:", error);
    }
  };

  useEffect(() => {
    const setupContracts = async () => {
      try {
        if (!window.ethereum) {
          console.error("Ethereum wallet not detected");
          return;
        }

        if (!isConnected || !address) {
          console.error("Wallet not connected or address missing");
          return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        // Initialize contracts
        const stakingInstance = new ethers.Contract(stakingContractAddress, stakingABI, signer);
        const buddyCoinInstance = new ethers.Contract(buddyCoinContractAddress, buddyCoinABI, signer);

        setStakingContract(stakingInstance);
        setBuddyCoinContract(buddyCoinInstance);

        console.log("Contracts initialized successfully");

        // Update stakes and rewards
        const userStakes = await stakingInstance.getUserStakes(address);
        const formattedStakes = userStakes.map((stake) => ({
          amount: ethers.formatEther(stake.amount),
          startTime: new Date(Number(stake.startTime) * 1000),
          // Convert stake.tier (BigInt) en nombre pour accéder aux tableaux
          unlockTime: new Date((Number(stake.startTime) + stakingDurations[Number(stake.tier)] * 86400) * 1000),
          penalty: stakingPenalties[Number(stake.tier)],
          tier: Number(stake.tier),
        }));
        setStakes(formattedStakes);

        // Update pending rewards
        await updatePendingRewards();
      } catch (error) {
        console.error("Error during contract setup:", error);
      }
    };

    if (isConnected) {
      setupContracts();
    }
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

      // Update stakes and rewards after staking
      const userStakes = await stakingContract.getUserStakes(address);
      const formattedStakes = userStakes.map((stake) => ({
        amount: ethers.formatEther(stake.amount),
        startTime: new Date(Number(stake.startTime) * 1000),
        unlockTime: new Date((Number(stake.startTime) + stakingDurations[Number(stake.tier)] * 86400) * 1000),
        penalty: stakingPenalties[Number(stake.tier)],
        tier: Number(stake.tier),
      }));
      setStakes(formattedStakes);
      await updatePendingRewards();
    } catch (error) {
      console.error("Error staking tokens:", error);
    }
  };

  const unstakeTokens = async (index) => {
    if (!stakingContract) {
      alert("Staking contract not initialized");
      return;
    }

    try {
      const unstakeTx = await stakingContract.withdraw(index);
      await unstakeTx.wait();
      alert("Tokens unstaked successfully!");
      await updatePendingRewards();
    } catch (error) {
      console.error("Error unstaking tokens:", error);
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
      setPendingRewards("0");
    } catch (error) {
      console.error("Error claiming rewards:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-5">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-wiggle">
        BUDDYCOIN STAKING DAPP
      </h1>
      {!isConnected ? (
        <div className="flex flex-col items-center">
          <Button 
            onClick={() => connect({ connector: connectors[0] })} 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Connect Wallet
          </Button>
        </div>
      ) : (
        <div className="text-lg flex flex-col items-center">
          <p className="mb-2">Connected: {address}</p>
          <Button onClick={disconnect} className="bg-red-500 text-white px-4 py-2 rounded-lg">
            Disconnect
          </Button>
        </div>
      )}
  
      <Card className="w-full max-w-2xl mt-5 p-5 bg-gray-800">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">$BUDYS Staking Info</h2>
          <table className="table-auto w-full text-center text-white mb-4">
            <thead>
              <tr>
                <th>#</th>
                <th>Lock</th>
                <th>APR</th>
                <th>Penalty</th>
                <th>Amount</th>
                <th>Stake</th>
              </tr>
            </thead>
            <tbody>
              {stakingDurations.map((duration, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{duration} days</td>
                  <td>{stakingRewards[index]}%</td>
                  <td>{stakingPenalties[index]}%</td>
                  <td>
                    <input
                      type="text"
                      placeholder="Enter amount"
                      value={amountToStake}
                      onChange={(e) => setAmountToStake(e.target.value)}
                      className="w-full p-2 rounded-lg text-black"
                    />
                  </td>
                  <td>
                    <Button onClick={() => stakeTokens(index)} className="bg-green-500 text-white">
                      Stake
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <h2 className="text-xl font-bold mb-4">Pending Rewards</h2>
          <div className="mx-auto w-full max-w-md flex flex-col items-center justify-center mb-6 p-6 bg-gray-700 rounded-lg shadow-lg">
            <span className="text-3xl font-bold mb-2">
              {Number(pendingRewards).toFixed(2)} $BUDYS
            </span>
            <Button
              onClick={claimRewards}
              className="bg-yellow-500 text-black font-bold px-6 py-2 rounded"
            >
              Claim Rewards
            </Button>
          </div>
            
          <h2 className="text-xl font-bold mb-4">My Stakes</h2>
          <table className="table-auto w-full text-center text-white mb-4">
            <thead>
              <tr>
                <th>#</th>
                <th>APR%</th>
                <th>Amount</th>
                <th>Stake date</th>
                <th>Unlock date</th>
                <th>Penalty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stakes.map((stake, index) => {
                // Vérifie si la période de staking est terminée
                const isUnlocked = new Date() >= stake.unlockTime;
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{stakingRewards[stake.tier]}%</td>
                    <td>{stake.amount}</td>
                    <td>{stake.startTime.toLocaleDateString()}</td>
                    <td>{stake.unlockTime.toLocaleDateString()}</td>
                    <td>{stake.penalty}%</td>
                    <td>
                      <Button
                        onClick={() => unstakeTokens(index)}
                        disabled={!isUnlocked}
                        className={`px-4 py-2 rounded-lg ${
                          isUnlocked
                            ? "bg-red-500 text-white"
                            : "bg-gray-500 text-gray-200 cursor-not-allowed"
                        }`}
                      >
                        Unstake
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}