import '../styles/globals.css'
import { useEffect, useState } from "react";
import Layout from "../components/Layout"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Head from 'next/head'
import {NetworkContextProvider} from "../contexts/networkContext";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
  bscTestnet,
  fantomTestnet,
  polygonMumbai,
  sepolia,
} from "wagmi/chains";

const projectId = process.env.WEB3MODAL_PROJECT_ID;

const chains = [
  bscTestnet,
  fantomTestnet,
  polygonMumbai,
  sepolia,
];

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
autoConnect: true,
connectors: w3mConnectors({ version: 1, chains, projectId }),
provider,
});

const ethereumClient = new EthereumClient(wagmiClient, chains);


export const KEYWORDS = {
  BEACON_PKH: "beacon_pkh",
  SOLIDITY_PKH: "solidity_pkh",
  ALEPH0_PKH: "aleph0_pkh",
  TESTNET: "testnet",
  MAINNET: "mainnet",
  NETWORK: "network"
}


export default function App({ Component, pageProps }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);


  return(
    <>
      <Head>
        <title>Genhub NFT Marketplace</title> 
      </Head>
      {ready  
        ?
          <WagmiConfig client={wagmiClient}>
            {/* <NetworkContextProvider> */}
            <Layout>
              <Component {...pageProps} />
            </Layout>
            {/* </NetworkContextProvider> */}
          </WagmiConfig>
        : null
      }
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </> 
  )
}
