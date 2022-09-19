require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require('./tasks')
const bnbtestnetrpc=process.env.bnbtestnetrpc
const prvkey=process.env.prvkey
const bscscanapi=process.env.bscscanapi
const ftmtestnetrpc=process.env.ftmtestnetrpc
const ftmscanapi=process.env.ftmscanapi
const rinkebyrpc=process.env.rinkebyrpc
const rinkebyscanapi=process.env.rinkebyscanapi

const mumbairpc=process.env.mumbairpc
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity:{
    compilers: [
      {
        version: "0.8.10",
      },
      {
        version: "0.6.12",
        settings: {},
      },
    ],   
},
  defaultNetwork:"hardhat",
  networks:{
    bnbtest:{
      url:bnbtestnetrpc,
      accounts:[prvkey],
      chainId:97,
      blockConfirmations:4,
    },
    ftmtest:{
      url:ftmtestnetrpc,
      accounts:[prvkey],
      chainId:4002,
      blockConfirmations:1,
    },
    rinkeby:{
      url:rinkebyrpc,
      accounts:[prvkey],
      chainId:4,
      blockConfirmations:5,
    },
    polygonmumbai:{
      url:mumbairpc,
      accounts:[prvkey],
      chainId:80001,
      blockConfirmations:5,
    }
  },
  solidity:{
    version: "0.8.10",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan:{apiKey:{
    bscTestnet:bscscanapi,
    ftmTestnet:ftmscanapi,
    rinkeby:rinkebyscanapi
  }},
  namedAccounts:{
    testnetdeployer:{
      default:0,
    },
    maindeployer:{
      default:1,
    }
  }
};
