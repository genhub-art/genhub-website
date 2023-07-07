import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NftDetailsPreview from '../components/NftDetailsPreview';
import NftDetialsInfo from '../components/NftDetialsInfo';
import { get_collections, get_nfts, Collection, NFT, database_awake } from '../lib/indexer_api';
import { useNetworkContext } from '../contexts/networkContext';
import { set } from 'ramda';

export default function NftDetails(props) {

    const router = useRouter();

    const [tabs_key, setTabsKey] = useState('all');
    const [nft, setNFT] = useState<NFT | null>(null);
    const [collection, setCollection] = useState<Collection | null>(null);
    const [loading, setLoading] = useState(true);
    let {network, setNetwork} = useNetworkContext();

    useEffect(() => {

        if(!router.isReady) return;
        let collection_address = router.query.collection as string;
        let token_id = router.query.token_id as string;

        const fetch = async () => {
            setLoading(true);
            setNFT(null);
            setCollection(null);
            await database_awake();
            setNFT((await get_nfts([], network, [collection_address], [token_id], []))[0]);
            setCollection((await get_collections([], network, [collection_address], []))[0]);
            setLoading(false);
        }
        fetch();

    }, [router.isReady, network]);

    return (
        <Container className="site_content">
            <Row>
                <Col md={6}>
                    <NftDetailsPreview loading={loading} nft={nft} />
                </Col>
                <Col md={6}>
                    {!loading && <NftDetialsInfo nft={nft} collection={collection} />}
                </Col>
            </Row>
            <div className="spacer-60" />
        </Container>
    )
}