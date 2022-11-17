
const {network} =require("hardhat")
const {verify}=require("../utils/verify")
const contractaddresses =require ("../config/contractaddresses")
const formatExplorerLink=require('../utils/explorerformat')
const anycalladdressobj=contractaddresses['anycalladdressobj']

module.exports = async ({getNamedAccounts,deployments})=>{
  const {deploy,log}=deployments
  const {testnetdeployer}=await getNamedAccounts()
  const chainid=network.config.chainId
  log(`youre workign with network ${chainid}`)


  const allchainids=['97','4002']
  let destchainid = allchainids.filter(x => x!=chainid)
  console.log(`dest chain id is ${destchainid}`)
  let anycalladdress
  if (!anycalladdressobj[chainid]){
    throw 'no anycall address'
    anycalladdress='0xD7c295E399CA928A3a14b01D760E794f1AdF8990'
  }
  else{
    anycalladdress=anycalladdressobj[chainid]
  }
  
  const args=[anycalladdress,destchainid[0]]
  const anycalltest=await deploy("Anycalltestboth",{
    from:testnetdeployer,
    args:args,
    log:true,
    waitConfirmations:network.config.blockConfirmations||1,

  })
  log("deployed anycalltest")
  if (chainid!=31337){
    await verify(anycalltest.address,args)
  }

}


