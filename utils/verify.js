const {run}=require("hardhat")

async function verify(contractAddress,args){
    console.log('verifying contract...')
    try{
    await hre.run("verify:verify",
    {address:contractAddress,
     constructorArguments:args,
    })}
    catch(e){
        console.log(e)
    }
}

module.exports={verify}