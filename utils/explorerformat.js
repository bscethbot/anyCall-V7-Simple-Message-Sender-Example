module.exports = async function formatExplorerLink(txhash,chainid,isEventbool){
    const chainidToExplorer={
        '80001':'https://mumbai.polygonscan.com/tx/',
        '97':'https://testnet.bscscan.com/tx/',
        '4':'https://rinkeby.etherscan.io/tx/',
        '4002':'https://testnet.ftmscan.com/tx/',
        '137':'https://polygonscan.com/tx/',
        '23294':'https://explorer.sapphire.oasis.io/tx/',
    }

    let url=`${chainidToExplorer[chainid]}${txhash}`

    if (isEventbool){
        url+='#eventlog'
    }
    console.log(url)
    return url
}