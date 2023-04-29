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
import NftDetailsPreview from '../components/NftDetailsPreview';
import NftDetialsInfo from '../components/NftDetialsInfo';

export default function NftDetails(props) {
    const [tabs_key, setTabsKey] = useState('all');
    const [coll, setColl] = useState({get_current_tid: 7, get_max_tid: 10, get_mutez_earned: 0.6, get_mutez_goal: 0.9});

    return (
        <Container className="site_content">
            <Row>
                <Col md={6}>
                    <NftDetailsPreview />
                </Col>
                <Col md={6}>
                    <NftDetialsInfo coll={coll} />
                </Col>
            </Row>
            <div className="spacer-60" />
        </Container>
    )
}