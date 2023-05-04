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
import NftDetailsPreview from '../components/NftDetailsPreview';
import NftDetialsInfo from '../components/NftDetialsInfo';
import { get_collections, get_nfts, Collection, NFT } from '../lib/blockchainsTS';

export default function NftDetails(props) {

    const router = useRouter();

    const [tabs_key, setTabsKey] = useState('all');
    const [nft, setNFT] = useState({});
    const [collection, setCollection] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if(!router.isReady) return;
        let collection_address = router.query.collection;
        let token_id = router.query.token_id;

        const fetch = async _ => {
            setNFT((await get_nfts([], [collection_address], [token_id], []))[0]);
            setCollection((await get_collections([], [collection_address]))[0]);
            setLoading(false);
        }
        fetch();

    }, [router.isReady]);

    return (
        <Container className="site_content">
            <Row>
                <Col md={6}>
                    <NftDetailsPreview loading={loading} image={nft?.metadata?.image} />
                </Col>
                <Col md={6}>
                    {!loading && <NftDetialsInfo nft={nft} collection={collection} />}
                </Col>
            </Row>
            <div className="spacer-60" />
        </Container>
    )
}