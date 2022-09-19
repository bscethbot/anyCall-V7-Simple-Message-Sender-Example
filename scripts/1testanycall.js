const hre = require("hardhat");
const ethers=hre.ethers
const {network} =require("hardhat")
const { getDeploymentAddresses } = require("../utils/readStatic")
const chainidToNetwork = require("../config/chainidToNetwork")
const pollAnyexec=require('./pollAnyexecEthers')
const formatExplorerLink=require('../utils/explorerformat')
const axios = require('axios');



function sleep(millis) {
    return new Promise((resolve) => setTimeout(resolve, millis))
  }

async function testanycall(){
    const chainid=network.config.chainId

    const allchainids=[4,4002]
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

        console.log(`changed receiver result ${changerecieverlog}`)
        changerecieverlog.wait(1)
    }
    else{
        console.log('receiver is correct')
    }

    console.log('issue anycall now')
    // 0.0003 ether 300000000000000
    const anycallstep1log=await contract.step1_initiateAnyCallSimple_srcfee(expectedreceiver,{value:'300000000000000'})
    console.log(anycallstep1log.hash)
    formatExplorerLink(anycallstep1log.hash,chainid)
    const executedbool=await pollAnyexec(destchainid,anycallstep1log.hash)
    console.log(`executedbool is ${executedbool}`)
    return executedbool
}

async function pushover(){
    const data = {
        token: 'aafcr7mhw2iqnucyovjaafx8ofc969',
        user: 'ubewsmv2ynv55s4nxrz7o9depcjay9',
        message:'anycall fail',

    }

    const res =await axios.post('https://api.pushover.net/1/messages.json', data)

    console.log(`Status: ${res.status}`);
    console.log('Body: ', res.data);
}

async function main() {
   

    while (true){
    const anycallbool=await testanycall()

    if (anycallbool!=true){
        console.log('anycall failed')

        for (let i = 0; i < 10; i++) { 

        console.log('sending notification')
        await pushover()
        await sleep(180000)
    }

    }
    console.log('sleep a bit now')
    await sleep(600000)

}
  
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.


  
  
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;})




