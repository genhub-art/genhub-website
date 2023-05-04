{/* <title>Create Next App</title>
<meta name="description" content="Generated by create next app" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="icon" href="/favicon.ico" /> */}
import IndexPresentation from '../components/IndexPresentation';
import MyCarousel from '../components/MyCarousel';
import MyOwlCarousel from '../components/MyOwlCarousel';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Title from '../components/Title';
import MyCardsCollection from '../components/MyCardsCollection';
import { useEffect, useState } from 'react';
import { tezos, aleph0, solidity } from '../lib/blockchains';
import { ipfs_to_https } from '../lib/utils';
import { get_collections, Collection } from '../lib/blockchainsTS';

// export function getStaticProps() {
//   return {props: {MORALIS_API_KEY: process.env.MORALIS_API_KEY}};
// }

export default function AllCollections(props) {
  
  const loading_collection:Collection = {chain: "", address: "", metadata: {name: "Loading...", description: "", image: "/Loading.gif",
                                         external_url: "", generator_url: ""}, price: 0, max_supply: 0, current_supply: 0};

  const [collections, setCollections] = useState(Array(8).fill(loading_collection));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setCollections(await get_collections([], []));
      setLoading(false);
      // console.log("collections", collections);
    }


    // setCollections([{image: "/preview.jpg",title: "Collection 1", price: 0.4, curr_tid: 6, max_tid: 6},
    //                 {image: "/preview.jpg",title: "Collection 2", price: 0.4, curr_tid: 6, max_tid: 6},
    //                 {image: "/preview.jpg",title: "Collection 3", price: 0.4, curr_tid: 6, max_tid: 6},
    //                 {image: "/preview.jpg",title: "Collection 4", price: 0.4, curr_tid: 6, max_tid: 6},
    //                 {image: "/preview.jpg",title: "Collection 5", price: 0.4, curr_tid: 6, max_tid: 6},
    //                 {image: "/preview.jpg",title: "Collection 6", price: 0.4, curr_tid: 6, max_tid: 6},
    //                 {image: "/preview.jpg",title: "Collection 7", price: 0.4, curr_tid: 6, max_tid: 6},
    //                 {image: "/preview.jpg",title: "Collection 8", price: 0.4, curr_tid: 6, max_tid: 6},
    //                 {image: "/preview.jpg",title: "Collection 1", price: 0.4, curr_tid: 6, max_tid: 6},
    //                 {image: "/preview.jpg",title: "Collection 2", price: 0.4, curr_tid: 6, max_tid: 6},
    //                 {image: "/preview.jpg",title: "Collection 3", price: 0.4, curr_tid: 6, max_tid: 6},
    //                 {image: "/preview.jpg",title: "Collection 4", price: 0.4, curr_tid: 6, max_tid: 6},
    //                 {image: "/preview.jpg",title: "Collection 5", price: 0.4, curr_tid: 6, max_tid: 6},
    //                 {image: "/preview.jpg",title: "Collection 6", price: 0.4, curr_tid: 6, max_tid: 6},
    //                 {image: "/preview.jpg",title: "Collection 7", price: 0.4, curr_tid: 6, max_tid: 6},
    //                 {image: "/preview.jpg",title: "Collection 8", price: 0.4, curr_tid: 6, max_tid: 6},
    //                 {image: "/preview.jpg", title: "Collection 1", price: 0.4, curr_tid: 6, max_tid: 6}
    //               ])
    fetch();

  }, [])
  console.log("DNG Collections", collections);
  return (
    <div>
        <Title title="Collections" />
        <div className="spacer-60"></div>
        <Container>
          {loading 
            ? <MyCardsCollection values={collections} href={"CollectionDetails"} typ="nft" />
            : <MyCardsCollection values={collections} href={"CollectionDetails"} typ="collection" />
          }
        </Container>
    </div>
  )
}
