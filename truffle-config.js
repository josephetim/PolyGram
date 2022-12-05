require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')
// const mnemonicPhrase = process.env.MNEMONIC.toString().trim()
const API_KEY = process.env.ALCHEMY_API_KEY

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*', // Match any network id
    },
    matic: {
      provider: () => new HDWalletProvider({
        mnemonic: {
          phrase: process.env.MNEMONIC
        },
        providerOrUrl: `https://polygon-mumbai.g.alchemy.com/v2/${API_KEY}`
      }),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 6000000,
      gasPrice: 10000000000,
      from : "0x56dF8871645ba004d1E7AeBD01A787C5dCB9B91e"
    },
  },
  contracts_build_directory: './src/abis/',
 compilers: {
   solc: {
     version: "^0.6",
     optimizer: {
       enabled: true,
       runs: 200,
     },
   },
 },
}
