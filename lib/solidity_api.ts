import { Collection } from "./blockchainsTS";
import { ethers } from "ethers";
import { factory_abi, collection_abi } from "./abis";
import { solidity } from "./blockchains"
let factory_address = "0x9493a61C8DBA11b0c3428cE947fb20CA7b2016f1";
export let cors_fixer = "https://higher-order-games.net:9996/";

let rpc_urls = {
    bsc_testnet: "https://data-seed-prebsc-1-s1.binance.org:8545",
    bsc_mainnet: "https://bsc-dataseed.binance.org/",
    polygon_testnet: "https://rpc-mumbai.maticvigil.com/",
    polygon_mainnet: "https://rpc-mainnet.maticvigil.com/",
    ethereum_testnet: "https://rinkeby.infura.io/v3/6b1b6b0b0b9a4b6e8b0b0b0b0b0b0b0b",
    ethereum_mainnet: "https://mainnet.infura.io/v3/6b1b6b0b0b9a4b6e8b0b0b0b0b0b0b0b"
}

export const create_collection = async (
    collection: Collection,
    window: any
  ) => {
    if(!collection.metadata) return;
    console.log("Collection metadata", collection.metadata);
    let rpc_url = rpc_urls[collection.chain];
    // let provider = new ethers.providers.JsonRpcProvider(rpc_url)
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const factoryContract = new ethers.Contract(
      factory_address,
      factory_abi,
      signer
    );
  
    // Call the 'deploy' function on the factory contract
    const deployTx = await factoryContract.deploy(collection.metadata, ethers.utils.parseUnits(collection.price.toString(), 'ether'), collection.max_supply);
    await deployTx.wait();
    await fetch(cors_fixer + "https://nftm-indexer-s5knoljafq-ey.a.run.app/");
  };

  export const mint_nft = async (window: any) => {
    let rpc_url = rpc_urls["bsc_testnet"];
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let temp_coll_address = "0x6221bFe5a1dd8b0071049690c6f7840BAea45D49";
    // let temp_coll_address = "0x95CeA9698BcdaC246e7342211E870cF62Abb6b34";
    const factoryContract = new ethers.Contract(
      temp_coll_address,
      collection_abi,
      signer
    );
    const deployTx = await factoryContract.mint({ value:  ethers.utils.parseUnits("0.1"), gasLimit: 1000000, nonce: undefined});
    // const deployTx = await factoryContract.mint({ value:  ethers.utils.parseUnits("0.1"), gasLimit: Math.ceil(100000 * 1.1)});
    // const deployTx = await factoryContract.mint({ value:  ethers.utils.parseUnits("0.1"), gasLimit: 300000, nonce: undefined});
    // const deployTx = await factoryContract.mint({ value:  ethers.utils.parseUnits("0.1")}, {gasLimit: 300000, nonce: undefined});
    // const deployTx = await factoryContract.mint({ value:  });
    await deployTx.wait();
  }

// export let create_collection = async (c:Collection) => {

  
// }

