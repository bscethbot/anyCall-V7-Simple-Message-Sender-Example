require('@oasisprotocol/sapphire-hardhat');
require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")

const bnbtestnetrpc=process.env.bnbtestnetrpc
const prvkey=process.env.prvkey
const bscscanapi=process.env.bscscanapi
const ftmtestnetrpc=process.env.ftmtestnetrpc
const ftmscanapi=process.env.ftmscanapi
const sapphirerpc=process.env.sapphirerpc
const polygonrpc=process.env.polygonrpc

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
    sapphire:{
      url:sapphirerpc,
      accounts:[prvkey],
      chainId:23294,
      blockConfirmations:1,
    },
    polygon:{
      url:polygonrpc,
      accounts:[prvkey],
      chainId:137,
      blockConfirmations:5,
    },
    polygonmumbai:{
      url:mumbairpc,
      accounts:[prvkey],
      chainId:80001,
      blockConfirmations:5,
    },
    goerli:{
      url:process.env.goerlirpc,
      accounts:[prvkey],
      chainId:5,
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

    goerli:process.env.goerliscanapi
  }},
  namedAccounts:{
    testnetdeployer:{
      default:0,
    },
    maindeployer:{
      default:0,
    }
  }
};
