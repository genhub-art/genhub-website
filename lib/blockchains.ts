type NFT = {
    chain: string;
    collection: string;
    token_id: string;
    metadata:{
      name: string;
      description: string;
      image: string;
      external_url: string;
      attributes: {name:string; value:string}[];
    }
  };
   
  let get_api_url = "https://nftm-postgrest-s5knoljafq-ew.a.run.app"
   
  let http_get = (url: string) => fetch(url).then((res) => res.json());
   
  export let get_nfts =  (chains: string[], collection_addresses: string[], token_ids: string[]) : Promise<NFT[]> => 
  {   
      let url = new URL(get_api_url + "/nfts")
      if (chains.length > 0) url.searchParams.append("chain", "in.(" + chains.join(",") + ")")
      if (collection_addresses.length > 0) url.searchParams.append("collection_address", "in.(" + collection_addresses.join(",") + ")")
      if (token_ids.length > 0) url.searchParams.append("token_id", ".in(" + token_ids.join(",") + ")")
   
      return http_get(url.href)
  }
   
  type Collection = {
    chain: string;
    address: string;
    metadata:{
      name: string;
      description: string;
      image: string;
      external_url: string;
    }
  }
   
  export let get_collections = (chains: string[], collection_addresses: string[]) : Promise<Collection[]> =>
  {
      let url = new URL(get_api_url + "/collections")
      if (chains.length > 0) url.searchParams.append("chain", "in.(" + chains.join(",") + ")")
      if (collection_addresses.length > 0) url.searchParams.append("address", "in.(" + collection_addresses.join(",") + ")")
   
      return http_get(url.href)
  } 