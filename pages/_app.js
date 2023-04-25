import '../styles/globals.css'
import Layout from "../components/Layout"
import SSRProvider from 'react-bootstrap/SSRProvider'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Head from 'next/head'
import Moralis from "moralis"; 
import { MoralisProvider } from 'react-moralis'
import { useState, useEffect } from 'react'
import {NetworkContextProvider} from "../contexts/networkContext"
import { createContext, useContext } from 'react'

const appId= "PxKwutTiUMpQQt7ACjcRb3ewxk5McvfLHt5kaVgY";
const serverUrl= "https://fypkueewl3fg.usemoralis.com:2053/server";

export const KEYWORDS = {
  BEACON_PKH: "beacon_pkh",
  SOLIDITY_PKH: "solidity_pkh",
  ALEPH0_PKH: "aleph0_pkh",
  TESTNET: "testnet",
  MAINNET: "mainnet",
  NETWORK: "network"
}

// const MyContext = createContext()

// // Provide a value for the context
// export function MyContextProvider({ children }) {
//   const [myData, setMyData] = useState({});
//   const updateMyData = newData => {
//     console.log("updating myData:", newData);
//     setMyData(newData)
//   }

//   return <MyContext.Provider value={{myData, updateMyData}}>{children}</MyContext.Provider>
// }

export default function App({ Component, pageProps }) {

  // let AppContext = useAppContext();

  // console.log("App Network Context", AppContext);

  // const {updateMyData} = useContext(MyContext);
  // console.log("!!!", myData);
  // console.log("!!!", MyContext);
  // console.log("Chat GPT App Network Context", myData);


  // useEffect(() => {
  //   async function fetchData() {
  //     await Moralis.start({ serverUrl, appId });
  //   }
  //   fetchData();
  // }, []);

  return(
    <>
      <Head>
        <title>LAY3RZ NFT Marketplace</title> 
      </Head>
        {/* {console.log("Chat GPT App Network Context Inside", myData)} */}
        {/* <div>{myData.foo}</div>
        <button onClick={() => updateMyData({ foo: 'baz' })}>
          Update Context
        </button> */}

        <NetworkContextProvider>
          <MoralisProvider appId={"PxKwutTiUMpQQt7ACjcRb3ewxk5McvfLHt5kaVgY"} serverUrl={"https://fypkueewl3fg.usemoralis.com:2053/server"}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MoralisProvider>
        </NetworkContextProvider>
    </> 
    // <SSRProvider> 
    // </SSRProvider> 
  )
}
