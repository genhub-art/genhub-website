import IndexPresentation from '../components/IndexPresentation';
import MyCarousel from '../components/MyCarousel';
import MyOwlCarousel from '../components/MyOwlCarousel';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Title from '../components/Title';
import { useEffect, useState } from 'react';
import MyCardsCollection from '../components/MyCardsCollection';

export default function Marketplace(props) {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetch = async _ => {
      const colls = await tezos.get_all_collections();
      console.log("Collections", colls)
      setCollections(colls);
    }
    setCollections([{get_image: "/preview.jpg",
                    get_title: "Collection 1", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 2", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 3", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 4", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 5", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 6", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 7", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 8", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 1", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 2", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 3", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 4", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 5", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 6", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 7", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 8", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 8", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6}])
    // fetch();

  }, [])
  return (
    <div>
        <Title title="Marketplace" />
        <div className="spacer-60"></div>
        <Container>    
          <MyCardsCollection values={collections} href={"CollectionDetails"} />
        </Container>
    </div>
  )
}