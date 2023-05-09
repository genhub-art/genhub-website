import '../styles/globals.css'
import Layout from "../components/Layout"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Head from 'next/head'
import {NetworkContextProvider} from "../contexts/networkContext"


export const KEYWORDS = {
  BEACON_PKH: "beacon_pkh",
  SOLIDITY_PKH: "solidity_pkh",
  ALEPH0_PKH: "aleph0_pkh",
  TESTNET: "testnet",
  MAINNET: "mainnet",
  NETWORK: "network"
}


export default function App({ Component, pageProps }) {


  return(
    <>
      <Head>
        <title>Genhub NFT Marketplace</title> 
      </Head>

        <NetworkContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
        </NetworkContextProvider>
    </> 
  )
}
