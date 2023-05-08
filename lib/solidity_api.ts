import {Collection, get_factories} from "./blockchainsTS";
import { ethers } from "ethers";
import { factory_abi, collection_abi } from "./abis";
import { solidity } from "./blockchains"
import {http_get} from "./utils";
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
    let factory_address = (await get_factories([collection.chain], []))[0].address;
    const factoryContract = new ethers.Contract(
      factory_address,
      factory_abi,
      signer
    );
      
    // return;
    // Call the 'deploy' function on the factory contract
    const deployTx = await factoryContract.deploy(collection.metadata, collection.max_supply, 
                                                  ethers.utils.parseUnits(collection.price.toString(), 'ether'));
    await deployTx.wait();
    await fetch(cors_fixer + "https://nftm-indexer-s5knoljafq-ey.a.run.app/");
  };

  export const mint_nft = async (
      collection_address: string,
      price: number,
      window: any
    ) => {
    let rpc_url = rpc_urls["bsc_testnet"];
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // let temp_coll_address = "0x95CeA9698BcdaC246e7342211E870cF62Abb6b34";
    const collectionContract = new ethers.Contract(
      collection_address,
      collection_abi,
      signer
    );
    // return;
    let price_string;
    if(price < 0.000000001) price_string = price.toFixed(20).toString(); else price_string = price.toString();
    const tx = await collectionContract.mint("", { value:  ethers.utils.parseUnits(price_string, "ether")});
    await tx.wait();
    await fetch(cors_fixer + "https://nftm-indexer-s5knoljafq-ey.a.run.app/");
  }

// export let create_collection = async (c:Collection) => {

  
// }

