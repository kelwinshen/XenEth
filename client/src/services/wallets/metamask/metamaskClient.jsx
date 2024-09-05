import { ethers } from "ethers";
import { useContext, useEffect } from "react";
import { MetamaskContext } from "../../../contexts/MetamaskContext";
import Swal from "sweetalert2";
import abiData  from "../../../contractJson/XenEth.json";



export const switchToSepoliaTestnetNetwork = async (ethereum) => {
  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: "0xAA36A7" }] // chainId must be in hexadecimal numbers
    });
  } catch (error) {
    if (error.code === 4902) {
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainName: `Sepolia test network`,
              chainId: "0xAA36A7",
              nativeCurrency: {
                name: 'SepoliaETH',
                symbol: 'SepoliaETH',
                decimals: 18
              },
              rpcUrls: ["https://sepolia.infura.io/v3/"]
            },
          ],
        });
      } catch (addError) {
        console.error(addError);
      }
    }
    console.error(error);
  }
}

const ethereum = window.ethereum;
const getProvider = () => {
  if (!ethereum) {
    throw new Error("Metamask is not installed! Go install the extension!");
  }
  return new ethers.BrowserProvider(ethereum);
}

// returns a list of accounts
// otherwise empty array
export const connectToMetamask = async () => {
  const provider = getProvider();

  // keep track of accounts returned
  let accounts = []

  try {
    await switchToSepoliaTestnetNetwork(ethereum);
    accounts = await provider.send("eth_requestAccounts", []);
  } catch (error) {
    if (error.code === 4001) {
      // EIP-1193 userRejectedRequest error
      console.warn("Please connect to Metamask.");
    } else {
      console.error(error);
    }
  }

  return accounts;
}

class MetaMaskWallet {
  

  // Purpose: Transfer HBAR
  // Returns: Promise<string>
  // Note: Use JSON RPC Relay to search by transaction hash


  async getTemplate  ()  {
   
    const provider = getProvider();
    const signer = await provider.getSigner();
    const contractAddress = '0x5D0e7eA09Dc8f5D2Ce5384DF938f633E26bdF730';
    const abi = abiData.abi;
    const contract = new ethers.Contract(contractAddress, abi, signer)
    // Return the contract instance along with the user address
    return {contract, signer};
  }
  


    
  async donate  (recipientId, message, donorName, amount)  {

    const {contract, signer}  = await this.getTemplate();
  const tx = await contract.donate(recipientId, message, donorName, { value: ethers.parseEther(amount) });
  await tx.wait();
}


async registerUser  (name){
  const {contract, signer}  = await this.getTemplate();
  const tx = await contract.registerUser(name);
  await tx.wait();
 
}

async changeUserName  (oldName, newName)  {
  const {contract, signer}   = await this.getTemplate();
  const tx = await contract.changeUserName(oldName, newName);
  await tx.wait();
}


 async getDonations  ()  {

  const {contract, signer} = await this.getTemplate();

  const donations = await contract.getDonationsByAddress(signer.address);
  return {donations};
}

async getDonationsByRecipientId  (recipientId)  {

  const {contract, signer}   = await this.getTemplate();

  const donations = await contract.getDonationsByRecipientId(recipientId);
  return {donations};
}

async getDonateStatistic () {
  const {contract, signer}   = await this.getTemplate();

  const donateStatistic = await contract.getUserDonationStats();

  const donateStatisticTotal = ethers.formatEther(donateStatistic.total);
  const donateStatisticAvailable = ethers.formatEther(donateStatistic.available);
  const donateStatisticWithdrawn =  ethers.formatEther(donateStatistic.withdrawn)
  return {donateStatisticTotal, donateStatisticAvailable, donateStatisticWithdrawn};


}


async withdraw  ()  {

  const {contract, signer}   = await this.getTemplate();
  const tx = await contract.withdraw();
  await tx.wait();
}

async getUserInfo ()  {
  const {contract, signer}   = await this.getTemplate();
  const userInfo = await contract.getUserInfo();
  return {userInfo};
}

async isNameRegistered (recipientId) {

  const {contract, signer}  = await this.getTemplate();
  const nameRegistered = await contract.isNameRegistered(recipientId);
  return {nameRegistered};
}
  

  disconnect() {
    Swal.fire({
      background: "#353535",
      iconColor: "#ffffff",
      confirmButtonColor: "#5D6064",
      title: "Hello!\nTo security reason, please use your metamask wallet to disconnect.",
      customClass: { title: "text-white" },
      icon: "info",
      confirmButtonText: "Okay",
    });
  }
};

export const metamaskWallet = new MetaMaskWallet();

export const MetaMaskClient = () => {
  const { setMetamaskAccountAddress } = useContext(MetamaskContext);
  useEffect(() => {
    try {
      const provider = getProvider();
      provider.listAccounts().then((signers) => {
        if (signers.length !== 0) {
          setMetamaskAccountAddress(signers[0].address, "");
        } else {
          setMetamaskAccountAddress("", "");
        }
      });

      ethereum.on("accountsChanged", (accounts) => {
        if(accounts.length > 1){
  window.location.reload();
        }
        if (accounts.length !== 0) {
          setMetamaskAccountAddress(accounts[0], "");
        } else {
          setMetamaskAccountAddress("", "");
        
        }
       
      });

      return () => {
        ethereum.removeAllListeners("accountsChanged");
      }
    } catch (error) {
      console.warn(error.message ? error.message : error);
    }
  }, [setMetamaskAccountAddress]);
}
