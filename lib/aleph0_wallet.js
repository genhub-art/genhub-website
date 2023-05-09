import sc_metadata from "./metadata.json"
import { ApiPromise, WsProvider } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import { web3Accounts, web3Enable, web3FromAddress, web3FromSource } from '@polkadot/extension-dapp';

const provider = new WsProvider('wss://ws.test.azero.dev')
const contract_address = "5HeutNxPPfW4Tqe3DnwJg2eVJTVe7aQGMztDAmtPxkYPui2Q"
let api = null;
let extensions = null;
let allAccounts = null;
let acc = null;
let signer = null;
let sc = null;

export let connectWallet = async network => {
  try{
    api = await ApiPromise.create({provider})
    extensions = await web3Enable('my cool dapp');
    allAccounts = await web3Accounts()
    acc = allAccounts[0]
    // console.log("Aleph0 Acc", acc);
    //return "Aleph0_PKH";
    return acc;
  }
  catch(err){
    // console.log("Error, err");
    return null;
  }
}

let set_init_sc_state = async () => {
  try{
    signer = (await web3FromSource(acc.meta.source)).signer
    await api.setSigner(signer)
    sc = (new ContractPromise(api, sc_metadata, contract_address));
    // console.log("loaded sc ", sc)
    return sc;
  }
  catch(err){
    // console.log("Err", err);
    return null;
  }
}

let get_sc_state = async () => 
{
  const {result, output} = await sc.query.get(acc.address, {gasLimit: -1})
  // console.log("here", result, output)

}

let flip = () => 
    sc.tx
      .flip( { storageDepositLimit: 3000000n, gasLimit:9000n * 1000000n})
      .signAndSend(acc.address, result => {
        // console.log("result", result)
        get_sc_state()
      })
