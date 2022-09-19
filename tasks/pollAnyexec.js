


const contractaddresses =require ("../config/contractaddresses")


module.exports = async function (taskArgs, hre) {
  const sourcehash = taskArgs.sourcehash
  const ethers=hre.ethers
  console.log('try bridge funds and anycall on routerV7 now')
    const chainid=hre.network.config.chainId
    console.log(chainid)



    const routerv7address=contractaddresses['routerv7'][chainid]


    console.log("the routerV7 address is "+routerv7address)

    const routerV7Factory = await ethers.getContractFactory("MultichainV7Router");
    const routerV7contract = await routerV7Factory.attach(
      routerv7address// The deployed contract address
);
    routerV7contract.on("LogAnySwapInAndExec", (event) => {
    console.log(event);
}); 

  function sleep(millis) {
  return new Promise((resolve) => setTimeout(resolve, millis))
}
    while (true){
      console.log('polling...')
      await sleep(2000)
    }
    

  
}

