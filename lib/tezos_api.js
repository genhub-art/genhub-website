// export let api = "https://api.lay3rz.xyz/"
// // export let address_testnet = "KT1SESRLAZP3CEUEtdxD3UYS9KkPpGgDG7Fz";
// export let address_testnet = ["KT1AkfVzSNEveEQCrTEo7FKd12rSL1Ui5KYs", "KT1SESRLAZP3CEUEtdxD3UYS9KkPpGgDG7Fz"];
// export let cors_fixer = "https://higher-order-games.net:9996/";
// export let ipfsGateway =  "https://gateway.moralisipfs.com/ipfs/";
// export let tzkt_api_testnet = "https://api.ghostnet.tzkt.io/v1/";
// export let ah_address = "KT1LMJwWnqjJkTE89uQ4F2mPWqKVeE7agmkz";
// export let trigger_address = "KT19rR7aGqTLJvLCuPN5B8VL4FmBhFbY1TwW";
// export let hog_api = "https://higher-order-games.net:8088/";

// export let api = "https://mainnet-api.lay3rz.xyz/"
// export let address_testnet = ["KT1LNtmrH2LSjuVBsU7Yiu6FUwnoGHp8uqij"];
// export let tzkt_api_testnet = "https://api.tzkt.io/v1/";
// export let ah_address = "KT1UHgoi8KsFYhN67z6xrKqXEDneo1vJFzVm";
// export let trigger_address = "KT1EfG5HNuYi9jZaoffLWrdciNvPihfpCQYf";
import { wallet_address, wallet_api, wallet_tzkt_api, wallet_ah_address, wallet_trigger_address } from "./tezos_wallet";

export let hog_api = "https://higher-order-games.net:8088/";
export let cors_fixer = "https://higher-order-games.net:9996/";
export let ipfsGateway =  "https://gateway.moralisipfs.com/ipfs/";

export let api = cors_fixer + wallet_api;
export let address_testnet = wallet_address;
export let tzkt_api_testnet = wallet_tzkt_api;
export let ah_address = wallet_ah_address;
export let trigger_address = wallet_trigger_address;

let ipfs_get = async h => fetch(cors_fixer + `https://gateway.moralisipfs.com/ipfs/${h.includes("QmZH497FMjma784DBgsLYDDKKnkVy5BTAiSDgnmqBiH9ti") ? "QmZH497FMjma784DBgsLYDDKKnkVy5BTAiSDgnmqBiH9ti" : h.replace("ipfs://", "")}`);

let opts = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json'
    }
}

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  export function get_image(arr, typ){
    // console.log("TYP", typ);
    let p     = [];
    let name  = [];
    let total = 0;

    for(let i = 0; i < arr.length; i++){
        let pr, nm;
        [pr, nm] = split_name(arr[i], typ);
        p.push(pr);
        name.push(nm);
        total += pr;
    }

    let rnd = parseInt(getRandomInt(total), 10);
    let sum = 0;
    let i = -1; 
    while(sum <= rnd){
        i++;
        sum += p[i];
    }
    //console.log(i);
    //console.log(total);
    return [arr[i], parseInt((p[i] / total) * 100, 10), name[i], typ, (typ.split("_")).slice(1, typ.length).join(" ")];
}

function split_name(rest, typ){
    
    let str_p = (rest.split("_"))[0];
    let name = rest.substring(str_p.length + 1);
    // console.log("Name", name);
    name = name.replace(".png", "");
    name = name.replaceAll("_", " ");
    //console.log(str_p, name, typ);
    return [parseInt(str_p, 10), name];
}

export let upload_to_ipfs = abi =>
        fetch("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", {method: 'POST', headers:{'Content-Type': 'application/json', 'X-API-Key': 'J8VPvA8kK0Q5BEfbOXRoetIX0yWr6SJU2MgYUZDHJBciNuMui7cxhor7HXJL0WON', 'accept': 'application/json'}, body: JSON.stringify(abi)})
        .then(r => r.json())

export const toHex = (str) => {
    let hex;
    try {
        hex = unescape(encodeURIComponent(str))
        .split("")
        .map((v) => {
            return v.charCodeAt(0).toString(16);
        })
        .join("");
    } catch (e) {
        console.log("invalid text input: " + str);
    }
    return hex;
};

let prepare_variables = _ => {
    api = cors_fixer + wallet_api;
    address_testnet = wallet_address;
    tzkt_api_testnet = wallet_tzkt_api;
    ah_address = wallet_ah_address;
    trigger_address = wallet_trigger_address;
}

export let get_collections = async (url_params="") => {
    prepare_variables();
    // console.log("0: A"); 
    // console.log("API", api); 
    let url_storage = api + `contract_storage` + url_params;
    let contract_storage = await (await fetch(url_storage, opts)).json();
    let url_metadata = api + `contract_metadata` + url_params;
    let contract_metadata = await (await fetch(url_metadata, opts)).json();
    let metadata_map = new Map(contract_metadata.map(el => [el.address, el.contract_metadata]));
    let full_rev_share_map = await Promise.all(address_testnet.map(async address_testnet =>{
        let rev_share_no_url = tzkt_api_testnet + `contracts/${address_testnet}/storage`;
        let rev_share_no = (await (await fetch(rev_share_no_url, opts)).json()).fa2_rev_share;
        let rev_share_url = tzkt_api_testnet + `bigmaps/${rev_share_no}/keys?select=key,value`;
        let rev_share_map = await (await fetch(rev_share_url, opts)).json();
        return rev_share_map.map(el => [el.key, el.value]);
    }))
    // console.log("Rev share map!!!", full_rev_share_map);

    let rev_share_map = new Map(full_rev_share_map.flat());

    // console.log("Rev share map", rev_share_map);

    let res = [];
    // console.log("Contract Storage", contract_storage);
    for(let el of contract_storage){

        let curr_address = el.address;
        if(curr_address === "KT1Sdh3MppJqC4kwwmYG6hV3K323uoVkSkft") continue;
        let tmd = metadata_map.get(curr_address);
        let layers_url = decodeURIComponent((el.storage.layers_folder).replace(/\s+/g, '').replace(/[0-9a-f]{2}/g, '%$&'));
        let layers_folder = await fetch(cors_fixer + `https://gateway.moralisipfs.com/ipfs/${layers_url.replace("ipfs://", "")}`)
        //console.log("LAYERS URL", layers_folder); 
        // Here
        let preview = "";

        if(tmd === null || typeof tmd === "undefined") continue;

        if((tmd.preview).includes("ipfs://")){
            preview = `https://gateway.moralisipfs.com/ipfs/${(tmd.preview).replace("ipfs://", "")}`;
        }
        else preview = tmd.preview;

        let white_bigmap = el.storage.lazy_mint.whitelist;
        let whitelisted_accounts_url = tzkt_api_testnet + `bigmaps/${white_bigmap}/keys?select=key&active=true`
        let whitelisted_accounts = await (await fetch(whitelisted_accounts_url, opts)).json();
        // console.log("No error here!!!!", api, address_testnet, tzkt_api_testnet, ah_address, trigger_address);
        let rev_amount = (await get_rev(rev_share_map.get(curr_address), 0)).total_sum;
        // let rev_amount = 0;
        // console.log("No error here 2!!!!");
        // console.log("Rev Amount", rev_amount);
        let item = {
            address: curr_address,
            get_max_tid: el.storage.lazy_mint.max_non_inclusive,
            get_current_tid: el.storage.lazy_mint.current,
            get_admin: el.storage.lazy_mint.admin,
            get_price: el.storage.lazy_mint.price / 1000000,
            get_time: el.storage.lazy_mint.start_timestamp,
            get_enabled: el.storage.lazy_mint.enabled,
            get_md: tmd,
            get_rev_address: rev_share_map.get(curr_address),
            get_rev_amount: rev_amount,
            get_whitelists: el.storage.lazy_mint.use_whitelist,
            get_whitelisted_accounts: whitelisted_accounts,
            get_white_bigmap: el.storage.lazy_mint.whitelist,
            get_layers:layers_folder.url + "/",
            get_image: preview, // Here
            get_description: tmd.description,
            get_title: tmd.name
        }
        if(el.storage.lazy_mint.funding_goal === null) {
            item.has_goal = false;
        }
        else {
            item.has_goal            =  true;
            item.goal_completed      = el.storage.lazy_mint.funding_goal.completed;
            item.goal_deadline       = el.storage.lazy_mint.funding_goal.deadline;
            item.goal_tez            = el.storage.lazy_mint.funding_goal.tez;
            if(el.storage.lazy_mint.funding_goal.completed){
                item.mutez_earned = el.storage.lazy_mint.funding_goal.tez;
                
                // console.log("With goal completed", item);
            }
            else{ 
                let mutez_earned_url = tzkt_api_testnet + `accounts/${curr_address}/balance`;
                item.mutez_earned    = await (await fetch(mutez_earned_url, opts)).json();
                // console.log("With goal not completed", item);
                // if((new Date(el.storage.lazy_mint.funding_goal.deadline)).getTime() < (new Date()).getTime()){
                    // console.log("Here 1")
                    

                    // // // continue;
                    // let contract_url = tzkt_api_testnet + `contracts/${curr_address}/storage`;
                    // let purch_bigmap = (await (await fetch(contract_url, opts)).json()).lazy_mint.purchases;
                    // let purch_url    = tzkt_api_testnet + `bigmaps/${purch_bigmap}/keys?key=${owner}&select=value&active=true`;
                    // let refund_arr   = (await (await fetch(purch_url, opts)).json());
                    // if(refund_arr.length === 0) continue;
                    // refund_arr = refund_arr.map(el => parseInt(el));
                    // let refund_val   = refund_arr.reduce((accumulator, value) => (accumulator + value), 0);
                    // item.refund_val  = refund_val;
                // }
            }
        }
        // console.log("Contract Storage", item);

        res.push(item);
    }
    
    return res;

}

export let get_refund_val = async (address, owner) => {
    prepare_variables();
    let contract_url = tzkt_api_testnet + `contracts/${address}/storage`;
    let purch_bigmap = (await (await fetch(contract_url, opts)).json()).lazy_mint.purchases;
    let purch_url    = tzkt_api_testnet + `bigmaps/${purch_bigmap}/keys?key=${owner}&select=value&active=true`;
    let refund_arr   = (await (await fetch(purch_url, opts)).json());
    if(refund_arr.length === 0) return 0;;
    refund_arr = refund_arr.map(el => parseInt(el));
    return refund_arr.reduce((accumulator, value) => (accumulator + value), 0);
    
}

export let get_rev = async (address, id) => {
    prepare_variables();
    // console.log("0: C"); 
    let total_map    = new Map();
    let to_claim_map = new Map();
    let to_claim = -1;
    let total = 0;
    let total_sum = 0;
    // console.log("No error here!!!!", api, address_testnet, tzkt_api_testnet, ah_address, trigger_address);
    let rev_share_storage_url = tzkt_api_testnet + `contracts/${address}/storage`;
    let rev_share_storage = await (await fetch(rev_share_storage_url, opts)).json();
    let max_tez_per_token = parseInt(rev_share_storage.max_tez_per_token);
    let distributed_rev_url = tzkt_api_testnet + `bigmaps/${rev_share_storage.distributed}/keys`;
    let distributed_rev = await (await fetch(distributed_rev_url, opts)).json();
    // console.log("Rev Share", max_tez_per_token, distributed_rev)

    for(let i = 0; i < distributed_rev.length; i ++){
        to_claim_map.set(parseInt(distributed_rev[i].key), (max_tez_per_token - parseInt(distributed_rev[i].value)) / 1000000);
    }

    if(to_claim_map.has(id)) to_claim = to_claim_map.get(id)

    if(!rev_share_storage.nft_earnings) return {address, total, to_claim, total_sum};
    
    let nft_earnings_url = tzkt_api_testnet + `bigmaps/${rev_share_storage.nft_earnings}/keys`;
    let nft_earnings = await (await fetch(nft_earnings_url, opts)).json();

    for(let i = 0; i < nft_earnings.length; i ++){
        total_map.set(parseInt(nft_earnings[i].key), (parseInt(nft_earnings[i].value)) / 1000000);
    }

    if(total_map.has(id)) total = total.get(id)

    // console.log("Here at Rev Share", {address, total, to_claim, total_sum});

    return {address, total, to_claim, total_sum};

}

export let get_nfts = async (url_params="") => { 
    prepare_variables();
    let url_nfts = api + `contract_tokens` + url_params;
    let nfts = await (await fetch(url_nfts, opts)).json();
        nfts = await Promise.all(nfts.map(async nft => {
            // console.log("NFT url", (await ipfs_get(nft.token_metadata.displayUri)).url);
            return {id: nft.token_id, name: nft.token_metadata.name, image: (await ipfs_get(nft.token_metadata.displayUri)).url, 
                    owner: nft.owner, attributes: nft.token_metadata.attributes, address: nft.address};
        }));

    return nfts;

}

export let get_ah_offers = async (url_params="") => {
    prepare_variables();
    let url_ah_offers = tzkt_api_testnet + "bigmaps/170959/keys" + url_params;

    let ah_offers = await (await fetch(url_ah_offers, opts)).json();

    // console.log("Ah Offers are", ah_offers);

    let nfts = await get_nfts();

    // console.log("AH NFTs", nfts);

    let operators_map = new Map();

    let res = [];

    for(let ah_offer of ah_offers){

        // console.log("AH offer one", ah_offer);
        
        let curr_nft = nfts.filter(nft => (nft.id === parseInt(ah_offer.key.nat) && nft.address === ah_offer.key.address && 
                       nft.owner === ah_offer.value.address));

        // console.log("Curr nft", curr_nft);
        
        if(curr_nft.length === 0){

            continue;
        }

        if(!operators_map.has(ah_offer.key.address)){

            let operators_bigmap_url = tzkt_api_testnet + `contracts/${ah_offer.key.address}/storage`;
            let operators_bigmap = (await (await fetch(operators_bigmap_url, opts)).json()).assets.operators;
            let operators_url = tzkt_api_testnet + `bigmaps/${operators_bigmap}/keys`;
            operators_map.set(ah_offer.key.address, await (await fetch(operators_url, opts)).json());

        }

        // console.log("Opperators", operators_map.get(ah_offer.key.address));

        let curr_operators = operators_map.get(ah_offer.key.address).filter(operator => 
                             (operator.key.nat === ah_offer.key.nat && operator.key.address_0 === ah_offer.value.address && 
                             operator.key.address_1 === ah_address && operator.active === true));

        // console.log("Curr operators", curr_operators);

        if(curr_operators.length === 0){
            
            continue;
        }

        let curr_res = curr_nft[0];

        curr_res.price = parseInt(ah_offer.value.mutez);

        res.push(curr_res);

    }

    // console.log("Result", res);

    return res;

}
    