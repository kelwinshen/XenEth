require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: API_URL,
      accounts: [PRIVATE_KEY]
    }
  }
};

// CA:0x445E03b6Ada522604670141A673ac87D78E19ca5