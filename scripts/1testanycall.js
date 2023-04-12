require('@oasisprotocol/sapphire-hardhat');
const hre = require("hardhat");
const ethers=hre.ethers
const {network} =require("hardhat")
const { getDeploymentAddresses } = require("../utils/readStatic")
const chainidToNetwork = require("../config/chainidToNetwork")
const pollAnyexec=require('./pollAnyexecEthers')
const formatExplorerLink=require('../utils/explorerformat')



function sleep(millis) {
    return new Promise((resolve) => setTimeout(resolve, millis))
  }

// edit this to change the msg sent cross-chain
const customMessage='Proof of cross-chain anyCall msg'

async function testanycall(){
    const chainid=network.config.chainId

    const allchainids=[137,23294]
    let destchainid = allchainids.filter(x => x!=chainid)[0]
    const targetNetwork=chainidToNetwork[destchainid]

    console.log(`youre going from ${chainid} to ${destchainid+targetNetwork}`)


    //dest address
    const expectedreceiver = getDeploymentAddresses(targetNetwork)["Anycalltestboth"]


    
    const contract = await ethers.getContract("Anycalltestboth")
    const receiver=await contract.receivercontract()
    console.log(`receiver is ${receiver}`)
    console.log(`expected receiver is ${expectedreceiver}`)
    
    if (receiver!=expectedreceiver){
        const changerecieverlog=await contract.changedestinationcontract(expectedreceiver)

        console.log(`changed receiver`)
        changerecieverlog.wait(3)
    }
    else{
        console.log('receiver is correct')
    }

    console.log('issue anycall now')

    const anycallstep1log=await contract.step1_initiateAnyCallSimple_srcfee(customMessage,{value:'30000000000000000'})
    await anycallstep1log.wait(1);
    console.log('Your anyCall tx is below')
    formatExplorerLink(anycallstep1log.hash,chainid,false)
    const executedbool=await pollAnyexec(destchainid,anycallstep1log.hash)
    console.log(`executedbool is ${executedbool}`)
    return executedbool
}


async function main() {
   


    const anycallbool=await testanycall()

    if (anycallbool==true){
        console.log('Your cross-chain message is successful')

    }


}
  
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.


  
  
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;})




