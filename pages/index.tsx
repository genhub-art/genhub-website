{/* <title>Create Next App</title>
<meta name="description" content="Generated by create next app" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="icon" href="/favicon.ico" /> */}
import { useState, useEffect } from 'react';
import { useEvmNativeBalance } from '@moralisweb3/next';
import IndexPresentation from '../components/IndexPresentation';
import MyCarousel from '../components/MyCarousel';
import MyOwlCarousel from '../components/MyOwlCarousel';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { get_collections, get_nfts, Collection, NFT } from '../lib/blockchainsTS';

export default function Home(props) {
  
  const loading_collection = {chain: "", address: "", metadata: {name: "Loading...", description: "", image: "/Loading.gif",
                                         external_url: "", generator_url: ""}, price: 0, max_supply: 0, current_supply: 0};

  const address = "0x291DCCdF0CfF6715A1350A0c8664a5A4Cd38A194";
  const { data: nativeBalance } = useEvmNativeBalance({ address });
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState(Array(8).fill(loading_collection));
  const [nfts, setNFTS] = useState(Array(8).fill(loading_collection));

  useEffect(() => {

    const fetch = async () => {
        setCollections((await get_collections([], [])));
        setNFTS(await get_nfts([], [], [], []));
        setLoading(false);
    }
    
    fetch();

  }, []);
  

  return (
    <Container>
      <Row style={{paddingBottom: "90px"}}>
        <Col md={6}><IndexPresentation /></Col>
        <Col md={6} bsPrefix="d-none d-sm-block col"><MyCarousel nfts={nfts} /></Col>
      </Row>
      <Row>
        {/* <h3>Wallet: {address}</h3>
        <h3>Native Balance: {nativeBalance?.balance.ether} ETH</h3> */}
        <Col lg={12} bsPrefix="text-center col"><MyOwlCarousel collections={collections} /></Col>
      </Row>
  </Container>
  )
}