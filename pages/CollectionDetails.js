import { useEffect, useState, useRef } from 'react';
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
import CollDetailsPrew from '../components/CollDetailsPrew';
import CollDetailsInfo from '../components/CollDetialsInfo';

export default function CollectionDetails(props) {
    const [tabs_key, setTabsKey] = useState('all');
    const [nfts, setNFTS] = useState([]);
    const [my_nfts, setMyNFTS] = useState([]);
    const [coll, setColl] = useState({get_current_tid: 7, get_max_tid: 10, get_mutez_earned: 0.6, get_mutez_goal: 0.9});

  useEffect(() => {
        const fetch = async _ => {
            const colls = await tezos.get_all_collections();
            console.log("Collections", colls)
            setCollections(colls);
        }
        setNFTS([{get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "NFT 1", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "NFT 2", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "NFT 3", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "NFT 4", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "NFT 5", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "NFT 6", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "NFT 7", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "NFT 8", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "NFT 1", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "NFT 2", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "NFT 3", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "NFT 4", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "NFT 5", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "NFT 6", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "NFT 7", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "NFT 8", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "NFT 8", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"}])

        setMyNFTS([{get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "My NFT 1", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "My NFT 2", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "My NFT 3", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "My NFT 4", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "My NFT 5", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "My NFT 6", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "My NFT 7", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "My NFT 8", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "My NFT 1", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "My NFT 2", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "My NFT 3", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "My NFT 4", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "My NFT 5", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "My NFT 6", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "My NFT 7", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "My NFT 8", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s",
                    get_title: "My NFT 8", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"}])


    }, [])
    return (
        <Container className="site_content">
            <Row>
                <Col md={6}>
                    <CollDetailsPrew />
                </Col>
                <Col md={6}>
                    <CollDetailsInfo coll={coll} />
                </Col>
            </Row>
            <div className="spacer-60" /><div className="spacer-30" />
            <Row>
                <Tabs id="controlled-tab-example" activeKey={tabs_key} onSelect={(k) => setTabsKey(k)} className="mb-3">
                    <Tab tabClassName="tabText" eventKey="all" title="Collection NFTs">
                        <MyCardsCollection href={"NFTDetails"} values={nfts} />
                    </Tab>
                    <Tab tabClassName="tabText" eventKey="yours" title="You Own">
                        <MyCardsCollection href={"NFTDetails"} values={my_nfts} />
                    </Tab>
                </Tabs>
            </Row>
            <div className="spacer-60" /><div className="spacer-30" />
        </Container>
    )
}