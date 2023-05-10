import { http_get, ipfs_to_https} from "./utils";
import { ethers } from "ethers";
import { get_api_url } from "./utils";

const wrong_collections = ["0x5F7eb397abaf5e81236488274a1D487BFCB18344", "0x37541C88A1fbAc19833e3D8E9C0a5486fF8afC51",
                           "0x81561dEdc4b33304e3D4F91B069Ccdbc0056dc29", "0x95CeA9698BcdaC246e7342211E870cF62Abb6b34"];
export type ERC1155TokenMetadata = {
  name: string;
  description: string;
  image: string;
  external_url: string;
  generator_instance_url: string;
  animation_url: string;
  attributes: {display_type:string; trait_type:string; value:string | number }[];
  properties: object;
}

export type NFT = {
    chain: string;
    collection: string;
    token_id: string;
    owner:string;
    metadata:ERC1155TokenMetadata;
  };
   
   
   
export let get_nfts =  async (chains: string[], collection_addresses: string[], token_ids: string[], owners: string[]) : Promise<NFT[]> => 
{   
    try{
      let url = new URL(get_api_url + "/nfts")
      if (chains.length > 0) url.searchParams.append("chain", "in.(" + chains.join(",") + ")")
      if (collection_addresses.length > 0) url.searchParams.append("collection", "in.(" + collection_addresses.join(",") + ")")
      if (token_ids.length > 0) url.searchParams.append("token_id", "in.(" + token_ids.join(",") + ")")
      if (owners.length > 0) url.searchParams.append("owner", "in.(" + owners.join(",") + ")")
      return (await http_get(url.href)).map((nft: NFT) =>{
        nft.metadata.animation_url = ipfs_to_https(nft.metadata.animation_url);
        nft.metadata.external_url = ipfs_to_https(nft.metadata.external_url);
        nft.metadata.generator_instance_url = ipfs_to_https(nft.metadata.generator_instance_url);
        return nft;
      });
    } catch(err){
      // console.log("Error in get_nfts", err);
      return [];
    }
}
 
export type Collection = {
  chain: string;
  address: string;
  metadata:{
    name: string;
    description: string;
    image: string;
    external_url: string;
    generator_url: string;
  };
  price: number;
  max_supply: number;
  current_supply: number;
}
 
export let get_collections = async (chains: string[], collection_addresses: string[]) : Promise<Collection[]> =>
{
  try{
    let url = new URL(get_api_url + "/collections")
    if (chains.length > 0) url.searchParams.append("chain", "in.(" + chains.join(",") + ")")
    if (collection_addresses.length > 0) url.searchParams.append("address", "in.(" + collection_addresses.join(",") + ")")
    // // console.log("collections URL Href", url.href);
    // let res = await http_get(url.href);
    // // console.log("collections res", res, collection_addresses);
    let res = await http_get(url.href);
    // console.log("zzzcollections res", res);
    let ret = (res).map((coll: Collection) =>{return {
      ...coll,
      price: parseFloat(ethers.utils.formatUnits(coll.price.toString())),
      metadata: {
        ...coll.metadata,
        // image: ipfs_to_https(coll.metadata.image),
        generator_url: ipfs_to_https(coll.metadata.generator_url)
      }
    }}  );

    // console.log("zzzcollections ret", ret);
    return ret;
    } catch(err){
      console.log("Error in get_collections", err);
      return [];
    }
}

export type Factory = {
    chain: string;
    address: string;
}
export let get_factories = async (chains: string[], factory_addresses: string[]) : Promise<Factory[]> =>
{
  try{
    let url = new URL(get_api_url + "/factories")
    if (chains.length > 0) url.searchParams.append("chain", "in.(" + chains.join(",") + ")")
    if (factory_addresses.length > 0) url.searchParams.append("address", "in.(" + factory_addresses.join(",") + ")")
    return (await http_get(url.href));
    } catch(err){
      // console.log("Error in get_factories", err);
      return [];
    }
}