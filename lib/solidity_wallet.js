const appId= "PxKwutTiUMpQQt7ACjcRb3ewxk5McvfLHt5kaVgY";
const serverUrl= "https://fypkueewl3fg.usemoralis.com:2053/server";
import { MoralisProvider } from "react-moralis";
import Moralis from "moralis";

export async function solidity_connect() {
  try {
    let user = Moralis.User.current();
    if (!user) {
      user = await Moralis.authenticate({ signingMessage: "Login on Lay3rz" });
      await Moralis.enableWeb3()
      if(!user){
          return "";
      }
      else{
          return user.get("ethAddress");
      }
      
    }
    else{
      return user.get("ethAddress");
    }
  }
  catch (error) {
      console.log("Error!!!", error);
      return "";
  }
}