import { OpKind, TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { SigningType } from "@airgap/beacon-sdk";
//import config from "../config";
// TODO: Change back to ghostnet or to other testnet address!!!!!!
// const preferredNetwork = "ghostnet";
let preferredNetwork = "mainnet";
let options = {
  name: "Reckless",
  iconUrl: "https://tezostaquito.io/img/favicon.png",
  preferredNetwork: preferredNetwork,
};
// const rpcURL = "https://ghostnet.smartpy.io";
let rpcURL = "https://mainnet.smartpy.io";
let wallet = {mainnet: "nothing", ghostnet: "nothing"};
export let wallet_api = "https://mainnet-api.lay3rz.xyz/"
export let wallet_address = ["KT1LNtmrH2LSjuVBsU7Yiu6FUwnoGHp8uqij"];
export let wallet_tzkt_api = "https://api.tzkt.io/v1/";
export let wallet_ah_address = "KT1UHgoi8KsFYhN67z6xrKqXEDneo1vJFzVm";
export let wallet_trigger_address = "KT1EfG5HNuYi9jZaoffLWrdciNvPihfpCQYf";

const getWallet = _ => {
  if(wallet[preferredNetwork] === "nothing")
    wallet[preferredNetwork] = new BeaconWallet(options);
}

const getActiveAccount = async () => {
  getWallet();
  return {wallet: await wallet[preferredNetwork].client.getActiveAccount()};
};

export let prepareVariables = (network) => {
  
  preferredNetwork = network;
  
  if(network === "mainnet"){
    wallet_api = "https://mainnet-api.lay3rz.xyz/"
    wallet_address = ["KT1LNtmrH2LSjuVBsU7Yiu6FUwnoGHp8uqij"];
    wallet_tzkt_api = "https://api.tzkt.io/v1/";
    wallet_ah_address = "KT1UHgoi8KsFYhN67z6xrKqXEDneo1vJFzVm";
    wallet_trigger_address = "KT1EfG5HNuYi9jZaoffLWrdciNvPihfpCQYf";
    rpcURL = "https://mainnet.smartpy.io";
  }
  else{
    preferredNetwork = "ghostnet";
    wallet_api = "https://api.lay3rz.xyz/"
    wallet_address = ["KT1AkfVzSNEveEQCrTEo7FKd12rSL1Ui5KYs", "KT1SESRLAZP3CEUEtdxD3UYS9KkPpGgDG7Fz"];
    wallet_tzkt_api = "https://api.ghostnet.tzkt.io/v1/";
    wallet_ah_address = "KT1LMJwWnqjJkTE89uQ4F2mPWqKVeE7agmkz";
    wallet_trigger_address = "KT19rR7aGqTLJvLCuPN5B8VL4FmBhFbY1TwW";
    rpcURL = "https://ghostnet.smartpy.io";
  }
  
  options.preferredNetwork = preferredNetwork;
  // console.log("0: B"); 
}

export async function connectWallet(network){
  prepareVariables(network);
  getWallet();
  let account = await wallet[preferredNetwork].client.getActiveAccount();

  if (!account) {
    await wallet[preferredNetwork].requestPermissions({
      network: { type: preferredNetwork },
    });
    account = await wallet[preferredNetwork].client.getActiveAccount();
  }
  return { success: true, wallet: account.address, pk : account.publicKey};
};

export async function connectWalletNoPopUp(network){
  prepareVariables(network);
  getWallet();
  let account = await wallet[preferredNetwork].client.getActiveAccount();

  if (!account) {
    return { success: false, wallet: "", pk: ""};
  }
  return { success: true, wallet: account.address, pk : account.publicKey};
};

const disconnectWallet = async () => {
  getWallet();
  await wallet[preferredNetwork].disconnect();
  wallet[preferredNetwork] = new BeaconWallet(options);
  return { success: true, wallet: null };
};

const checkIfWalletConnected = async (wallet) => {
  try {
    getWallet();
    const activeAccount = await wallet.client.getActiveAccount();
    if (!activeAccount) {
      await wallet.client.requestPermissions({
        type: { network: preferredNetwork },
      });
    }
    return {
      success: true,
      wallet: activeAccount
    };
  } catch (error) {
    return {
      success: false,
      wallet: "",
      error,
    };
  }
};

export const sign = async (msg) => {
  getWallet();
  const payload = {
    signingType: SigningType.MICHELINE,
    payload:msg, 
    // sourceAddress:pkh
  }
  const response = await checkIfWalletConnected(wallet[preferredNetwork]);

  if (response.success) {
    const tezos = new TezosToolkit(rpcURL);
    tezos.setWalletProvider(wallet[preferredNetwork]);
    return (await wallet[preferredNetwork].client.requestSignPayload(payload)).signature
  }
}

export const batch_contracts = async (contract_calls, amount) => {
  getWallet();
  // const wallet = new BeaconWallet(options);
  const response = await checkIfWalletConnected(wallet[preferredNetwork]);

  if (response.success) {
    const tezos = new TezosToolkit(rpcURL);
    tezos.setWalletProvider(wallet[preferredNetwork]);
    
    // const contract = await tezos.wallet.at(address);
    // //console.log("s ", args)
    // const operation = contract.methodsObject[func](args);
    
    const batch = await tezos.wallet.batch(
      await Promise.all(contract_calls.map(async contract_call => {
        console.log("Contract call", contract_call);
        let contract = await tezos.wallet.at(contract_call.address);
        return {
          kind: OpKind.TRANSACTION,           
          ...contract.methodsObject[contract_call.func](contract_call.args).toTransferParams(),
          amount: contract_call.amount  
        }
      }))
    );

    const sending = await batch.send();
    const result = await sending.confirmation();
    return {opHash: sending.opHash, success: true};
    // console.log(result);
  }
};

export const contract = async (address, func, args, amount) => {
  
  try{
    getWallet();
    // const wallet = new BeaconWallet(options);
    const response = await checkIfWalletConnected(wallet[preferredNetwork]);

    if (response.success) {
      const tezos = new TezosToolkit(rpcURL);
      tezos.setWalletProvider(wallet[preferredNetwork]);
      const contract = await tezos.wallet.at(address);
      //console.log("s ", args)
      const operation = contract.methodsObject[func](args);
      const sending = await operation.send({ amount: amount });
      const opHash = sending.opHash;
      try{
        const result = await sending.confirmation();
        return {opHash, success: true};
      }
      catch(err){
        console.log("Contract Error!!!", err);
        return {opHash, success: false};
      }
    }
  }
  catch(err){
    console.log("Contract Error!!!", err);
    return {opHash: "", success: false};
  }

};

export {
  disconnectWallet,
  getActiveAccount,
  checkIfWalletConnected,
};
