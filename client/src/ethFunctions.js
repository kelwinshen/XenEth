import { ethers } from 'ethers';
// import abi from "./contractJson/XenEth.json";

const contractAddress = '0x2Ca85717310E04c0dfB927736c30b9e1Db2e53Fe';
const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "string",
          "name": "recipientId",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "donor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "message",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "donorName",
          "type": "string"
        }
      ],
      "name": "DonationReceived",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "addressToName",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "admin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "balances",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "oldName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "newName",
          "type": "string"
        }
      ],
      "name": "changeUserName",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "recipientId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "message",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "donorName",
          "type": "string"
        }
      ],
      "name": "donate",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "donations",
      "outputs": [
        {
          "internalType": "address",
          "name": "donor",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "message",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "donorName",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "getDonationsByAddress",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "donor",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "message",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "donorName",
              "type": "string"
            }
          ],
          "internalType": "struct XenEth.Donation[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getUserInfo",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "registerUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "users",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdrawFees",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ];


// Function to initialize the contract

export const getTemplate = async () => {
  if (!window.ethereum) throw new Error('No crypto wallet found. Please install it.');

  // Request accounts from the user
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'   });

  const userAddress = accounts[0]; // Get the first account address

  // Create an Ethereum provider and signer
  const provider = new ethers.BrowserProvider(window.ethereum); 
  const signer = await provider.getSigner();
//   const signature = await signer.signMessage(userAddress);
  
  
  // Return the contract instance along with the user address
  return { contract: new ethers.Contract(contractAddress, abi, signer), signer, provider, userAddress};
};


  
  export const registerUser = async (name) => {
    const { contract, userAddress } = await getTemplate();

 
    const tx = await contract.registerUser(name);
    await tx.wait();
  };
  
  export const changeUserName = async (oldName, newName) => {

    const { contract, userAddress } = await getTemplate();
    const tx = await contract.changeUserName(oldName, newName);
    await tx.wait();
  };
  
  export const getDonations = async () => {

    const { contract, userAddress } = await getTemplate();

    const donations = await contract.getDonationsByAddress(userAddress);
    return {donations, userAddress};
  };
  
  export const donate = async (recipientId, message, donorName, amount) => {

    const { contract, userAddress } = await getTemplate();
    const tx = await contract.donate(recipientId, message, donorName, { value: ethers.parseEther(amount) });
    await tx.wait();
  };
  
  export const withdraw = async () => {

    const { contract, userAddress } = await getTemplate();
    const tx = await contract.withdraw();
    await tx.wait();
  };


  export const getUserInfo = async () => {

    const { contract, userAddress } = await getTemplate();
    const userInfo = await contract.getUserInfo();
    return {userInfo, userAddress};
  };

