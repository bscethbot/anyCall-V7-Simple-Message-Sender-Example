 This repo would deploy a solidity contract on two chains and send a text message from chain A to chain B.
 This is purposed to showcase anyCall V7 cross-chain messaging capability. 
 
0. Set up the environments with yarn or npm
yarn || npm install

 1. add prvkey in .env.example file and add etherscan apis if you want to auto verify. Change the .env.example filename to .env

 2. Deploy the example contract on ftm testnet and bnb testnet. Make sure you have gas tokens on both chains.
 Run these two commands:
"yarn hardhat deploy --network ftmtest"
"yarn hardhat deploy --network bnbtest"

3. Test the flow by running the below command. (You can change customMessage in 1testanycall.js to change the message sent)
 yarn hardhat run ./scripts/1testanycall.js --network ftmtest