import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import IndexPresentation from '../components/IndexPresentation';
import MyCarousel from '../components/MyCarousel';
import MyOwlCarousel from '../components/MyOwlCarousel';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Title from '../components/Title';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import MyCardsCollection from '../components/MyCardsCollection';
import CollectionDetailsPreview from '../components/CollectionDetailsPreview';
import CollectionDetailsInfo from '../components/CollectionDetialsInfo';
import { get_collections, get_nfts, Collection, NFT } from '../lib/blockchainsTS';
import useLocalStorage from '../custom_hooks/useLocalStorage';
import { KEYWORDS } from '../pages/_app';

export default function CollectionDetails(props) {

    const loading_nfts = {chain: "", address: "", metadata: {name: "Loading...", description: "", image: "/Loading.gif",
                                         external_url: "", generator_url: ""}, price: 0, max_supply: 0, current_supply: 0};

    const [nfts, setNFTS] = useState(Array(8).fill(loading_nfts));
    const router = useRouter();
    const [tabs_key, setTabsKey] = useState('all');
    const [my_nfts, setMyNFTS] = useState(Array(8).fill(loading_nfts));
    const [collection, setCollection] = useState();
    const [loading, setLoading] = useState(true);
    const [solidity_pkh, setSolidityPKH] = useLocalStorage(KEYWORDS.SOLIDITY_PKH ,null);
    // console.log("KEYWORDS SOLIDITY PKH", KEYWORDS.SOLIDITY_PKH, KEYWORDS);
  useEffect(() => {

        if(!router.isReady) return;
        let address = router.query.address;

        const fetch = async _ => {
            setCollection((await get_collections([], [address]))[0]);
            setNFTS(await get_nfts([], [address], [], []));
            setLoading(false);
        }
        fetch();

    }, [router.isReady]);

    useEffect(() => {

        if(!solidity_pkh) return;
        // console.log("COLL DET SOLIDITY PKH", solidity_pkh);
        console.log("DNG COLL DET NFTS", nfts);
        setMyNFTS(nfts.filter(nft => nft.owner === solidity_pkh));
        // console.log("MY NFTS", nfts.filter(nft => nft.owner === solidity_pkh));
    }, [nfts, solidity_pkh]);

    // console.log("Collections", collection);
    
    return (
        <Container className="site_content">
            <Row>
                <Col md={6}>
                    <CollectionDetailsPreview loading={loading} image={collection?.metadata?.image} 
                        generator_url={collection?.metadata?.generator_url} />
                </Col>
                <Col md={6}>
                    {!loading && <CollectionDetailsInfo collection={collection} />}
                </Col>
            </Row>
            <div className="spacer-60" /><div className="spacer-30" />
            <Row>
                <Tabs id="controlled-tab-example" activeKey={tabs_key} onSelect={(k) => setTabsKey(k)} className="mb-3">
                    <Tab tabClassName="tabText" eventKey="all" title="Collection NFTs">
                        <MyCardsCollection href={"NFTDetails"} values={nfts} typ="nft" />
                    </Tab>
                    <Tab tabClassName="tabText" eventKey="yours" title="You Own">
                        <MyCardsCollection href={"NFTDetails"} values={my_nfts} typ="nft" />
                    </Tab>
                </Tabs>
            </Row>
            <div className="spacer-60" /><div className="spacer-30" />
        </Container>
    )
}