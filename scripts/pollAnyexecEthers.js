
const hre = require("hardhat");
const ethers=hre.ethers

const chainidtonetwork =require ("../config/chainidToNetwork")
const contractaddresses =require ("../config/contractaddresses")
const formatExplorerLink=require('../utils/explorerformat')
const abis =require ("../config/abis")
const anycalladdressobj=contractaddresses['anycalladdressobj']

module.exports = async (chainid, sourecehash) =>{


  
  console.log(`polling for anyexec on ${chainid}`)

  const networkname=chainidtonetwork[chainid]
  const rpc=hre.config['networks'][networkname]['url']
  const provider = new ethers.providers.StaticJsonRpcProvider(
    rpc)





    // console.log("the routerV7 address is "+routerv7address)
    const anycalladdress=anycalladdressobj[chainid]
    let executed=0
  const anycallcontract = new ethers.Contract(anycalladdress, abis['anycall'], provider)
  anycallcontract.on("LogAnyExec", (txhash,from,to,fromChainID,nonce,success,result,event) => {
    if (sourecehash.includes(txhash)){
      console.log('Your destination tx is executed')

      formatExplorerLink(event.transactionHash,chainid,true)
      executed=1
      
    }
    // console.log(swapoutID)
    // console.log(success)


    
}); 

  function sleep(millis) {
  return new Promise((resolve) => setTimeout(resolve, millis))
}
    let timewaited=0
    while (executed==0){
      console.log('polling for destination chain any Exec tx...')
      await sleep(2000)
      timewaited+=2
      if (timewaited>1800){
        return false
      }
    }
    
    return true
    

    
    

  
}

